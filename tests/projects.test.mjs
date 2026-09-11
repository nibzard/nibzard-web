import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, copyFile, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fetchRepositories, normalizeRepository, selectProjects, validateConfig } from '../scripts/lib/github-projects.mjs';

const config = repos => ({ owner: 'nibzard', defaults: { visibility: 'hidden' }, repos });
const raw = (name, more = {}) => ({full_name: name, name: name.split('/')[1], private: false, description: 'From GitHub', topics: ['tools'], language: 'Rust', updated_at: '2026-01-01T00:00:00Z', pushed_at: '2026-01-01T00:00:00Z', archived: false, fork: false, ...more});
const snapshot = (...repos) => ({version: 1, repositories: repos.map(repo => normalizeRepository(repo))});
const response = (body, status = 200) => ({ok: status === 200, status, json: async () => body});

test('new and explicitly hidden projects never appear, even when featured', () => {
  const result = selectProjects(snapshot(raw('nibzard/new'), raw('nibzard/hidden'), raw('nibzard/visible')), config({
    'nibzard/hidden': {visibility: 'hidden', featured: true, homepage: true}, 'nibzard/visible': {visibility: 'visible'},
  }));
  assert.deepEqual(result.map(p => p.fullName), ['nibzard/visible']);
});

test('editorial overrides win; featured order precedes recent activity', () => {
  const result = selectProjects(snapshot(raw('nibzard/a'), raw('nibzard/b'), raw('nibzard/c'), raw('nibzard/d', {pushed_at: '2026-09-01T00:00:00Z'})), config({
    'nibzard/a': {visibility:'visible',featured:true,order:2},
    'nibzard/b': {visibility:'visible',featured:true,order:1,title:'Editorial title',description:'',topics:[],article:'/b'},
    'nibzard/c': {visibility:'visible'}, 'nibzard/d': {visibility:'visible'},
  }));
  assert.deepEqual(result.map(p => p.name), ['b','a','d','c']);
  assert.equal(result[0].title, 'Editorial title');
  assert.equal(result[0].description, '');
  assert.deepEqual(result[0].topics, []);
  assert.equal(result[0].article, '/b');
});

test('pagination discovers all public repositories and includes organization entries', async () => {
  const calls = [];
  const result = await fetchRepositories(config({'daytona/tool': {visibility:'visible'}}), {fetchImpl: async url => {
    calls.push(url);
    if (new URL(url).searchParams.get('page') === '1') return response(Array.from({length:100}, (_,i) => raw(`nibzard/repo-${i}`)));
    if (new URL(url).searchParams.get('page') === '2') return response([raw('nibzard/last')]);
    return response(raw('daytona/tool'));
  }});
  assert.equal(result.repositories.length, 102);
  assert.equal(calls.length, 3);
  assert.ok(result.repositories.some(p => p.fullName === 'daytona/tool'));
});

test('private and disabled metadata is excluded and API-only fields are not persisted', () => {
  assert.throws(() => normalizeRepository({}), /invalid repository metadata/);
  assert.equal(normalizeRepository(raw('nibzard/private', {private:true})), null);
  assert.equal(normalizeRepository(raw('nibzard/disabled', {disabled:true})), null);
  const publicRepo = normalizeRepository(raw('nibzard/public', {permissions:{admin:true},secret_scanning:{status:'enabled'}}));
  assert.equal(publicRepo.permissions, undefined);
  assert.equal(publicRepo.secret_scanning, undefined);
});

test('deleted repositories are omitted; transient failures reject the entire refresh', async () => {
  const deleted = await fetchRepositories(config({'nibzard/gone':{visibility:'visible'}}), {warn:()=>{}, fetchImpl:async url => response(url.includes('/users/') ? [] : {}, url.includes('/users/') ? 200 : 404)});
  assert.deepEqual(deleted.repositories, []);
  await assert.rejects(fetchRepositories(config({}), {fetchImpl:async()=>response({},403)}), /HTTP 403/);
  await assert.rejects(fetchRepositories(config({}), {fetchImpl:async()=>{throw new Error('Network unavailable');}}), /Network unavailable/);
});

test('renames require updating the sidecar and settings match case-insensitively', async () => {
  const settings = config({'nibzard/old': {visibility:'visible'}});
  const data = await fetchRepositories(settings, {warn:()=>{},fetchImpl:async url=>response(url.includes('/users/') ? [] : raw('nibzard/new'))});
  assert.deepEqual(selectProjects(data, settings), []);
  assert.equal(selectProjects(data, config({'NIBZARD/NEW':{visibility:'visible'}})).length, 1);
});

test('invalid editorial settings fail early', () => {
  for (const options of [{visibility:'visble'}, {feature:true}, {article:'https://example.com'}, {order:'first'}, {image:{src:'//example.com/a'}}]) {
    assert.throws(()=>validateConfig(config({'nibzard/a':options})));
  }
  assert.throws(()=>validateConfig(config({'nibzard/a':{},'NIBZARD/A':{}})), /duplicate/);
});

test('CLI preserves the saved file on failed refresh and supports offline builds', async () => {
  const root = await mkdtemp(join(tmpdir(), 'project-sync-'));
  try {
    for (const dir of ['scripts/lib','src/config','src/data']) await mkdir(join(root,dir),{recursive:true});
    for (const file of ['scripts/sync-projects.mjs','scripts/lib/github-projects.mjs']) await copyFile(file,join(root,file));
    const saved = JSON.stringify(snapshot(raw('nibzard/saved')));
    await writeFile(join(root,'src/config/projects.json'),JSON.stringify(config({})));
    await writeFile(join(root,'src/data/github-projects.json'),saved);
    await writeFile(join(root,'offline.mjs'),"globalThis.fetch = async () => { throw new Error('Test network failure'); };\n");
    const run = (args=[],extra={}) => spawnSync(process.execPath,['--import',join(root,'offline.mjs'),join(root,'scripts/sync-projects.mjs'),...args],{encoding:'utf8',env:{...process.env,PROJECTS_OFFLINE:'0',...extra}});
    assert.equal(run().status,0);
    assert.equal(await readFile(join(root,'src/data/github-projects.json'),'utf8'),saved);
    assert.notEqual(run(['--strict']).status,0);
    assert.equal(run([], {PROJECTS_OFFLINE:'1'}).status,0);
    await rm(join(root,'src/data/github-projects.json'));
    assert.notEqual(run().status,0);
    assert.notEqual(run([], {PROJECTS_OFFLINE:'1'}).status,0);
  } finally {await rm(root,{recursive:true,force:true});}
});

test('organization discovery paginates and deduplicates explicit selections', async () => {
  const settings = {...config({'steel-experiments/chosen':{visibility:'visible'}}), organizations:['steel-experiments']};
  const calls = [];
  const data = await fetchRepositories(settings, {fetchImpl:async url => {
    calls.push(url);
    if (url.includes('/users/')) return response([raw('nibzard/own')]);
    if (new URL(url).searchParams.get('page') === '1') return response(Array.from({length:100},(_,i)=>raw(`steel-experiments/tool-${i}`)));
    return response([raw('steel-experiments/chosen')]);
  }});
  assert.equal(calls.length,3);
  assert.equal(data.repositories.length,102);
  assert.deepEqual(selectProjects(data,settings).map(p=>p.fullName),['steel-experiments/chosen']);
  assert.ok(calls[1].includes('type=public'));
});

test('organization errors reject refresh; invalid organization settings fail', async () => {
  const settings = {...config({}),organizations:['steel-experiments']};
  await assert.rejects(fetchRepositories(settings,{fetchImpl:async url=>url.includes('/users/') ? response([raw('nibzard/own')]) : response({},503)}),/HTTP 503/);
  for (const organizations of ['steel-experiments',['bad/name'],['steel','STEEL'],[12]]) {
    assert.throws(()=>validateConfig({...config({}),organizations}),/organization/);
  }
});

import { useEffect, useMemo, useRef, useState } from 'react';
import ModelPicker from './ModelPicker.jsx';
import UsageInputs from './UsageInputs.jsx';
import ResultsPanel from './ResultsPanel.jsx';
import {
  BATCH_DISCOUNTS, DEFAULT_USAGE, MODEL_KEY, buildCalculatorSearch, parseCalculatorState, providerMap, rankModels,
} from '../../../scripts/lib/llm-prices.mjs';

const toInt = (text, min) => {
  const value = Math.floor(Number(String(text).replace(/[^0-9]/g, '')) || 0);
  return Math.max(min, Number.isFinite(value) ? value : min);
};

export default function LLMCostCalculator({ initialSnapshot }) {
  const [snapshot, setSnapshot] = useState(initialSnapshot);
  const [modelKey, setModelKey] = useState(initialSnapshot.models[0][MODEL_KEY]);
  const [inputs, setInputs] = useState(() => ({
    inputTokens: String(DEFAULT_USAGE.inputTokens),
    outputTokens: String(DEFAULT_USAGE.outputTokens),
    cacheReadTokens: String(DEFAULT_USAGE.cacheReadTokens),
    steps: String(DEFAULT_USAGE.steps),
    runsPerDay: String(DEFAULT_USAGE.runsPerDay),
  }));
  const [batch, setBatch] = useState(false);
  const [listStatus, setListStatus] = useState('loading');
  const urlState = useRef(null);
  const firstWrite = useRef(true);
  const defaultModelKey = initialSnapshot.models[0][MODEL_KEY];

  // The inline snapshot covers the popular models; fetch the full list after
  // hydration. A failed fetch leaves a working calculator on the subset.
  useEffect(() => {
    let cancelled = false;
    fetch(`/data/llm-prices.json?v=${encodeURIComponent(initialSnapshot.fetchedAt)}`)
      .then(response => (response.ok ? response.json() : Promise.reject(new Error(`HTTP ${response.status}`))))
      .then(data => {
        if (cancelled) return;
        if (!Array.isArray(data?.models) || !Array.isArray(data?.providers)) throw new Error('Invalid price data.');
        setSnapshot(data);
        setListStatus('full');
      })
      .catch(() => { if (!cancelled) setListStatus('fallback'); });
    return () => { cancelled = true; };
  }, []);

  // Restore shared state from the URL once, then apply the model again after
  // the full list arrives in case it was not part of the inline subset.
  useEffect(() => {
    const state = parseCalculatorState(window.location.search, { defaultModelKey });
    urlState.current = state;
    setInputs({
      inputTokens: String(state.usage.inputTokens),
      outputTokens: String(state.usage.outputTokens),
      cacheReadTokens: String(state.usage.cacheReadTokens),
      steps: String(state.usage.steps),
      runsPerDay: String(state.usage.runsPerDay),
    });
    setBatch(state.batch);
    setModelKey(state.modelKey);
  }, [defaultModelKey]);

  const models = snapshot.models;
  const ranked = useMemo(() => rankModels(models), [models]);
  const providerNames = useMemo(() => providerMap(snapshot), [snapshot]);
  const model = models.find(entry => entry[MODEL_KEY] === modelKey) ?? ranked[0];
  const batchInfo = useMemo(() => {
    if ((snapshot.batchPrices || {})[model[MODEL_KEY]]) return { available: true, label: 'published batch price' };
    const provider = model[MODEL_KEY].slice(0, model[MODEL_KEY].indexOf(':'));
    const factor = BATCH_DISCOUNTS[provider];
    return factor != null
      ? { available: true, label: `approx. ${Math.round((1 - factor) * 100)}% off list prices for ${provider}` }
      : { available: false, label: '' };
  }, [snapshot, model]);

  // A shared URL can name a model outside the inline subset; apply it once
  // after the full list arrives, unless the user picked a model meanwhile.
  const urlApplied = useRef(false);
  useEffect(() => {
    if (urlApplied.current || listStatus !== 'full') return;
    urlApplied.current = true;
    const state = urlState.current;
    if (!state || state.modelKey === defaultModelKey || modelKey !== defaultModelKey) return;
    if (models.some(entry => entry[MODEL_KEY] === state.modelKey)) setModelKey(state.modelKey);
  }, [listStatus, models, modelKey, defaultModelKey]);

  // Keep the URL shareable: non-default state is written back (debounced).
  useEffect(() => {
    if (firstWrite.current) { firstWrite.current = false; return; }
    const usage = {
      inputTokens: toInt(inputs.inputTokens, 0),
      outputTokens: toInt(inputs.outputTokens, 0),
      cacheReadTokens: toInt(inputs.cacheReadTokens, 0),
      steps: toInt(inputs.steps, 1),
      runsPerDay: toInt(inputs.runsPerDay, 0),
    };
    const timer = setTimeout(() => {
      const search = buildCalculatorSearch({ modelKey: model[MODEL_KEY], usage, batch }, { defaultModelKey });
      window.history.replaceState(null, '', search ? `?${search}` : window.location.pathname);
    }, 300);
    return () => clearTimeout(timer);
  }, [model, inputs, batch, defaultModelKey]);

  const usage = useMemo(() => ({
    inputTokens: toInt(inputs.inputTokens, 0),
    outputTokens: toInt(inputs.outputTokens, 0),
    cacheReadTokens: toInt(inputs.cacheReadTokens, 0),
    steps: toInt(inputs.steps, 1),
    runsPerDay: toInt(inputs.runsPerDay, 0),
  }), [inputs]);

  const syncedOn = useMemo(
    () => new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(snapshot.fetchedAt)),
    [snapshot.fetchedAt],
  );

  return (
    <div className="llm-calc">
      <ModelPicker models={ranked} providerNames={providerNames} modelKey={model[MODEL_KEY]} onSelect={setModelKey} />
      <UsageInputs
        values={inputs}
        onChange={(field, value) => setInputs(previous => ({ ...previous, [field]: value }))}
        batch={batch}
        onBatchChange={setBatch}
        batchInfo={batchInfo}
      />
      <ResultsPanel model={model} usage={usage} batch={batch} tiers={snapshot.tiers || {}} batchPrices={snapshot.batchPrices || {}} />
      <p className="llm-calc-footnote">
        {listStatus === 'fallback' && 'Full model list unavailable — showing popular models only. '}
        Prices synced {syncedOn} from <a href="https://github.com/pydantic/genai-prices">pydantic/genai-prices</a> (MIT).
        Estimates only — your provider invoice is the source of truth.
      </p>
    </div>
  );
}

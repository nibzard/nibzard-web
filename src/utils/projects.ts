import config from '../config/projects.json';
import snapshot from '../data/github-projects.json';
import { selectProjects } from '../../scripts/lib/github-projects.mjs';

export const projects = selectProjects(snapshot, config);
export const featuredProjects = projects.filter(project => project.featured);
export const homepageProjects = projects.filter(project => project.homepage).slice(0, 3);

import { describe, expect, it } from 'vitest';
import {
  ENGINEERING_STANDARDS,
  FILTER_CATEGORIES,
  PROFILE,
  PROJECTS,
  ROLE_TRACKS,
  filterProjectsByCategory,
  getCategoryCounts,
  getProjectById,
  getRoleTrackById,
  type FilterCategory,
} from '../portfolio';

describe('Portfolio catalog integrity', () => {
  it('contains all 8 expected portfolio projects with unique IDs', () => {
    expect(PROJECTS).toHaveLength(8);
    const ids = PROJECTS.map((project) => project.id);
    expect(new Set(ids).size).toBe(PROJECTS.length);
    expect(ids).toEqual([
      'signal-intelligence',
      'modelscope-intel',
      'docintel-rag',
      'au-tech-market-intel',
      'flowforge-ai-studio',
      'meridian-bi-platform',
      'autogate',
      'character-planner',
    ]);
  });

  it('ensures every project has complete case-study sections and non-empty metadata', () => {
    for (const project of PROJECTS) {
      expect(project.name.trim().length).toBeGreaterThan(0);
      expect(project.tagline.trim().length).toBeGreaterThan(10);
      expect(project.summary.trim().length).toBeGreaterThan(20);
      expect(project.categories.length).toBeGreaterThanOrEqual(1);
      expect(project.stack.length).toBeGreaterThanOrEqual(3);
      expect(project.problemStatement.trim().length).toBeGreaterThan(30);
      expect(project.architectureOverview.length).toBeGreaterThanOrEqual(3);
      expect(project.engineeringDecisions.length).toBeGreaterThanOrEqual(3);
      expect(project.verifiedCapabilities.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('validates all repository and demo URLs use HTTPS and belong to ateoim or Netlify demos', () => {
    const githubRepoPattern = /^https:\/\/github\.com\/ateoim\/[A-Za-z0-9._-]+$/;
    const demoUrlPattern = /^https:\/\/(ateoim\.github\.io\/[A-Za-z0-9._-]+\/?|tom-(signal|modelscope)-demo\.netlify\.app\/?)$/;

    expect(PROFILE.githubUrl).toBe('https://github.com/ateoim');

    for (const project of PROJECTS) {
      if (project.repoUrl !== undefined) {
        expect(project.repoUrl).toMatch(githubRepoPattern);
      } else {
        expect(project.isPrivateRepo).toBe(true);
      }
      if (project.demoUrl !== undefined) {
        expect(project.demoUrl).toMatch(demoUrlPattern);
      }
    }
  });

  it('includes live demo URLs for the seven deployed projects and omits it for Autogate', () => {
    const autogate = getProjectById(PROJECTS, 'autogate');
    expect(autogate?.demoUrl).toBeUndefined();

    const deployedIds = [
      'signal-intelligence',
      'modelscope-intel',
      'docintel-rag',
      'au-tech-market-intel',
      'flowforge-ai-studio',
      'meridian-bi-platform',
      'character-planner',
    ];
    for (const id of deployedIds) {
      const project = getProjectById(PROJECTS, id);
      expect(project?.demoUrl).toBeDefined();
    }
  });

  it('accurately represents Tom Nunan profile and RMIT University credential', () => {
    expect(PROFILE.name).toBe('Tom Nunan');
    expect(PROFILE.institution).toBe('RMIT University');
    expect(PROFILE.degree).toBe('Bachelor of Information Technology');
    expect(PROFILE.location).toContain('Melbourne');
    expect(PROFILE.coreCompetencies.length).toBeGreaterThanOrEqual(4);
  });
});

describe('Category filtering and lookup helpers', () => {
  it('returns all projects when filtering by All without mutating the source array', () => {
    const filtered = filterProjectsByCategory(PROJECTS, 'All');
    expect(filtered).toHaveLength(PROJECTS.length);
    expect(filtered).not.toBe(PROJECTS);
  });

  it('filters AI & RAG projects accurately', () => {
    const filtered = filterProjectsByCategory(PROJECTS, 'AI & RAG');
    expect(filtered.map((p) => p.id)).toEqual([
      'signal-intelligence',
      'modelscope-intel',
      'docintel-rag',
      'flowforge-ai-studio',
      'character-planner',
    ]);
  });

  it('filters Data & BI projects accurately', () => {
    const filtered = filterProjectsByCategory(PROJECTS, 'Data & BI');
    expect(filtered.map((p) => p.id)).toEqual([
      'modelscope-intel',
      'au-tech-market-intel',
      'meridian-bi-platform',
    ]);
  });

  it('filters Automation projects accurately', () => {
    const filtered = filterProjectsByCategory(PROJECTS, 'Automation');
    expect(filtered.map((p) => p.id)).toEqual([
      'signal-intelligence',
      'flowforge-ai-studio',
    ]);
  });

  it('filters Full-Stack projects accurately', () => {
    const filtered = filterProjectsByCategory(PROJECTS, 'Full-Stack');
    expect(filtered.map((p) => p.id)).toEqual([
      'signal-intelligence',
      'modelscope-intel',
      'docintel-rag',
      'meridian-bi-platform',
      'autogate',
      'character-planner',
    ]);
  });

  it('computes accurate category counts matching filterProjectsByCategory', () => {
    const counts = getCategoryCounts(PROJECTS);
    for (const category of FILTER_CATEGORIES) {
      expect(counts[category as FilterCategory]).toBe(
        filterProjectsByCategory(PROJECTS, category).length
      );
    }
  });

  it('resolves existing projects by ID and returns undefined for unknown IDs', () => {
    expect(getProjectById(PROJECTS, 'docintel-rag')?.name).toBe('DocIntel');
    expect(getProjectById(PROJECTS, 'non-existent-id')).toBeUndefined();
  });
});

describe('Role-alignment matrix and engineering standards', () => {
  it('defines all 4 hiring tracks with unique IDs and non-empty capabilities', () => {
    expect(ROLE_TRACKS).toHaveLength(4);
    expect(ROLE_TRACKS.map((t) => t.id)).toEqual([
      'ai-automation',
      'data-bi',
      'business-analyst',
      'software-engineer',
    ]);

    for (const track of ROLE_TRACKS) {
      expect(track.positioning.trim().length).toBeGreaterThan(20);
      expect(track.coreTools.length).toBeGreaterThanOrEqual(4);
      expect(track.capabilities.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('ensures every projectId referenced in role tracks exists in PROJECTS', () => {
    const validIds = new Set(PROJECTS.map((p) => p.id));

    for (const track of ROLE_TRACKS) {
      for (const item of track.capabilities) {
        expect(item.projectIds.length).toBeGreaterThanOrEqual(1);
        expect(item.modules.length).toBeGreaterThanOrEqual(2);
        for (const projectId of item.projectIds) {
          expect(validIds.has(projectId)).toBe(true);
        }
      }
    }
  });

  it('retrieves role tracks by ID via getRoleTrackById', () => {
    const track = getRoleTrackById(ROLE_TRACKS, 'data-bi');
    expect(track?.label).toBe('Data & BI Analyst');
  });

  it('covers core engineering standards across testing, CI/CD, types, data, and documentation', () => {
    expect(ENGINEERING_STANDARDS).toHaveLength(5);
    expect(ENGINEERING_STANDARDS.map((s) => s.id)).toEqual([
      'testing',
      'cicd',
      'types',
      'data',
      'docs',
    ]);
  });
});

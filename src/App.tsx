import { useEffect, useMemo, useState } from 'react';
import { CaseStudyDrawer } from './components/CaseStudyDrawer';
import { EducationFooter } from './components/EducationFooter';
import { EngineeringStandards } from './components/EngineeringStandards';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectCard } from './components/ProjectCard';
import { ResumeModal } from './components/ResumeModal';
import { RoleAlignmentMatrix } from './components/RoleAlignmentMatrix';
import {
  PROJECTS,
  filterProjectsByCategory,
  getCategoryCounts,
  type FilterCategory,
  type Project,
  type RoleTrackId,
} from './data/portfolio';

type Theme = 'dark' | 'light';

const THEME_STORAGE_KEY = 'tom-nunan-portfolio-theme';

function getInitialTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  return 'dark';
}

export function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');
  const [activeTrackId, setActiveTrackId] = useState<RoleTrackId>('ai-automation');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const categoryCounts = useMemo(() => getCategoryCounts(PROJECTS), []);
  const visibleProjects = useMemo(
    () => filterProjectsByCategory(PROJECTS, activeCategory),
    [activeCategory]
  );

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="min-h-screen">
      <Header
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      <main className="no-print">
        <Hero
          activeCategory={activeCategory}
          categoryCounts={categoryCounts}
          onSelectCategory={setActiveCategory}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* Featured Case Studies Grid */}
        <section id="work" className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span
                  className="font-mono text-xs uppercase tracking-wider"
                  style={{ color: 'var(--accent-cobalt)' }}
                >
                  Selected Engineering Work
                </span>
                <h2
                  className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Featured Case Studies
                </h2>
              </div>
              <p
                className="font-mono text-xs"
                style={{ color: 'var(--text-muted)' }}
              >
                Showing {visibleProjects.length} of {PROJECTS.length} repositories · Select any
                project for technical deep-dive
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {visibleProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onInspect={setSelectedProject}
                />
              ))}
            </div>
          </div>
        </section>

        <RoleAlignmentMatrix
          activeTrackId={activeTrackId}
          onSelectTrack={setActiveTrackId}
          onInspectProject={setSelectedProject}
        />

        <EngineeringStandards />
      </main>

      <EducationFooter onOpenResume={() => setIsResumeOpen(true)} />

      <CaseStudyDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}

export default App;

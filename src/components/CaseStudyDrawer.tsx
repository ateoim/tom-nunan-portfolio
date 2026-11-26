import { useEffect } from 'react';
import {
  CheckCircle2,
  Cpu,
  ExternalLink,
  GitBranch,
  Github,
  Layers,
  Lock,
  X,
} from 'lucide-react';
import type { Project } from '../data/portfolio';

interface CaseStudyDrawerProps {
  project: Project | null;
  onClose: () => void;
}

export function CaseStudyDrawer({ project, onClose }: CaseStudyDrawerProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="no-print fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div
        className="fixed inset-0 transition-opacity"
        style={{ backgroundColor: 'var(--backdrop)' }}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className="drawer-enter relative z-10 flex h-full w-full max-w-2xl flex-col overflow-y-auto border-l"
        style={{
          backgroundColor: 'var(--bg-canvas)',
          borderColor: 'var(--border-strong)',
        }}
      >
        <div
          className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b px-6 py-5 backdrop-blur-md"
          style={{
            borderColor: 'var(--border-hairline)',
            backgroundColor: 'color-mix(in srgb, var(--bg-canvas) 92%, transparent)',
          }}
        >
          <div>
            <div className="flex flex-wrap items-center gap-2">
              {project.categories.map((category) => (
                <span
                  key={category}
                  className="rounded border px-2 py-0.5 font-mono text-[11px]"
                  style={{
                    borderColor: 'var(--border-hairline)',
                    backgroundColor: 'var(--bg-surface)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {category}
                </span>
              ))}
            </div>
            <h2
              id="case-study-title"
              className="mt-2 text-2xl font-semibold tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              {project.name}
            </h2>
            <p className="mt-0.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
              {project.tagline}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md border transition-colors"
            style={{
              borderColor: 'var(--border-hairline)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-secondary)',
            }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-8 px-6 py-6">
          {/* Action links */}
          <div className="flex flex-wrap items-center gap-3">
            {project.repoUrl ? (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-xs font-semibold transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: 'var(--text-primary)',
                  color: 'var(--bg-canvas)',
                }}
              >
                <Github className="h-3.5 w-3.5" />
                <span>View Repository</span>
              </a>
            ) : (
              <span
                className="inline-flex items-center gap-2 rounded-md border px-3.5 py-2 font-mono text-xs"
                style={{
                  borderColor: 'var(--border-hairline)',
                  backgroundColor: 'var(--bg-surface)',
                  color: 'var(--text-muted)',
                }}
              >
                <Lock className="h-3.5 w-3.5" />
                <span>Private Source Repository</span>
              </span>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border px-3.5 py-2 text-xs font-semibold transition-colors"
                style={{
                  borderColor: 'var(--accent-emerald)',
                  backgroundColor: 'var(--accent-emerald-soft)',
                  color: 'var(--accent-emerald)',
                }}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Open Live Demo</span>
              </a>
            )}
          </div>

          {project.screenshotUrl && (
            <div
              className="overflow-hidden rounded-lg border"
              style={{ borderColor: 'var(--border-hairline)', backgroundColor: 'var(--bg-surface)' }}
            >
              <img
                src={project.screenshotUrl}
                alt={`${project.name} live interface screenshot`}
                className="w-full object-cover object-top"
              />
            </div>
          )}

          {/* Problem Statement */}
          <section>
            <h3
              className="font-mono text-xs uppercase tracking-wider"
              style={{ color: 'var(--text-muted)' }}
            >
              01 · Problem Statement
            </h3>
            <p
              className="mt-2.5 text-sm leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {project.problemStatement}
            </p>
          </section>

          {/* System Architecture */}
          <section>
            <div className="flex items-center gap-2">
              <Layers className="h-3.5 w-3.5" style={{ color: 'var(--accent-cobalt)' }} />
              <h3
                className="font-mono text-xs uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                02 · System Architecture
              </h3>
            </div>
            <div className="mt-3 space-y-2.5">
              {project.architectureOverview.map((item, idx) => (
                <div
                  key={item.layer}
                  className="rounded-md border p-4"
                  style={{
                    borderColor: 'var(--border-hairline)',
                    backgroundColor: 'var(--bg-surface)',
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono text-[11px]"
                      style={{ color: 'var(--accent-cobalt)' }}
                    >
                      L{idx + 1}
                    </span>
                    <h4
                      className="text-sm font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {item.layer}
                    </h4>
                  </div>
                  <p
                    className="mt-1.5 text-xs leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Engineering Decisions */}
          <section>
            <div className="flex items-center gap-2">
              <GitBranch className="h-3.5 w-3.5" style={{ color: 'var(--accent-cobalt)' }} />
              <h3
                className="font-mono text-xs uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                03 · Key Engineering Decisions
              </h3>
            </div>
            <ul className="mt-3 space-y-2.5">
              {project.engineeringDecisions.map((decision) => (
                <li
                  key={decision}
                  className="flex items-start gap-2.5 text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: 'var(--accent-cobalt)' }}
                  />
                  <span>{decision}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Verified Capabilities */}
          <section>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-3.5 w-3.5" style={{ color: 'var(--accent-emerald)' }} />
              <h3
                className="font-mono text-xs uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                04 · Verified Capabilities
              </h3>
            </div>
            <ul className="mt-3 space-y-2">
              {project.verifiedCapabilities.map((capability) => (
                <li
                  key={capability}
                  className="flex items-start gap-2.5 rounded-md border px-3.5 py-2.5 text-xs leading-relaxed"
                  style={{
                    borderColor: 'var(--border-hairline)',
                    backgroundColor: 'var(--bg-surface)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <CheckCircle2
                    className="mt-0.5 h-3.5 w-3.5 shrink-0"
                    style={{ color: 'var(--accent-emerald)' }}
                  />
                  <span>{capability}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Tech Stack */}
          <section>
            <div className="flex items-center gap-2">
              <Cpu className="h-3.5 w-3.5" style={{ color: 'var(--text-muted)' }} />
              <h3
                className="font-mono text-xs uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                05 · Technology Stack
              </h3>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded border px-2.5 py-1 font-mono text-xs"
                  style={{
                    borderColor: 'var(--border-hairline)',
                    backgroundColor: 'var(--bg-surface)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        </div>
      </aside>
    </div>
  );
}

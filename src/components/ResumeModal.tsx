import { useEffect } from 'react';
import { ExternalLink, Github, Printer, X } from 'lucide-react';
import { PROFILE, PROJECTS } from '../data/portfolio';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  useEffect(() => {
    if (!isOpen) return;
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
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        className="no-print fixed inset-0"
        style={{ backgroundColor: 'var(--backdrop)' }}
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="modal-enter print-only-container relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg border shadow-2xl"
        style={{
          backgroundColor: 'var(--bg-canvas)',
          borderColor: 'var(--border-strong)',
        }}
      >
        {/* Top bar (hidden in print) */}
        <div
          className="no-print flex items-center justify-between border-b px-6 py-4"
          style={{
            borderColor: 'var(--border-hairline)',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <span
            className="font-mono text-xs uppercase tracking-wider"
            style={{ color: 'var(--text-muted)' }}
          >
            Resume &amp; Capabilities Overview
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-semibold transition-opacity hover:opacity-90"
              style={{
                backgroundColor: 'var(--text-primary)',
                color: 'var(--bg-canvas)',
              }}
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close resume overview"
              className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border"
              style={{
                borderColor: 'var(--border-hairline)',
                backgroundColor: 'var(--bg-elevated)',
                color: 'var(--text-secondary)',
              }}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="overflow-y-auto px-6 py-6 sm:px-8 sm:py-8">
          <div
            className="border-b pb-5"
            style={{ borderColor: 'var(--border-hairline)' }}
          >
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
              <h2
                id="resume-modal-title"
                className="text-2xl font-semibold tracking-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                {PROFILE.name}
              </h2>
              <span
                className="font-mono text-xs"
                style={{ color: 'var(--text-muted)' }}
              >
                {PROFILE.location}
              </span>
            </div>
            <p
              className="mt-1 text-sm font-medium"
              style={{ color: 'var(--accent-cobalt)' }}
            >
              {PROFILE.headline}
            </p>
            <div className="mt-2.5 flex flex-wrap items-center gap-4 font-mono text-xs">
              <a
                href={PROFILE.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 underline-offset-2 hover:underline"
                style={{ color: 'var(--text-secondary)' }}
              >
                <Github className="h-3.5 w-3.5" />
                <span>{PROFILE.githubUrl}</span>
              </a>
            </div>
          </div>

          {/* Profile Summary */}
          <section className="mt-5">
            <h3
              className="font-mono text-[11px] uppercase tracking-wider"
              style={{ color: 'var(--text-muted)' }}
            >
              Profile
            </h3>
            <p
              className="mt-2 text-sm leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {PROFILE.resumeSummary}
            </p>
          </section>

          {/* Education */}
          <section className="mt-6">
            <h3
              className="font-mono text-[11px] uppercase tracking-wider"
              style={{ color: 'var(--text-muted)' }}
            >
              Education
            </h3>
            <div className="mt-2 flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {PROFILE.degree}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {PROFILE.institution} — {PROFILE.location}
                </p>
              </div>
              <span
                className="font-mono text-xs"
                style={{ color: 'var(--text-muted)' }}
              >
                Coursework Completed
              </span>
            </div>
          </section>

          {/* Core Competencies */}
          <section className="mt-6">
            <h3
              className="font-mono text-[11px] uppercase tracking-wider"
              style={{ color: 'var(--text-muted)' }}
            >
              Technical Capabilities
            </h3>
            <div className="mt-2.5 grid gap-3 sm:grid-cols-2">
              {PROFILE.coreCompetencies.map((group) => (
                <div
                  key={group.group}
                  className="rounded border p-3"
                  style={{
                    borderColor: 'var(--border-hairline)',
                    backgroundColor: 'var(--bg-surface)',
                  }}
                >
                  <p
                    className="font-mono text-[11px] font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {group.group}
                  </p>
                  <p
                    className="mt-1 text-xs leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {group.items.join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Selected Engineering Projects */}
          <section className="mt-6">
            <h3
              className="font-mono text-[11px] uppercase tracking-wider"
              style={{ color: 'var(--text-muted)' }}
            >
              Selected Engineering Projects
            </h3>
            <div className="mt-3 space-y-3.5">
              {PROJECTS.map((project) => (
                <div
                  key={project.id}
                  className="border-l-2 pl-3.5"
                  style={{ borderColor: 'var(--border-strong)' }}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="flex items-baseline gap-2">
                      <h4
                        className="text-sm font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {project.name}
                      </h4>
                      <span
                        className="font-mono text-[11px]"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {project.categories.join(' / ')}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-[11px]">
                      {project.repoUrl ? (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline"
                          style={{ color: 'var(--accent-cobalt)' }}
                        >
                          GitHub
                        </a>
                      ) : (
                        <span style={{ color: 'var(--text-muted)' }}>Private Repo</span>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-0.5 hover:underline"
                          style={{ color: 'var(--accent-emerald)' }}
                        >
                          <span>Demo</span>
                          <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p
                    className="mt-1 text-xs leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {project.summary}
                  </p>
                  <p
                    className="mt-1 font-mono text-[11px]"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Stack: {project.stack.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

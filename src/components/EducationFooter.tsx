import { ArrowUpRight, FileText, Github, GraduationCap, MapPin } from 'lucide-react';
import { PROFILE, PROJECTS } from '../data/portfolio';

interface EducationFooterProps {
  onOpenResume: () => void;
}

export function EducationFooter({ onOpenResume }: EducationFooterProps) {
  return (
    <footer
      id="education"
      className="no-print border-t"
      style={{ borderColor: 'var(--border-hairline)' }}
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Education block */}
          <div className="lg:col-span-7">
            <span
              className="font-mono text-xs uppercase tracking-wider"
              style={{ color: 'var(--text-muted)' }}
            >
              Education &amp; Background
            </span>
            <div
              className="mt-4 rounded-lg border p-6"
              style={{
                borderColor: 'var(--border-hairline)',
                backgroundColor: 'var(--bg-surface)',
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border"
                  style={{
                    borderColor: 'var(--border-hairline)',
                    backgroundColor: 'var(--bg-elevated)',
                  }}
                >
                  <GraduationCap
                    className="h-4 w-4"
                    style={{ color: 'var(--accent-emerald)' }}
                  />
                </div>
                <div>
                  <h3
                    className="text-base font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {PROFILE.institution}
                  </h3>
                  <p
                    className="mt-0.5 text-sm font-medium"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {PROFILE.degree}
                  </p>
                  <p
                    className="mt-2 flex items-center gap-1.5 text-xs"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{PROFILE.educationNote}</span>
                  </p>
                </div>
              </div>

              <div
                className="mt-5 flex flex-wrap gap-2 border-t pt-4"
                style={{ borderColor: 'var(--border-hairline)' }}
              >
                {PROFILE.focusAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded px-2.5 py-1 font-mono text-[11px]"
                    style={{
                      backgroundColor: 'var(--bg-subtle)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Direct Links & Contact */}
          <div className="lg:col-span-5">
            <span
              className="font-mono text-xs uppercase tracking-wider"
              style={{ color: 'var(--text-muted)' }}
            >
              Repositories &amp; Links
            </span>
            <div
              className="mt-4 flex flex-col justify-between rounded-lg border p-6"
              style={{
                borderColor: 'var(--border-hairline)',
                backgroundColor: 'var(--bg-surface)',
              }}
            >
              <div>
                <h3
                  className="text-base font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Inspect Code &amp; Live Deployments
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  All case-study repositories, unit test suites, and CI workflows are public
                  on GitHub.
                </p>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  <a
                    href={PROFILE.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md px-3.5 py-2 text-xs font-semibold transition-opacity hover:opacity-90"
                    style={{
                      backgroundColor: 'var(--text-primary)',
                      color: 'var(--bg-canvas)',
                    }}
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>github.com/ateoim</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={onOpenResume}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-md border px-3.5 py-2 text-xs font-semibold transition-colors"
                    style={{
                      borderColor: 'var(--border-strong)',
                      backgroundColor: 'var(--bg-elevated)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <FileText
                      className="h-3.5 w-3.5"
                      style={{ color: 'var(--accent-cobalt)' }}
                    />
                    <span>Print-Friendly Overview</span>
                  </button>
                </div>
              </div>

              <div
                className="mt-6 border-t pt-4"
                style={{ borderColor: 'var(--border-hairline)' }}
              >
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 font-mono text-[11px]">
                  {PROJECTS.map((project) => (
                    <a
                      key={project.id}
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 truncate transition-opacity hover:opacity-80"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      <span className="truncate">{project.name}</span>
                      <ArrowUpRight className="h-3 w-3 shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-12 flex flex-col items-start justify-between gap-2 border-t pt-6 font-mono text-xs sm:flex-row sm:items-center"
          style={{
            borderColor: 'var(--border-hairline)',
            color: 'var(--text-muted)',
          }}
        >
          <span>
            © {new Date().getFullYear()} {PROFILE.name} · {PROFILE.location}
          </span>
          <span>Built with React, TypeScript &amp; Vite · Static GitHub Pages Build</span>
        </div>
      </div>
    </footer>
  );
}

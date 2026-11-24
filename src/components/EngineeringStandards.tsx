import {
  BookOpen,
  Database,
  FlaskConical,
  GitPullRequest,
  ShieldCheck,
} from 'lucide-react';
import { ENGINEERING_STANDARDS } from '../data/portfolio';

const STANDARD_ICONS = {
  testing: FlaskConical,
  cicd: GitPullRequest,
  types: ShieldCheck,
  data: Database,
  docs: BookOpen,
} as const;

export function EngineeringStandards() {
  return (
    <section
      id="standards"
      className="border-t py-16 sm:py-20"
      style={{
        borderColor: 'var(--border-hairline)',
        backgroundColor: 'var(--bg-elevated)',
      }}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span
              className="font-mono text-xs uppercase tracking-wider"
              style={{ color: 'var(--accent-emerald)' }}
            >
              Architecture &amp; Engineering Standards
            </span>
            <h2
              className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl"
              style={{ color: 'var(--text-primary)' }}
            >
              Verification &amp; Delivery Discipline
            </h2>
          </div>
          <p
            className="max-w-md text-sm leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Consistent engineering practices applied across every repository.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {ENGINEERING_STANDARDS.map((standard) => {
            const Icon =
              STANDARD_ICONS[standard.id as keyof typeof STANDARD_ICONS] ?? ShieldCheck;
            return (
              <div
                key={standard.id}
                className="flex flex-col justify-between rounded-lg border p-5"
                style={{
                  borderColor: 'var(--border-hairline)',
                  backgroundColor: 'var(--bg-surface)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <Icon
                      className="h-4 w-4"
                      style={{ color: 'var(--accent-cobalt)' }}
                    />
                    <span
                      className="rounded px-2 py-0.5 font-mono text-[10px]"
                      style={{
                        backgroundColor: 'var(--bg-subtle)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {standard.tag}
                    </span>
                  </div>

                  <h3
                    className="mt-4 text-sm font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {standard.title}
                  </h3>
                  <p
                    className="mt-2 text-xs leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {standard.description}
                  </p>
                </div>

                <p
                  className="mt-4 border-t pt-3 font-mono text-[11px]"
                  style={{
                    borderColor: 'var(--border-hairline)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {standard.practice}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { ArrowUpRight, FileText, Github, GraduationCap, MapPin } from 'lucide-react';
import {
  FILTER_CATEGORIES,
  PROFILE,
  type FilterCategory,
} from '../data/portfolio';

interface HeroProps {
  activeCategory: FilterCategory;
  categoryCounts: Record<FilterCategory, number>;
  onSelectCategory: (category: FilterCategory) => void;
  onOpenResume: () => void;
}

export function Hero({
  activeCategory,
  categoryCounts,
  onSelectCategory,
  onOpenResume,
}: HeroProps) {
  return (
    <section
      id="top"
      className="architectural-grid border-b"
      style={{ borderColor: 'var(--border-hairline)' }}
    >
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <span
            className="inline-flex items-center gap-1.5 rounded border px-2.5 py-1"
            style={{
              borderColor: 'var(--border-hairline)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-secondary)',
            }}
          >
            <GraduationCap className="h-3.5 w-3.5" style={{ color: 'var(--accent-emerald)' }} />
            <span>RMIT University · Bachelor of Information Technology</span>
          </span>
          <span
            className="inline-flex items-center gap-1.5 rounded border px-2.5 py-1"
            style={{
              borderColor: 'var(--border-hairline)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-muted)',
            }}
          >
            <MapPin className="h-3.5 w-3.5" />
            <span>{PROFILE.location}</span>
          </span>
        </div>

        <div className="mt-8 max-w-3xl">
          <h1
            className="text-3xl font-semibold tracking-tight sm:text-5xl sm:leading-[1.12]"
            style={{ color: 'var(--text-primary)' }}
          >
            {PROFILE.headline}
          </h1>
          <p
            className="mt-5 text-base leading-relaxed sm:text-lg"
            style={{ color: 'var(--text-secondary)' }}
          >
            {PROFILE.subheadline}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href="https://tom-modelscope-demo.netlify.app/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
            style={{
              backgroundColor: 'var(--accent-emerald)',
              color: '#06120E',
            }}
          >
            <span>Try Lead Demo: 16 GB GPU Fit (ModelScope)</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium transition-colors"
            style={{
              borderColor: 'var(--border-strong)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-primary)',
            }}
          >
            <Github className="h-4 w-4" />
            <span>GitHub Profile</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>

          <button
            type="button"
            onClick={onOpenResume}
            className="inline-flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium transition-colors"
            style={{
              borderColor: 'var(--border-strong)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-primary)',
            }}
          >
            <FileText className="h-4 w-4" style={{ color: 'var(--accent-cobalt)' }} />
            <span>Capabilities &amp; Resume Overview</span>
          </button>
        </div>

        <div
          className="mt-12 border-t pt-6"
          style={{ borderColor: 'var(--border-hairline)' }}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span
              className="font-mono text-xs uppercase tracking-wider"
              style={{ color: 'var(--text-muted)' }}
            >
              Filter by Engineering Focus
            </span>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by focus">
              {FILTER_CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => onSelectCategory(category)}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors"
                    style={{
                      borderColor: isActive ? 'var(--accent-cobalt)' : 'var(--border-hairline)',
                      backgroundColor: isActive
                        ? 'var(--accent-cobalt-soft)'
                        : 'var(--bg-surface)',
                      color: isActive ? 'var(--accent-cobalt)' : 'var(--text-secondary)',
                    }}
                  >
                    <span>{category}</span>
                    <span
                      className="font-mono text-[11px]"
                      style={{ opacity: isActive ? 0.95 : 0.7 }}
                    >
                      {categoryCounts[category]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

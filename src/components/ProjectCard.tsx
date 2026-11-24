import { ArrowUpRight, ExternalLink, Github, Layers } from 'lucide-react';
import type { Project } from '../data/portfolio';

interface ProjectCardProps {
  project: Project;
  index: number;
  onInspect: (project: Project) => void;
}

export function ProjectCard({ project, index, onInspect }: ProjectCardProps) {
  const numberLabel = String(index + 1).padStart(2, '0');

  return (
    <article
      className="surface-card group flex flex-col justify-between rounded-lg p-6"
      style={{ backgroundColor: 'var(--bg-surface)' }}
    >
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="font-mono text-xs font-medium"
              style={{ color: 'var(--text-muted)' }}
            >
              {numberLabel}
            </span>
            {project.categories.map((category) => (
              <span
                key={category}
                className="rounded border px-2 py-0.5 font-mono text-[11px]"
                style={{
                  borderColor: 'var(--border-hairline)',
                  backgroundColor: 'var(--bg-subtle)',
                  color: 'var(--text-secondary)',
                }}
              >
                {category}
              </span>
            ))}
          </div>

          {project.featured && (
            <span
              className="shrink-0 rounded px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider"
              style={{
                backgroundColor: 'var(--accent-emerald-soft)',
                color: 'var(--accent-emerald)',
              }}
            >
              Flagship
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => onInspect(project)}
          className="mt-4 block w-full cursor-pointer text-left"
        >
          <h3
            className="text-xl font-semibold tracking-tight transition-colors group-hover:underline"
            style={{ color: 'var(--text-primary)' }}
          >
            {project.name}
          </h3>
          <p
            className="mt-1 text-sm font-medium"
            style={{ color: 'var(--text-secondary)' }}
          >
            {project.tagline}
          </p>
        </button>

        <p
          className="mt-3 text-sm leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
        >
          {project.summary}
        </p>

        <div
          className="mt-4 flex items-center gap-2 rounded border px-3 py-2 font-mono text-xs"
          style={{
            borderColor: 'var(--border-hairline)',
            backgroundColor: 'var(--bg-elevated)',
            color: 'var(--text-secondary)',
          }}
        >
          <Layers className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--accent-cobalt)' }} />
          <span className="truncate">{project.highlightMetric}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded px-2 py-0.5 font-mono text-[11px]"
              style={{
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--text-secondary)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div
        className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-4"
        style={{ borderColor: 'var(--border-hairline)' }}
      >
        <button
          type="button"
          onClick={() => onInspect(project)}
          className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold transition-opacity hover:opacity-80"
          style={{ color: 'var(--accent-cobalt)' }}
        >
          <span>Read Case Study</span>
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>

        <div className="flex items-center gap-3 text-xs font-medium">
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 transition-opacity hover:opacity-80"
            style={{ color: 'var(--text-secondary)' }}
          >
            <Github className="h-3.5 w-3.5" />
            <span>Source</span>
          </a>
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 transition-opacity hover:opacity-80"
              style={{ color: 'var(--accent-emerald)' }}
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

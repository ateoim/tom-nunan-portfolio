import { ArrowUpRight, Boxes } from 'lucide-react';
import {
  PROJECTS,
  ROLE_TRACKS,
  getProjectById,
  type Project,
  type RoleTrackId,
} from '../data/portfolio';

interface RoleAlignmentMatrixProps {
  activeTrackId: RoleTrackId;
  onSelectTrack: (trackId: RoleTrackId) => void;
  onInspectProject: (project: Project) => void;
}

export function RoleAlignmentMatrix({
  activeTrackId,
  onSelectTrack,
  onInspectProject,
}: RoleAlignmentMatrixProps) {
  const activeTrack =
    ROLE_TRACKS.find((track) => track.id === activeTrackId) ?? ROLE_TRACKS[0]!;

  return (
    <section
      id="capabilities"
      className="border-t py-16 sm:py-20"
      style={{ borderColor: 'var(--border-hairline)' }}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span
              className="font-mono text-xs uppercase tracking-wider"
              style={{ color: 'var(--accent-cobalt)' }}
            >
              Capabilities Matrix
            </span>
            <h2
              className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl"
              style={{ color: 'var(--text-primary)' }}
            >
              Role Alignment &amp; Concrete Evidence
            </h2>
          </div>
          <p
            className="max-w-md text-sm leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            Select a hiring track to inspect how implemented modules map directly to role
            responsibilities.
          </p>
        </div>

        <div
          className="mt-8 flex flex-wrap gap-2 border-b pb-4"
          style={{ borderColor: 'var(--border-hairline)' }}
          role="tablist"
          aria-label="Hiring tracks"
        >
          {ROLE_TRACKS.map((track) => {
            const isActive = track.id === activeTrack.id;
            return (
              <button
                key={track.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectTrack(track.id)}
                className="cursor-pointer rounded-md border px-3.5 py-2 text-xs font-medium transition-colors sm:text-sm"
                style={{
                  borderColor: isActive ? 'var(--accent-cobalt)' : 'var(--border-hairline)',
                  backgroundColor: isActive
                    ? 'var(--accent-cobalt-soft)'
                    : 'var(--bg-surface)',
                  color: isActive ? 'var(--accent-cobalt)' : 'var(--text-secondary)',
                }}
              >
                {track.label}
              </button>
            );
          })}
        </div>

        <div
          className="mt-6 rounded-lg border p-6"
          style={{
            borderColor: 'var(--border-hairline)',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <div
            className="flex flex-col gap-4 border-b pb-5 lg:flex-row lg:items-center lg:justify-between"
            style={{ borderColor: 'var(--border-hairline)' }}
          >
            <div className="max-w-2xl">
              <h3
                className="text-lg font-semibold tracking-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                {activeTrack.label}
              </h3>
              <p
                className="mt-1 text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {activeTrack.positioning}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {activeTrack.coreTools.map((tool) => (
                <span
                  key={tool}
                  className="rounded border px-2.5 py-1 font-mono text-[11px]"
                  style={{
                    borderColor: 'var(--border-hairline)',
                    backgroundColor: 'var(--bg-elevated)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {activeTrack.capabilities.map((item) => (
              <div
                key={item.capability}
                className="flex flex-col justify-between rounded-md border p-4"
                style={{
                  borderColor: 'var(--border-hairline)',
                  backgroundColor: 'var(--bg-elevated)',
                }}
              >
                <div>
                  <h4
                    className="text-sm font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {item.capability}
                  </h4>
                  <p
                    className="mt-2 text-xs leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {item.evidence}
                  </p>

                  <div className="mt-4 space-y-1.5">
                    <span
                      className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <Boxes className="h-3 w-3" />
                      <span>Implemented Modules</span>
                    </span>
                    <ul className="space-y-1">
                      {item.modules.map((mod) => (
                        <li
                          key={mod}
                          className="font-mono text-[11px]"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          · {mod}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div
                  className="mt-4 flex flex-wrap gap-2 border-t pt-3"
                  style={{ borderColor: 'var(--border-hairline)' }}
                >
                  {item.projectIds.map((projectId) => {
                    const linkedProject = getProjectById(PROJECTS, projectId);
                    if (!linkedProject) return null;
                    return (
                      <button
                        key={projectId}
                        type="button"
                        onClick={() => onInspectProject(linkedProject)}
                        className="inline-flex cursor-pointer items-center gap-1 rounded border px-2 py-1 font-mono text-[11px] font-medium transition-colors"
                        style={{
                          borderColor: 'var(--border-strong)',
                          backgroundColor: 'var(--bg-surface)',
                          color: 'var(--accent-cobalt)',
                        }}
                      >
                        <span>{linkedProject.name}</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

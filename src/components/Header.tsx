import { FileText, Github, Moon, Sun } from 'lucide-react';
import { PROFILE } from '../data/portfolio';

interface HeaderProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenResume: () => void;
}

export function Header({ theme, onToggleTheme, onOpenResume }: HeaderProps) {
  return (
    <header
      className="no-print sticky top-0 z-30 border-b backdrop-blur-md"
      style={{
        borderColor: 'var(--border-hairline)',
        backgroundColor: 'color-mix(in srgb, var(--bg-canvas) 86%, transparent)',
      }}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          className="flex items-center gap-2.5 text-sm font-semibold tracking-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded border font-mono text-xs font-semibold"
            style={{
              borderColor: 'var(--border-strong)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-primary)',
            }}
          >
            TN
          </span>
          <span>{PROFILE.name}</span>
          <span
            className="hidden font-mono text-xs font-normal sm:inline"
            style={{ color: 'var(--text-muted)' }}
          >
            / portfolio
          </span>
        </a>

        <nav className="hidden items-center gap-6 text-xs font-medium md:flex">
          {[
            { label: 'Case Studies', href: '#work' },
            { label: 'Role Alignment', href: '#capabilities' },
            { label: 'Standards', href: '#standards' },
            { label: 'Education', href: '#education' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:opacity-100"
              style={{ color: 'var(--text-secondary)' }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenResume}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors"
            style={{
              borderColor: 'var(--border-hairline)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-primary)',
            }}
          >
            <FileText className="h-3.5 w-3.5" style={{ color: 'var(--accent-cobalt)' }} />
            <span>Resume</span>
          </button>

          <a
            href={PROFILE.githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Tom Nunan on GitHub"
            className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors"
            style={{
              borderColor: 'var(--border-hairline)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-secondary)',
            }}
          >
            <Github className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{PROFILE.githubHandle}</span>
          </a>

          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to warm-paper light mode' : 'Switch to dark mode'}
            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border transition-colors"
            style={{
              borderColor: 'var(--border-hairline)',
              backgroundColor: 'var(--bg-surface)',
              color: 'var(--text-secondary)',
            }}
          >
            {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
    </header>
  );
}

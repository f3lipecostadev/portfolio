import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type IconName =
  'GitHub' | 'LinkedIn' | 'Instagram' | 'External' | 'Folder' | 'Star' | 'Fork' | 'Bookmark';

// Ícones no estilo Feather (traço de 2px, sem preenchimento)
const paths: Record<IconName, ReactNode> = {
  GitHub: (
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  ),
  LinkedIn: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>
  ),
  Instagram: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </>
  ),
  External: (
    <>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </>
  ),
  Folder: <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />,
  Star: (
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  ),
  Fork: (
    <>
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </>
  ),
  Bookmark: <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />,
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('fill-none', className)}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

const HEX = 'M50 3 L91 26 L91 74 L50 97 L9 74 L9 26 Z';

/** Hexágono vazado (sombra do logo) */
export function HexOutline() {
  return (
    <svg viewBox="0 0 100 100" className="fill-none" aria-hidden="true">
      <path d={HEX} stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
    </svg>
  );
}

/** Hexágono preenchido com as iniciais */
export function HexLogo({ initials }: { initials: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <path
        d={HEX}
        fill="var(--color-navy)"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <text
        x="50"
        y="62"
        textAnchor="middle"
        fontSize="34"
        fontWeight="600"
        className="fill-current font-mono"
      >
        {initials}
      </text>
    </svg>
  );
}

export { HEX };

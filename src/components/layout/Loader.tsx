'use client';

import { useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { HEX } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

/** Tela de abertura: o hexágono é "desenhado" e as iniciais aparecem. */
export default function Loader({ onFinish }: { onFinish: () => void }) {
  const reduced = usePrefersReducedMotion();
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    document.body.classList.add('no-scroll');
    const fadeTimer = setTimeout(() => setLeaving(true), reduced ? 0 : 3000);
    const doneTimer = setTimeout(onFinish, reduced ? 150 : 3300);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
      document.body.classList.remove('no-scroll');
    };
  }, [reduced, onFinish]);

  return (
    <div
      role="status"
      aria-label="Carregando"
      className={cn(
        'fixed inset-0 z-[99] flex items-center justify-center bg-dark-navy transition-opacity duration-300',
        leaving && 'opacity-0'
      )}
    >
      <svg
        viewBox="0 0 100 100"
        className="loader-logo h-[100px] w-[100px] fill-none"
        aria-hidden="true"
      >
        <path
          className="loader-hex"
          d={HEX}
          pathLength={1}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <text
          className="loader-text fill-current font-mono"
          x="50"
          y="63"
          textAnchor="middle"
          fontSize="34"
          fontWeight="600"
        >
          {siteConfig.initials}
        </text>
      </svg>
    </div>
  );
}

import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SideProps {
  orientation: 'left' | 'right';
  isHome: boolean;
  children: ReactNode;
}

/** Barras fixas nas laterais (redes sociais à esquerda, e-mail à direita). Somem no mobile. */
export default function Side({ orientation, isHome, children }: SideProps) {
  return (
    <div
      className={cn(
        'fixed bottom-0 z-10 w-10 text-light-slate max-md:hidden',
        orientation === 'left' ? 'left-10 max-lg:left-5' : 'right-10 max-lg:right-5',
        isHome && 'anim anim-fade'
      )}
      style={isHome ? ({ '--delay': '1000ms' } as CSSProperties) : undefined}
    >
      <div className="flex flex-col items-center after:mx-auto after:block after:h-[90px] after:w-px after:bg-light-slate after:content-['']">
        {children}
      </div>
    </div>
  );
}

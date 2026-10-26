'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import { siteConfig } from '@/config/site';
import { useOnClickOutside } from '@/hooks/useOnClickOutside';
import { cn } from '@/lib/utils';

interface MenuProps {
  animate?: boolean;
  delay?: number;
}

export default function Menu({ animate = false, delay = 0 }: MenuProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const close = useCallback(() => setOpen(false), []);

  useOnClickOutside(wrapperRef, close);

  // Desfoca o conteúdo e bloqueia o scroll enquanto o menu está aberto
  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  // ESC fecha o menu; Tab fica preso dentro dele (focus trap)
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusable = [
        buttonRef.current,
        ...Array.from(navRef.current?.querySelectorAll<HTMLElement>('a[href]') ?? []),
      ].filter((el): el is HTMLElement => Boolean(el));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  // Fecha ao voltar para a tela larga
  useEffect(() => {
    const onResize = () => window.innerWidth > 768 && setOpen(false);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <div ref={wrapperRef} className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        className={cn('ham-btn', animate && 'anim anim-fadedown')}
        style={animate ? ({ '--delay': `${delay}ms` } as CSSProperties) : undefined}
        data-open={open}
        onClick={() => setOpen((value) => !value)}
        aria-label="Menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        <span className="ham-box">
          <span className="ham-inner" />
        </span>
      </button>

      <aside
        id="mobile-menu"
        inert={!open}
        aria-hidden={!open}
        className={cn(
          'fixed inset-y-0 right-0 z-[9] flex h-screen w-[min(75vw,400px)] items-center justify-center bg-light-navy px-2.5 py-[50px] shadow-[-10px_0_30px_-15px_var(--navy-shadow)] transition-all duration-300 ease-site',
          open ? 'visible translate-x-0' : 'invisible translate-x-[100vw]'
        )}
      >
        <nav
          ref={navRef}
          className="menu-nav flex w-full flex-col items-center text-center font-mono"
        >
          <ol className="nav-list m-0 w-full list-none p-0">
            {siteConfig.navLinks.map(({ name, url }) => (
              <li key={name} className="relative mb-5 text-[clamp(14px,4vw,18px)]">
                <Link href={url} onClick={close}>
                  {name}
                </Link>
              </li>
            ))}
          </ol>
          <a
            href={siteConfig.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn mx-auto mt-[10%] w-1/2 min-w-[140px] px-4 py-[18px] text-center text-sm"
          >
            Currículo
          </a>
        </nav>
      </aside>
    </div>
  );
}

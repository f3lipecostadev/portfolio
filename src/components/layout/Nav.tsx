'use client';

import Link from 'next/link';
import { useEffect, useState, type CSSProperties } from 'react';
import { siteConfig } from '@/config/site';
import { useScrollDirection } from '@/hooks/useScrollDirection';
import { HexLogo, HexOutline } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import Menu from '@/components/layout/Menu';

export default function Nav({ isHome }: { isHome: boolean }) {
  const direction = useScrollDirection();
  const [scrolledToTop, setScrolledToTop] = useState(true);

  useEffect(() => {
    const onScroll = () => setScrolledToTop(window.scrollY < 50);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const animClass = isHome ? 'anim anim-fadedown' : undefined;
  const delay = (index: number): CSSProperties | undefined =>
    isHome ? ({ '--delay': `${index * 100}ms` } as CSSProperties) : undefined;
  const total = siteConfig.navLinks.length;

  return (
    <header className="site-header" data-scrolled={!scrolledToTop} data-dir={direction}>
      <nav className="relative flex w-full items-center justify-between font-mono text-[13px]">
        <div className={animClass} style={delay(0)}>
          <Link href="/" aria-label="Página inicial" className="logo-link">
            <span className="logo-bg">
              <HexOutline />
            </span>
            <span className="logo-fg">
              <HexLogo initials={siteConfig.initials} />
            </span>
          </Link>
        </div>

        <div className="flex items-center">
          <ol className="nav-list m-0 flex list-none items-center justify-between p-0 max-md:hidden">
            {siteConfig.navLinks.map(({ name, url }, index) => (
              <li key={name} className={animClass} style={delay(index + 1)}>
                <Link href={url}>{name}</Link>
              </li>
            ))}
          </ol>

          <div className={cn('max-md:hidden', animClass)} style={delay(total + 1)}>
            <a
              href={siteConfig.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm ml-4"
            >
              Currículo
            </a>
          </div>

          <Menu animate={isHome} delay={(total + 1) * 100} />
        </div>
      </nav>
    </header>
  );
}

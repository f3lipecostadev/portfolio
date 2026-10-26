'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import Email from '@/components/layout/Email';
import Footer from '@/components/layout/Footer';
import Loader from '@/components/layout/Loader';
import Nav from '@/components/layout/Nav';
import Side from '@/components/layout/Side';
import SocialList from '@/components/layout/SocialList';

/**
 * Casca do site: loader (somente na home), navegação, barras laterais e rodapé.
 * O conteúdo é renderizado por baixo do loader, então continua presente no HTML (SEO).
 * Enquanto `data-loading="true"`, as animações de entrada ficam pausadas.
 */
export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isLoading, setIsLoading] = useState(isHome);
  const finishLoading = useCallback(() => setIsLoading(false), []);

  // Depois do loader, rola até a âncora da URL (ex.: /#about)
  useEffect(() => {
    if (isLoading) return;
    const id = window.location.hash.slice(1);
    if (!id) return;
    const timer = setTimeout(() => document.getElementById(id)?.scrollIntoView(), 0);
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div data-loading={isLoading}>
      <a className="skip-to-content" href="#content">
        Pular para o conteúdo
      </a>

      {isLoading && <Loader onFinish={finishLoading} />}

      <div className="flex min-h-screen flex-col">
        <Nav isHome={isHome} />
        <Side orientation="left" isHome={isHome}>
          <SocialList className="flex-col items-center" />
        </Side>
        <Side orientation="right" isHome={isHome}>
          <Email />
        </Side>

        <div id="content">
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
}

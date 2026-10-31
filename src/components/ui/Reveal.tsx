'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';
import { cn } from '@/lib/utils';

interface RevealProps {
  as?: 'div' | 'section' | 'li' | 'header' | 'article';
  id?: string;
  className?: string;
  /** Atraso em ms antes de a animação começar */
  delay?: number;
  children: ReactNode;
}

/** Revela o conteúdo com fade + slide quando entra na tela (respeita reduced motion via CSS). */
export default function Reveal({ as = 'div', id, className, delay = 0, children }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const Tag = as as ElementType;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={cn('reveal', visible && 'in-view', className)}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

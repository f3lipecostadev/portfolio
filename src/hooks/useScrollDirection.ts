'use client';

import { useEffect, useState } from 'react';

export type ScrollDirection = 'up' | 'down';

export function useScrollDirection(initial: ScrollDirection = 'down'): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>(initial);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) >= 5) {
        setDirection(y > lastY ? 'down' : 'up');
        lastY = y > 0 ? y : 0;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return direction;
}

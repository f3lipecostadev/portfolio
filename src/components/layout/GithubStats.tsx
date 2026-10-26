'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@/components/ui/Icon';

/** Mostra stars e forks do repositório do portfólio (só em produção). */
export default function GithubStats({ repo }: { repo: string }) {
  const [stats, setStats] = useState<{ stars: number; forks: number } | null>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    let active = true;
    fetch(`https://api.github.com/repos/${repo}`)
      .then((response) => (response.ok ? response.json() : null))
      .then((json) => {
        if (active && json) setStats({ stars: json.stargazers_count, forks: json.forks_count });
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [repo]);

  if (!stats) return null;

  return (
    <div className="mt-2.5 flex items-center justify-center gap-5">
      <span className="flex items-center gap-1">
        <Icon name="Star" className="h-[15px] w-[15px]" />
        {stats.stars}
      </span>
      <span className="flex items-center gap-1">
        <Icon name="Fork" className="h-[15px] w-[15px]" />
        {stats.forks}
      </span>
    </div>
  );
}

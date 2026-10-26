'use client';

import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import Reveal from '@/components/ui/Reveal';
import type { Job } from '@/types/content';

export default function Jobs({ jobs }: { jobs: Job[] }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Setas navegam entre as abas (padrão WAI-ARIA para tablist)
  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const forward = event.key === 'ArrowDown' || event.key === 'ArrowRight';
    const backward = event.key === 'ArrowUp' || event.key === 'ArrowLeft';
    if (!forward && !backward) return;
    event.preventDefault();
    const next = (active + (forward ? 1 : -1) + jobs.length) % jobs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <Reveal as="section" id="jobs" className="max-w-[700px]">
      <h2 className="numbered-heading">Experiência Profissional</h2>

      <div className="jobs-inner">
        <ul
          className="tab-list"
          role="tablist"
          aria-label="Abas de experiência"
          onKeyDown={onKeyDown}
          style={{ '--active': active } as CSSProperties}
        >
          {jobs.map((job, index) => (
            <li key={job.slug}>
              <button
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                type="button"
                className="tab-btn"
                role="tab"
                id={`tab-${index}`}
                aria-selected={active === index}
                aria-controls={`panel-${index}`}
                tabIndex={active === index ? 0 : -1}
                onClick={() => setActive(index)}
              >
                <span>{job.company}</span>
              </button>
            </li>
          ))}
          <li className="tab-highlight" aria-hidden="true" />
        </ul>

        <div className="relative w-full">
          {jobs.map((job, index) => (
            <div
              key={job.slug}
              className="tab-panel"
              role="tabpanel"
              id={`panel-${index}`}
              aria-labelledby={`tab-${index}`}
              tabIndex={0}
              hidden={active !== index}
            >
              <h3 className="mb-0.5 text-[21px] font-medium leading-[1.3]">
                <span>{job.title}</span>
                <span className="text-green">
                  {' '}
                  @{' '}
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-link"
                  >
                    {job.company}
                  </a>
                </span>
              </h3>
              <p className="mb-6 font-mono text-[13px] text-light-slate">
                {job.range}
                {job.location && ` · ${job.location}`}
              </p>
              <div
                className="fancy-list md-content"
                dangerouslySetInnerHTML={{ __html: job.html }}
              />
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

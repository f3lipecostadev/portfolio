import { siteConfig } from '@/config/site';

export default function Email() {
  return (
    <a
      href={`mailto:${siteConfig.email}`}
      className="my-5 p-2.5 font-mono text-xs tracking-[0.1em] [writing-mode:vertical-rl] hover:-translate-y-[3px] focus-visible:-translate-y-[3px]"
    >
      {siteConfig.email}
    </a>
  );
}

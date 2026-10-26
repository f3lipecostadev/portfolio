import { siteConfig } from '@/config/site';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

export default function SocialList({ className }: { className?: string }) {
  return (
    <ul className={cn('m-0 flex list-none p-0', className)}>
      {siteConfig.socialMedia.map(({ name, url }) => (
        <li key={name}>
          <a
            href={url}
            aria-label={name}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 hover:-translate-y-[3px] focus-visible:-translate-y-[3px]"
          >
            <Icon name={name} className="h-5 w-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}

import { siteConfig } from '@/config/site';
import SocialList from '@/components/layout/SocialList';
import GithubStats from '@/components/layout/GithubStats';

export default function Footer() {
  const repoUrl = siteConfig.githubRepo ? `https://github.com/${siteConfig.githubRepo}` : null;

  return (
    <footer className="flex h-auto min-h-[70px] flex-col items-center justify-center p-4 text-center">
      <div className="mb-2.5 hidden w-full max-w-[270px] text-light-slate max-md:block">
        <SocialList className="items-center justify-between" />
      </div>

      <div className="font-mono text-xs leading-none">
        {repoUrl ? (
          <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="p-2.5">
            <div>Desenvolvido por {siteConfig.fullName}</div>
          </a>
        ) : (
          <div className="p-2.5">Desenvolvido por {siteConfig.fullName}</div>
        )}
        {siteConfig.githubRepo && <GithubStats repo={siteConfig.githubRepo} />}
      </div>
    </footer>
  );
}

import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} | ${siteConfig.title}`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: '/',
    display: 'minimal-ui',
    lang: 'pt-BR',
    background_color: '#0C1C27',
    theme_color: siteConfig.themeColor,
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}

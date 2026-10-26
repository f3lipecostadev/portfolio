import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Evita que `next dev` crie/atualize o AGENTS.md automaticamente (mantém o git status limpo)
  agentRules: false,

  // Tailwind CSS v4 via loader do Turbopack (padrão desta versão do Next.js)
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
};

export default nextConfig;

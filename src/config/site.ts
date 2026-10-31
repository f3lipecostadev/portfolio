export interface SocialLink {
  name: 'GitHub' | 'LinkedIn' | 'Instagram';
  url: string;
}

export const siteConfig = {
  name: 'Felipe Costa',
  fullName: 'Felipe Kauã de Sousa Costa',
  initials: 'FC',
  title: 'Desenvolvedor de Software',
  description:
    'Felipe Costa é desenvolvedor de software em formação, com experiência em aplicações web, integração de APIs e soluções tecnológicas. Portfólio com projetos, experiência e contato.',
  // Para usar outro domínio, defina NEXT_PUBLIC_SITE_URL na Vercel (a variável tem prioridade).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://portfolio-f3lipe.vercel.app',
  locale: 'pt-BR',
  email: 'f3lipecosta.dev@gmail.com',
  resume: '/curriculo.pdf',
  // Formato 'usuario/repositorio'. Se preenchido, o rodapé exibe stars e forks.
  githubRepo: '',
  themeColor: '#142B3B',
  blogName: 'Diário de Desenvolvimento',
  socialMedia: [
    { name: 'GitHub', url: 'https://github.com/f3lipecostadev' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/f3lipecosta/' },
    { name: 'Instagram', url: 'https://www.instagram.com/f3lipe_cosst/' },
  ] satisfies SocialLink[],
  navLinks: [
    { name: 'Sobre', url: '/#about' },
    { name: 'Experiência', url: '/#jobs' },
    { name: 'Projetos', url: '/#projects' },
    { name: 'Contato', url: '/#contact' },
  ],
} as const;

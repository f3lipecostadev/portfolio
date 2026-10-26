import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Featured from '@/components/sections/Featured';
import Hero from '@/components/sections/Hero';
import Jobs from '@/components/sections/Jobs';
import Projects from '@/components/sections/Projects';
import { getFeatured, getJobs, getProjects } from '@/lib/content';

export default async function HomePage() {
  const [jobs, featured, projects] = await Promise.all([getJobs(), getFeatured(), getProjects()]);
  const gridProjects = projects.filter((project) => project.showInProjects);

  return (
    <main className="fill-height [counter-reset:section]">
      <Hero />
      <About />
      {jobs.length > 0 && <Jobs jobs={jobs} />}
      {featured.length > 0 && <Featured items={featured} />}
      {gridProjects.length > 0 && <Projects projects={gridProjects} />}
      <Contact />
    </main>
  );
}

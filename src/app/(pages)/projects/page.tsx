import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from '@/components/image';
import { Button } from '@/components/ui/button';
import { getAllProject } from './data';

export default function Page() {
  const projects = getAllProject();

  return (
    <div className="container mx-auto max-w-5xl">
      {/* Hero Section */}
      <section className="py-10 md:py-20">
        <div className="container mx-auto flex flex-col items-center gap-4">
          <h1 className="mb-4 max-w-[30ch] text-center font-bold text-3xl md:text-4xl">
            Our work and case studies in collaboration with industry leading
            teams
          </h1>
          <Link href={{ pathname: '/', query: { contact: true } }}>
            <Button className="cursor-pointer">Contact us</Button>
          </Link>
        </div>
      </section>

      {/* Case Studies Grid - Inspired by Vercel */}
      <section className="py-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              className="group flex flex-col rounded-lg border border-border/50 bg-background p-8 transition-all duration-300 hover:bg-muted/50"
              href={{
                pathname: `/projects/${project.slug}`,
              }}
              key={project.slug}
              prefetch={false}
            >
              <div className="flex h-full flex-col justify-between gap-6">
                {/* Logo */}
                <div className="h-6">
                  <Image
                    alt={project.title}
                    className="h-6 w-auto object-contain object-left invert dark:invert-0"
                    src={project.logo}
                  />
                </div>

                {/* Quote/Content */}
                <div>
                  <p className="font-medium text-xl leading-snug tracking-tight md:text-2xl">
                    "{project.description}"
                  </p>

                  {/* Read More Link */}
                  <div className="flex items-center justify-between pt-6">
                    <span className="text-muted-foreground text-sm">
                      Read the full story
                    </span>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background transition-transform duration-200 group-hover:translate-x-1">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

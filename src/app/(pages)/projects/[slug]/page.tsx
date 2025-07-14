import { compile, run } from '@mdx-js/mdx';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { components } from '@/lib/mdx';
import { getAllProject, getProject } from '../data';

export const dynamic = 'force-static';
export const dynamicParams = false;

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  const projects = getAllProject();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);

  // Compile the MDX content
  const code = String(
    await compile(project.content, { outputFormat: 'function-body' })
  );

  // Run the compiled code with the runtime
  const { default: Content } = await run(code, {
    jsx,
    jsxs,
    Fragment,
    baseUrl: import.meta.url,
  });

  return (
    <div className="container">
      <div className="mb-6">
        <Link className="text-muted-foreground text-sm" href="/projects">
          &larr; Back to Projects
        </Link>
      </div>
      <article className="prose prose-zinc dark:prose-invert max-w-none">
        <Content components={components} />
      </article>
    </div>
  );
}

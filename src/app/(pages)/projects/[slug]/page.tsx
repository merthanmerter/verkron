import type { Metadata } from 'next';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { components } from '@/lib/mdx';
import { getProject } from '../data';

export const dynamic = 'force-static';

interface Props {
  params: Promise<{
    slug: string;
  }>;
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

  return (
    <div className="container">
      <div className="mb-6">
        <Link className="text-muted-foreground text-sm" href="/projects">
          &larr; Back to Projects
        </Link>
      </div>
      <article className="prose prose-zinc dark:prose-invert max-w-none">
        <MDXRemote components={components} source={project.content} />
      </article>
    </div>
  );
}

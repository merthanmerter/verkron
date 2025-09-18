import { compile, run } from "@mdx-js/mdx";
import { HomeIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { components } from "@/components/mdx";
import { Button } from "@/components/ui/button";
import { projectsService } from "../../definitions";

export const dynamic = "force-static";
export const dynamicParams = false;

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  const projects = projectsService.getAllContent();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsService.getContent(slug);

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const project = projectsService.getContent(slug);

  // Compile the MDX content
  const code = String(
    await compile(project.content, { outputFormat: "function-body" })
  );

  // Run the compiled code with the runtime
  const { default: Content } = await run(code, {
    jsx,
    jsxs,
    Fragment,
    baseUrl: import.meta.url,
  });

  return (
    <div className="container py-8">
      <Button asChild variant="secondary">
        <Link href="/">
          <HomeIcon className="h-4 w-4" /> Back to Home
        </Link>
      </Button>
      <article className="prose prose-zinc dark:prose-invert max-w-none">
        <Content components={components} />
      </article>
    </div>
  );
}

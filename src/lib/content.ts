import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';

// Base content interface that all content types will extend
export interface BaseContent {
  slug: string;
  publishedAt: string;
  content: string;
}

const mdxExtensionRegex = /\.mdx$/;

export class ContentService<T extends BaseContent> {
  private contentDirectory: string;

  constructor(contentType: string) {
    this.contentDirectory = path.join(process.cwd(), 'content', contentType);
  }

  getAllContent(): T[] {
    try {
      const fileNames = fs.readdirSync(this.contentDirectory);
      const allContent = fileNames.map((fileName) => {
        const slug = fileName.replace(mdxExtensionRegex, '');
        const fullPath = path.join(this.contentDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content: mdxContent } = matter(fileContents);

        return {
          slug,
          content: mdxContent,
          ...data,
        } as T;
      });

      // Sort content by date
      return allContent.sort((a, b) => {
        if (a.publishedAt < b.publishedAt) {
          return 1;
        }
        return -1;
      });
    } catch {
      return [];
    }
  }

  getContent(slug: string): T {
    try {
      const fullPath = path.join(this.contentDirectory, `${slug}.mdx`);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content: mdxContent } = matter(fileContents);

      return {
        slug,
        content: mdxContent,
        ...data,
      } as T;
    } catch {
      notFound();
    }
  }
}

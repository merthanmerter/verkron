import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';
import { highlight } from 'sugar-high';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

export const components = {
  h1: (props: HeadingProps) => (
    <h1
      className="mb-8 scroll-m-20 border-b pt-8 pb-4 font-bold text-4xl tracking-tight lg:text-5xl"
      {...props}
    />
  ),
  h2: (props: HeadingProps) => (
    <h2
      className="mt-12 mb-6 scroll-m-20 font-semibold text-2xl tracking-tight"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <h3
      className="mt-8 mb-4 scroll-m-20 font-semibold text-xl tracking-tight"
      {...props}
    />
  ),
  h4: (props: HeadingProps) => (
    <h4
      className="mt-6 mb-3 scroll-m-20 font-semibold text-lg tracking-tight"
      {...props}
    />
  ),
  p: (props: ParagraphProps) => (
    <p
      className="text-zinc-700 leading-7 dark:text-zinc-300 [&:not(:first-child)]:mt-6"
      {...props}
    />
  ),
  ol: (props: ListProps) => (
    <ol
      className="my-6 ml-6 list-decimal marker:text-zinc-500 dark:marker:text-zinc-400 [&>li]:mt-2"
      {...props}
    />
  ),
  ul: (props: ListProps) => (
    <ul
      className="my-6 ml-6 list-disc marker:text-zinc-500 dark:marker:text-zinc-400 [&>li]:mt-2"
      {...props}
    />
  ),
  li: (props: ListItemProps) => (
    <li className="text-zinc-700 dark:text-zinc-300" {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="text-zinc-800 italic dark:text-zinc-200" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong
      className="font-semibold text-zinc-900 dark:text-zinc-50"
      {...props}
    />
  ),
  a: ({ href, children, ...props }: AnchorProps) => {
    const className =
      'font-medium underline underline-offset-4 decoration-zinc-400/50 hover:decoration-zinc-400/90 dark:decoration-zinc-500/50 dark:hover:decoration-zinc-500/90 transition-all';
    if (href?.startsWith('/')) {
      return (
        <Link className={className} href={href} {...props}>
          {children}
        </Link>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a className={className} href={href} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a
        className={className}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const codeHTML = highlight(children as string);
    return (
      <code
        className="mx-auto my-6 block w-full overflow-x-auto rounded-md bg-muted/80 p-6 font-mono text-sm dark:bg-muted/25"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: 🙈
        dangerouslySetInnerHTML={{ __html: codeHTML }}
        {...props}
      />
    );
  },
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full">
        <thead>
          <tr className="border-zinc-200 border-b dark:border-zinc-700">
            {data.headers.map((header) => (
              <th
                className="px-4 py-3 text-left font-medium text-sm text-zinc-500 dark:text-zinc-400"
                key={`header-${header}`}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row) => (
            <tr
              className="border-zinc-100 border-b dark:border-zinc-800"
              key={`row-${row.join('-')}`}
            >
              {row.map((cell) => (
                <td
                  className="px-4 py-3 text-sm text-zinc-700 dark:text-zinc-300"
                  key={`cell-${cell}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
  blockquote: (props: BlockquoteProps) => (
    <blockquote
      className="mt-6 border-zinc-300 border-l-2 pl-6 text-zinc-800 italic dark:border-zinc-600 dark:text-zinc-200"
      {...props}
    />
  ),
  img: (props: ComponentPropsWithoutRef<'img'>) => (
    <img alt={props.alt} className="my-6 w-full rounded-md border" {...props} />
  ),
};

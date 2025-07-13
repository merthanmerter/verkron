import type { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import type React from 'react';
import { Link } from '@/i18n/navigation';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export default async function Layout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <Link className="-translate-x-1/2 absolute top-12 left-1/2" href="/">
        <h1 className="font-medium text-4xl text-muted-foreground/50 uppercase">
          VERKRON
        </h1>
      </Link>
      {children}
    </div>
  );
}

import Link from 'next/link';
import type React from 'react';
import { LOGO_PATH } from '@/lib/vk-logo-path';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex h-dvh flex-col items-center justify-center">
      <Link className="-translate-x-1/2 absolute top-12 left-1/2" href="/">
        <h1 className="font-medium text-4xl text-muted-foreground/50 uppercase">
          <svg
            aria-label="Verkron Logo"
            className="h-16 w-auto fill-foreground"
            role="img"
            viewBox="0 0 100 60"
          >
            <title>Verkron Logo</title>
            <path d={LOGO_PATH} />
          </svg>
        </h1>
      </Link>
      {children}
    </div>
  );
}

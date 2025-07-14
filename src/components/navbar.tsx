import Link from 'next/link';
import { LOGO_PATH } from '@/lib/vk-logo-path';
import { ThemeSwitcher } from './theme-switcher';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link className="flex items-center space-x-2" href="/">
            <span className="font-bold text-xl">
              <svg
                aria-label="Verkron Logo"
                className="h-8 w-auto fill-foreground"
                role="img"
                viewBox="0 0 100 60"
              >
                <title>Verkron Logo</title>
                <path d={LOGO_PATH} />
              </svg>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}

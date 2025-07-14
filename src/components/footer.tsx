'use client';

import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import LinkedinIcon from './linkedin-icon';

const footerLinks = [
  {
    title: 'Verkron',
    links: [
      { label: 'Projects', href: { pathname: '/projects' } },
      { label: 'Contact', href: { pathname: '/', query: { contact: true } } },
    ] as const,
  },
];

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/verkron/',
    icon: LinkedinIcon,
  },
];

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="container mx-auto max-w-5xl p-4">
        <div className="grid gap-8 md:grid-cols-3">
          {footerLinks.map((section) => (
            <div className="flex flex-col gap-3" key={section.title}>
              <h3 className="font-medium text-muted-foreground text-sm">
                {section.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      className="text-sm transition-colors hover:text-foreground"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
            <Link className="font-bold text-xl" href="/">
              Verkron
            </Link>
          </div>

          <div className="flex items-center gap-1">
            {socialLinks.map((social) => (
              <a
                aria-label={social.label}
                href={social.href}
                key={social.label}
                rel="noopener noreferrer"
                target="_blank"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { LOGO_PATH } from "@/lib/vk-logo-path";
import GithubIcon from "./github-icon";
import LinkedinIcon from "./linkedin-icon";

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/verkron/",
    icon: LinkedinIcon,
  },
  {
    label: "Github",
    href: "https://github.com/merthanmerter/verkron",
    icon: GithubIcon,
  },
];

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="container mx-auto max-w-6xl p-4">
        <Separator className="my-4" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-8">
            <Link
              className="flex items-center space-x-2 font-medium text-foreground text-sm"
              href="/"
            >
              <svg
                aria-label="Verkron Logo"
                className="h-4 w-auto fill-foreground"
                role="img"
                viewBox="0 0 100 60"
              >
                <path d={LOGO_PATH} />
              </svg>
              <span className="hidden sm:inline">Verkron</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                aria-label={social.label}
                href={social.href}
                key={social.label}
                rel="noopener noreferrer"
                target="_blank"
              >
                <social.icon className="size-5 fill-foreground" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

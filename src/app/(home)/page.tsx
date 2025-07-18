import Link from 'next/link';
import { Suspense } from 'react';
import ContactForm from '@/components/contact-form';
import Particles from '@/components/particles';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-8">
        <div className="max-w-md">
          <Particles />
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center justify-center gap-2 text-center">
            <Suspense
              fallback={
                <span
                  className={cn(
                    buttonVariants({
                      variant: 'ghost',
                      size: 'default',
                      className:
                        'cursor-pointer text-[#e9435d] hover:text-[#e9435d]/80',
                    })
                  )}
                >
                  Contact
                </span>
              }
            >
              <ContactForm />
            </Suspense>
            <span
              aria-hidden="true"
              className="mx-2 select-none text-[#e9435d]"
            >
              •
            </span>
            <Button
              asChild
              className="text-[#e9435d] hover:text-[#e9435d]/80"
              variant="ghost"
            >
              <Link href="/projects">Projects</Link>
            </Button>
          </div>

          <p className="max-w-[80ch] text-center text-muted-foreground text-sm">
            Verkron takes on complex projects that need multiple specialties
            working together. We help companies transform their ideas into
            successful businesses — from product development and digital tools
            to building the brand and market presence that drives sales.
          </p>
        </div>
      </div>
    </main>
  );
}

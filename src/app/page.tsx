import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { projectsService } from "@/app/definitions";
import ContactForm from "@/components/contact-form";
import { Skeleton } from "@/components/ui/skeleton";

export default function Page() {
  const projects = projectsService.getAllContent();

  return (
    <div className="container mx-auto max-w-6xl">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-10 md:py-20">
        <div className="container relative z-10 mx-auto flex flex-col items-center gap-4">
          <h1 className="mb-4 w-full bg-background px-3 py-2 font-bold text-3xl text-foreground uppercase md:text-6xl">
            Transforming industrial expertise into cutting-edge digital
            solutions.
          </h1>

          <Suspense fallback={<Skeleton className="h-10 w-36" />}>
            <ContactForm />
          </Suspense>
        </div>
      </section>

      {/* Case Studies Grid - Inspired by Vercel */}
      <h2 className="text-center font-medium text-lg uppercase md:text-left md:text-2xl">
        Our Projects & Case Studies
      </h2>
      <section className="grid grid-cols-1 gap-6 py-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            className="group flex flex-col rounded-lg border border-border/50 bg-background p-8 transition-colors hover:border-background hover:bg-[#f23e65] hover:text-foreground"
            href={{
              pathname: `/projects/${project.slug}`,
            }}
            key={project.slug}
            prefetch={false}
          >
            <div className="flex h-full flex-col justify-between gap-6">
              {/* Logo */}
              <div className="h-6">
                <img
                  alt={project.title}
                  className="h-6 w-auto object-contain object-left invert dark:invert-0"
                  height={50}
                  src={project.logo}
                  width={150}
                />
              </div>

              <p className="font-medium text-xl leading-snug tracking-tight md:text-2xl">
                "{project.description}"
              </p>
              {/* Quote/Content */}
              <div>
                {/* Read More Link */}
                <div className="flex items-center justify-between pt-6">
                  <span className="text-sm">Read the full story</span>
                  <div className="flex size-10 items-center justify-center rounded-full bg-foreground transition-colors group-hover:border-[#ebc703] group-hover:bg-[#ebc703]">
                    <ChevronRightIcon className="size-5 stroke-background group-hover:stroke-[#f23e65]" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}

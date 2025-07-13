import { ArrowLeftIcon, ChefHatIcon, CookingPotIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Page() {
  return (
    <div className="grid place-items-center">
      <h1 className="">
        <ChefHatIcon className="inline-block" />
        <CookingPotIcon className="inline-block" />
      </h1>
      <p className="mt-4 text-sm text-zinc-400">
        Case studies will be published here in the near future.
      </p>

      <div className="mt-4">
        <Link href="/">
          <Button size="sm" variant="ghost">
            <ArrowLeftIcon className="inline-block" />
            Home
          </Button>
        </Link>
      </div>
    </div>
  );
}

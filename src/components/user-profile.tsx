'use client';

import { useQueryClient } from '@tanstack/react-query';
import { createAuthClient } from 'better-auth/react';
import { UserRoundIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { signOut } from '@/lib/auth-client';
import { Card, CardContent, CardFooter } from './ui/card';

const { useSession } = createAuthClient();

export default function UserProfile() {
  const { data: session, isPending: isSessionPending, error } = useSession();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleSignOut = async () => {
    queryClient.resetQueries();
    await signOut({
      fetchOptions: {
        credentials: 'include',
        onResponse: () => {
          queryClient.resetQueries();
        },
        onSuccess: () => {
          toast.success('Signed out successfully');
          router.push('/login');
        },
      },
    });
  };

  return (
    <Card className="mx-auto my-12 min-w-xs max-w-md">
      <CardContent className="grid place-items-center gap-2">
        {/* {isSessionPending ? (
          <>
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-3.5 w-42" />
            <Skeleton className="h-3.5 w-36" />
          </>
        ) : error || !session ? (
          <p className="text-muted-foreground text-sm leading-none">
            {t('notLoggedIn')}
          </p>
        ) : (
          <>
            <UserRoundIcon className="h-24 w-24 rounded-full border-5 border-muted bg-muted text-foreground" />
            <p className="font-bold text-sm leading-none">
              {session?.user?.name}
            </p>
            <p className="text-muted-foreground text-sm leading-none">
              {session?.user?.email}
            </p>
          </>
        )} */}
        {(() => {
          switch (true) {
            case isSessionPending:
              return <Skeleton className="h-24 w-24 rounded-full" />;
            case error || !session:
              return (
                <p className="text-muted-foreground text-sm leading-none">
                  Not logged in
                </p>
              );
            default:
              return (
                <>
                  <UserRoundIcon className="h-24 w-24 rounded-full border-5 border-muted bg-muted text-foreground" />
                  <p className="font-bold text-sm leading-none">
                    {session?.user?.name}
                  </p>
                  <p className="text-muted-foreground text-sm leading-none">
                    {session?.user?.email}
                  </p>
                </>
              );
          }
        })()}
      </CardContent>

      <CardFooter className="mx-auto">
        {(() => {
          if (isSessionPending) {
            return <Skeleton className="h-9 w-28" />;
          }
          if (session) {
            return (
              <Button className="min-w-28" onClick={handleSignOut}>
                Sign out
              </Button>
            );
          }
          return (
            <Button asChild className="min-w-28">
              <Link href="/login">Sign in</Link>
            </Button>
          );
        })()}
      </CardFooter>
    </Card>
  );
}

'use client';

import {
  LogIn,
  LogOut,
  MonitorIcon,
  MoonIcon,
  SunIcon,
  UserRoundIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useTransition } from 'react';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut, useSession } from '@/lib/auth-client';
import { Button } from './ui/button';

export function NavUser() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [isPending] = useTransition();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="size-8 rounded-full"
          disabled={isPending}
          variant="ghost"
        >
          <UserRoundIcon className="size-8 rounded-full border-5 border-muted bg-muted p-0.5 text-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        sideOffset={4}
      >
        {session && (
          <>
            <DropdownMenuItem asChild className="p-0 font-normal">
              <Link href="/account">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <UserRoundIcon className="size-8 rounded-full border-5 border-muted bg-muted p-0.5 text-foreground" />

                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {session?.user.name}
                    </span>
                    <span className="truncate text-xs">
                      {session?.user.email}
                    </span>
                  </div>
                </div>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger className="gap-2">
              {(() => {
                switch (theme) {
                  case 'dark':
                    return (
                      <MoonIcon className="size-4 text-muted-foreground" />
                    );
                  case 'light':
                    return <SunIcon className="size-4 text-muted-foreground" />;
                  default:
                    return (
                      <MonitorIcon className="size-4 text-muted-foreground" />
                    );
                }
              })()}
              Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuCheckboxItem
                  checked={theme === 'light'}
                  onCheckedChange={() => setTheme('light')}
                >
                  Light
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={theme === 'dark'}
                  onCheckedChange={() =>
                    setTheme(theme === 'dark' ? 'light' : 'dark')
                  }
                >
                  Dark
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={theme === 'system'}
                  onCheckedChange={() => setTheme('system')}
                >
                  System
                </DropdownMenuCheckboxItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        {session ? (
          <DropdownMenuItem
            onClick={async () => {
              try {
                await signOut({
                  fetchOptions: {
                    credentials: 'include',
                  },
                });
                router.refresh();
              } catch {
                toast.error('Failed to sign out');
              }
            }}
          >
            <LogOut />
            Sign out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild>
            <Link href="/login">
              <LogIn />
              Sign in
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

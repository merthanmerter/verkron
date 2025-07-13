'use client';

import { useQueryClient } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import NextLink from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link, useRouter } from '@/i18n/navigation';
import { signIn } from '@/lib/auth-client';

export default function SignIn() {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  return (
    <Card className="mx-auto w-full max-w-md border-none bg-transparent shadow-none">
      <CardHeader className="text-center">
        <CardDescription className="text-xs md:text-sm">
          Sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="grid gap-4"
          onSubmit={async (e) => {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;

            await signIn.email(
              {
                email,
                password,
              },
              {
                onRequest: () => {
                  setLoading(true);
                },
                onResponse: () => {
                  setLoading(false);
                },
                onSuccess: () => {
                  queryClient.clear();
                  toast.success('Logged in successfully');
                  router.push('/');
                },
                onError: () => {
                  toast.error('Invalid email or password');
                },
              }
            );
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              onChange={(e) => {
                setEmailInput(e.target.value);
              }}
              required
              type="email"
              value={emailInput}
            />
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <NextLink
                className="ml-auto inline-block text-sm underline"
                href="/forgot-password"
              >
                Forgot password?
              </NextLink>
            </div>

            <Input
              autoComplete="password"
              id="password"
              name="password"
              onChange={(e) => setPasswordInput(e.target.value)}
              type="password"
              value={passwordInput}
            />
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              onClick={() => {
                setRememberMe(!rememberMe);
              }}
            />
            <Label htmlFor="remember">Remember me</Label>
          </div>

          <Button
            className="w-full bg-blue-500 text-white hover:bg-blue-600"
            disabled={loading}
            type="submit"
            variant="default"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              'Log in'
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link">
          <Link href="/register">Don't have an account?</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

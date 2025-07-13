'use client';

import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from '@/i18n/navigation';
import { signUp } from '@/lib/auth-client';

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignUp = useMutation({
    mutationFn: async () => {
      await signUp.email({
        email,
        password,
        name: `${firstName} ${lastName}`,
        // image: imageUrl ?? undefined,
        callbackURL: '/',
        fetchOptions: {
          onResponse: () => {
            setLoading(false);
          },
          onRequest: () => {
            setLoading(true);
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: () => {
            router.push('/');
          },
        },
      });
    },
  });

  return (
    <Card className="mx-auto w-full max-w-md border-none bg-transparent shadow-none">
      <CardHeader className="text-center">
        <CardDescription className="text-xs md:text-sm">
          Create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input
                id="first-name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                required
                value={firstName}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input
                id="last-name"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                required
                value={lastName}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              type="email"
              value={email}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              autoComplete="new-password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Confirm password</Label>
            <Input
              autoComplete="new-password"
              id="password_confirmation"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              type="password"
              value={passwordConfirmation}
            />
          </div>

          <Button
            className="w-full bg-blue-500 text-white hover:bg-blue-600"
            disabled={loading}
            onClick={() => {
              handleSignUp.mutate();
            }}
            type="submit"
            variant="default"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              'Create account'
            )}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link">
          <Link href="/login">Already have an account?</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

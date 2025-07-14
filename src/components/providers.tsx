'use client';

import { ProgressProvider } from '@bprogress/next/app';
import { QueryClientProvider } from '@tanstack/react-query';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import { getQueryClient } from '@/lib/query-client';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <NuqsAdapter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <ProgressProvider
            color="var(--primary)"
            disableSameURL
            height="2px"
            nonce="1234567890"
            options={{ showSpinner: false }}
            shallowRouting
          />
          {children}
          <Toaster />
          <SpeedInsights />
        </ThemeProvider>
      </QueryClientProvider>
    </NuqsAdapter>
  );
};

export default Providers;

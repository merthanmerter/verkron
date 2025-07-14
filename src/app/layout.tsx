import { Geist, Geist_Mono } from 'next/font/google';
import Providers from '@/components/providers';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

type Props = {
  children: React.ReactNode;
};

export function generateMetadata() {
  return {
    title: 'Verkron',
    description:
      'Verkron provides expert solutions in pricing strategies, operations, inventory management, technical drafting, corporate branding, supply chain optimization, and industrial product design. Our goal is to enhance efficiency, drive innovation, and support businesses in achieving operational excellence.',
  };
}
export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="/favicon-96x96.png"
          rel="icon"
          sizes="96x96"
          type="image/png"
        />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
        <link href="/favicon.ico" rel="shortcut icon" />
        <link
          href="/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link href="/site.webmanifest" rel="manifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-dvh flex-col antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

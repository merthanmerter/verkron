import { Geist, Geist_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { hasLocale, type Locale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Providers from '@/components/providers';
import { routing } from '@/i18n/routing';
import '../globals.css';

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
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Omit<Props, 'children'>) {
  const { locale } = await props.params;

  const t = await getTranslations({ locale, namespace: 'Layout' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}
export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
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
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

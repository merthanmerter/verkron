import type { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
};

export default async function Layout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <main className="grid h-dvh place-items-center p-4">{children}</main>;
}

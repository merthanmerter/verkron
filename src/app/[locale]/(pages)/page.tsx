import type { Locale } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import Particles from '@/components/particles';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  // const t = await getTranslations('HomePage');

  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  return <Particles />;
}

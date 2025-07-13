import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en'],
  defaultLocale: 'en',
  localeDetection: true,
  pathnames: {
    '/': '/',
    '/login': {
      en: '/login',
    },
    '/register': {
      en: '/register',
    },
    '/docs': {
      en: '/docs',
    },
    '/account': {
      en: '/account',
    },
  },
});

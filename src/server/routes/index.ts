import { createMiddleware } from 'hono/factory';
import { hono } from '@/lib/hono';
import { resend } from '@/lib/resend';
import { contactRouter } from './contact';

declare module 'hono' {
  interface ContextVariableMap {
    resend: typeof resend;
  }
}

const app = hono().basePath('/api');

const ctx = createMiddleware(async (c, next) => {
  c.set('resend', resend);
  await next();
});

export const appRouter = app.use(ctx).route('/contact', contactRouter);

export type AppRouter = typeof appRouter;
export default app;

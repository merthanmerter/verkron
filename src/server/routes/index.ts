import { createMiddleware } from 'hono/factory';
import { hono } from '@/lib/hono';
import { resend } from '@/lib/resend';
import { db } from '@/server/db';
import sessionMiddleware from '../middlewares/session';
import { authController } from './auth';
import { contactRouter } from './contact';

declare module 'hono' {
  interface ContextVariableMap {
    db: typeof db;
    resend: typeof resend;
  }
}

const app = hono().basePath('/api');

const ctx = createMiddleware(async (c, next) => {
  c.set('db', db);
  c.set('resend', resend);
  await next();
});

const publicRoutes = hono()
  .route('/auth', authController)
  .route('/contact', contactRouter);

const privateRoutes = hono().use(sessionMiddleware);
// .route('/hello', helloRouter);

export const appRouter = app
  .use(ctx)
  .route('/', publicRoutes)
  .route('/', privateRoutes);

export type AppRouter = typeof appRouter;
export default app;

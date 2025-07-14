import { Hono } from 'hono';

export function honoRouter() {
  return new Hono({
    strict: false,
  });
}

export function hono() {
  return honoRouter();
}

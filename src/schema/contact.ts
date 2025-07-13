import z from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  company: z.string().min(1),
  message: z.string().min(1),
});

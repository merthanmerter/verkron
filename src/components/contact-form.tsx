'use client';

import { useMutation } from '@tanstack/react-query';
import { parseAsBoolean, useQueryState } from 'nuqs';
import { useRef } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { rpc } from '@/lib/rpc';
import { contactSchema } from '@/schema/contact';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

function ContactForm() {
  const ref = useRef<HTMLFormElement>(null);

  // const [open, setOpen] = useReducer((_open, action: boolean) => action, false);
  const [open, setOpen] = useQueryState(
    'contact',
    parseAsBoolean.withDefault(false)
  );

  const contact = useMutation({
    mutationFn: async (formData: FormData) => {
      const data = Object.fromEntries(formData);
      const parsed = contactSchema.parse(data);

      const res = await rpc.api.contact.$post({
        json: parsed,
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message || 'Failed to send message');
      }

      return json;
    },
    onSuccess: (res) => {
      toast.success(res.message);
      // Reset form after successful submission
      const form = ref.current;
      form?.reset();
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer text-[#FF6B6B] hover:text-[#FF6B6B]/80"
          variant="ghost"
        >
          Contact
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Us</DialogTitle>
          <DialogDescription>
            We'd love to hear from you! Please fill out the form below and we'll
            get back to you as soon as possible.
          </DialogDescription>
        </DialogHeader>

        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            contact.mutate(formData);
          }}
          ref={ref}
        >
          <div className="flex flex-col gap-1">
            <Label className="mb-1 block font-medium text-sm" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder={'Your Name'}
              required
              type="text"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="mb-1 block font-medium text-sm" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              placeholder={'Your Email'}
              required
              type="email"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="mb-1 block font-medium text-sm" htmlFor="company">
              Company
            </Label>
            <Input
              id="company"
              name="company"
              placeholder={'Your Company'}
              required
              type="text"
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label className="mb-1 block font-medium text-sm" htmlFor="message">
              Message
            </Label>
            <Textarea
              className="h-32 resize-none"
              id="message"
              name="message"
              placeholder={'Tell us about your project or requirements...'}
              required
              rows={6}
            />
          </div>
          <Button className="w-full" disabled={contact.isPending} type="submit">
            {contact.isPending ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ContactForm;

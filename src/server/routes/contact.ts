import { zValidator } from '@hono/zod-validator';
import { honoRouter } from '@/lib/hono';
import { contactSchema } from '@/schema/contact';

export const contactRouter = honoRouter().post(
  '/',
  zValidator('json', contactSchema),
  async (c) => {
    try {
      const { email, name, company, message } = c.req.valid('json');

      // Send both emails in parallel - if either fails, both operations fail
      await Promise.all([
        c.get('resend').emails.send({
          from: 'noreply@verkron.com',
          to: ['merthanm@gmail.com'],
          subject: `New Contact Form Submission from ${name}`,
          html: adminTemplate(name, email, company, message),
        }),
        c.get('resend').emails.send({
          from: 'noreply@verkron.com',
          to: [email],
          subject: `Thank you for contacting Verkron, ${name}!`,
          html: customerTemplate(name),
        }),
      ]);

      return c.json({
        success: true,
        message: 'Thank you for your message! We will get back to you soon.',
      });
    } catch {
      return c.json(
        {
          success: false,
          message: 'Failed to send message. Please try again later.',
        },
        500
      );
    }
  }
);

const adminTemplate = (
  name: string,
  email: string,
  company: string,
  message: string
) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>New Contact Form Submission</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      * { box-sizing: border-box; }
      body { 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
        background-color: #ffffff; 
        margin: 0; 
        padding: 40px 20px; 
        line-height: 1.6;
        color: #000000;
      }
      .container { 
        max-width: 560px; 
        margin: 0 auto; 
        border: 1px solid #e5e5e5;
        border-radius: 8px;
      }
      .header {
        padding: 24px;
        border-bottom: 1px solid #e5e5e5;
      }
      .heading { 
        font-size: 18px; 
        margin: 0; 
        font-weight: 600;
      }
      .content {
        padding: 24px;
      }
      .field { 
        margin-bottom: 16px; 
      }
      .field:last-of-type {
        margin-bottom: 0;
      }
      .field-label { 
        font-weight: 500; 
        font-size: 14px; 
        margin-bottom: 4px; 
      }
      .field-value { 
        font-size: 14px; 
        padding: 8px 12px; 
        border: 1px solid #e5e5e5;
        border-radius: 4px; 
        background-color: #fafafa;
      }
      .message-field .field-value {
        white-space: pre-wrap;
        min-height: 60px;
      }
      .footer { 
        padding: 16px 24px; 
        border-top: 1px solid #e5e5e5;
        font-size: 12px;
        color: #666666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1 class="heading">New Contact Submission</h1>
      </div>
      
      <div class="content">
        <div class="field">
          <div class="field-label">Name</div>
          <div class="field-value">${name}</div>
        </div>
        
        <div class="field">
          <div class="field-label">Email</div>
          <div class="field-value">${email}</div>
        </div>
        
        <div class="field">
          <div class="field-label">Company</div>
          <div class="field-value">${company}</div>
        </div>
        
        <div class="field message-field">
          <div class="field-label">Message</div>
          <div class="field-value">${message}</div>
        </div>
      </div>
      
      <div class="footer">
        Received: ${new Date().toLocaleString()} via verkron.com
      </div>
    </div>
  </body>
</html>`;

const customerTemplate = (name: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Thank you for contacting Verkron</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      * { box-sizing: border-box; }
      body { 
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
        background-color: #ffffff; 
        margin: 0; 
        padding: 40px 20px; 
        line-height: 1.6;
        color: #000000;
      }
      .container { 
        max-width: 560px; 
        margin: 0 auto; 
        border: 1px solid #e5e5e5;
        border-radius: 8px;
      }
      .header {
        padding: 32px 24px;
        text-align: center;
        border-bottom: 1px solid #e5e5e5;
      }
      .heading { 
        font-size: 24px; 
        margin: 0; 
        font-weight: 600;
      }
      .content {
        padding: 32px 24px;
        text-align: center;
      }
      .message {
        font-size: 16px;
        margin-bottom: 24px;
      }
      .details {
        font-size: 14px;
        color: #666666;
        margin-bottom: 32px;
      }
      .next-steps {
        text-align: left;
        background-color: #fafafa;
        padding: 20px;
        border-radius: 6px;
        border: 1px solid #e5e5e5;
      }
      .next-steps h3 {
        margin: 0 0 12px 0;
        font-size: 16px;
        font-weight: 600;
      }
      .next-steps ul {
        margin: 0;
        padding-left: 20px;
      }
      .next-steps li {
        margin-bottom: 8px;
      }
      .footer { 
        padding: 24px; 
        border-top: 1px solid #e5e5e5;
        text-align: center;
        font-size: 12px;
        color: #666666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1 class="heading">Thank You, ${name}!</h1>
      </div>
      
      <div class="content">
        <div class="message">
          We've received your message and appreciate you reaching out to Verkron.
        </div>
        
        <div class="details">
          Your inquiry is important to us, and we'll review it carefully to provide you with the most helpful response.
        </div>
        
        <div class="next-steps">
          <h3>What happens next?</h3>
          <ul>
            <li>Our team will review your message within 24 hours</li>
            <li>We'll respond with detailed information about your inquiry</li>
            <li>If needed, we'll schedule a follow-up call to discuss your requirements</li>
          </ul>
        </div>
      </div>
      
      <div class="footer">
          Verkron Team<br>
        verkron.com
      </div>
    </div>
  </body>
</html>`;

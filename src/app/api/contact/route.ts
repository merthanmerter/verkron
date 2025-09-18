import { type NextRequest, NextResponse } from "next/server";
import { AdminContactEmail } from "@/emails/admin-contact";
import { CustomerContactEmail } from "@/emails/customer-contact";
import { resend } from "@/lib/resend";
import { contactSchema } from "@/schema/contact";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, company, message } = contactSchema.parse(body);

    // Send both emails in parallel - if either fails, both operations fail
    await Promise.all([
      resend.emails.send({
        from: "noreply@verkron.com",
        to: ["merthanm@gmail.com"],
        subject: `New Contact Form Submission from ${name}`,
        react: AdminContactEmail({ name, email, company, message }),
      }),
      resend.emails.send({
        from: "noreply@verkron.com",
        to: [email],
        subject: `Thank you for contacting Verkron, ${name}!`,
        react: CustomerContactEmail({ name }),
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: "Thank you for your message! We will get back to you soon.",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message. Please try again later.",
      },
      { status: 500 }
    );
  }
}

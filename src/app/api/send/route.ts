import { Resend } from 'resend';
import { NextResponse } from 'next/server';

// Initialize the Resend tool with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, watchName, method } = await req.json();

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['arcelndala1@gmail.com'],
      subject: `New Private Inquiry: ${watchName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; border: 1px solid #eee;">
          <h2 style="color: #D4AF37; text-transform: uppercase; letter-spacing: 2px;">Luxury Watch Inquiry</h2>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <p style="margin: 15px 0;"><strong>Customer Name:</strong> ${name}</p>
          <p style="margin: 15px 0;"><strong>Customer Email:</strong> ${email}</p>
          <p style="margin: 15px 0;"><strong>Watch Interest:</strong> ${watchName}</p>
          <p style="margin: 15px 0;"><strong>Preferred Contact Via:</strong> ${method}</p>
          <hr style="border: 0; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #888; font-style: italic;">
            Inquiry received on ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json(
      { error: (error as Error).message }, 
      { status: 500 }
    );
  }
}
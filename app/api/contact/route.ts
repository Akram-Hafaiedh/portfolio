import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(request: Request) {

    try {
        const { name, email, message, subject } = await request.json();

        if (!name || !email || !message || !subject) {
            return new Response(JSON.stringify({ error: 'All fields are required.' }), { status: 400 });
        }

        const { data, error } = await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>',
            to: 'hafaiedhakram@gmail.com',
            subject: `Contact Form: ${subject}`,
            // You can use simple HTML or React components
            html: `<p>You have a new message from your portfolio:</p><p><strong>Name:</strong> ${name}</p><p><strong>Sender's Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
        });

        if (error) {
            return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
        }
        return new Response(JSON.stringify({ success: true, message: 'Email sent successfully!', data }), { status: 200 });
    } catch (error) {

        return new Response(JSON.stringify({ success: false, message: 'Internal Server Error' }), { status: 500 });
    }
}
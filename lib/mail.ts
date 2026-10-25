import nodemailer from "nodemailer";

type Mail = { to: string; subject: string; text: string };

export async function sendMail({ to, subject, text }: Mail) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_FROM } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.log("\n--- EMAIL (SMTP not set up, printing instead) ---");
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}\n`);
    console.log(text);
    console.log("-------------------------------------------------\n");
    return;
  }

  try {
    const port = Number(SMTP_PORT ?? 587);
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transporter.sendMail({
      from: MAIL_FROM ?? SMTP_USER,
      to,
      subject,
      text,
    });
  } catch (error) {
    console.error("Email failed to send:", error);
  }
}
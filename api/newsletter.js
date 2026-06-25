import nodemailer from 'nodemailer';

const newsletterRecipient = process.env.NEWSLETTER_RECIPIENT || process.env.CONTACT_RECIPIENT || 'info@nacetem.gov.ng';
const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpSecure = process.env.SMTP_SECURE === 'true';
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

const mailTransporter = smtpHost && smtpUser && smtpPass
  ? nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })
  : null;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { email, source, fullName, organization } = req.body || {};
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }

  if (!mailTransporter) {
    return res.status(503).json({ error: 'Newsletter delivery is not configured.' });
  }

  try {
    await mailTransporter.sendMail({
      from: smtpUser,
      to: newsletterRecipient,
      subject: 'NACETEM Newsletter Subscription',
      text: `Name: ${fullName || 'Not provided'}\nEmail: ${normalizedEmail}\nOrganization: ${organization || 'Not provided'}\nSource: ${source || 'website'}\nSubscribed At: ${new Date().toISOString()}`,
    });

    return res.json({ success: true });
  } catch (error) {
    console.error('Newsletter SMTP send error:', error);
    return res.status(500).json({ error: 'Failed to record subscription via SMTP.' });
  }
}

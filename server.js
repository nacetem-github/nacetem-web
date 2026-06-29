import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = process.env.PORT || 4173;
const contactRecipient = process.env.CONTACT_RECIPIENT || 'info@nacetem.gov.ng';
const newsletterRecipient = process.env.NEWSLETTER_RECIPIENT || contactRecipient;

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

app.use(express.json());

app.post('/api/contact', async (req, res) => {
  const { name, email, phone, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Name, email, subject, and message are required.' });
  }

  const mailSubject = `NACETEM Contact Form: ${subject}`;
  const mailText = `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'N/A'}\n\nMessage:\n${message}`;

  if (mailTransporter) {
    try {
      await mailTransporter.sendMail({
        from: smtpUser,
        to: contactRecipient,
        subject: mailSubject,
        text: mailText,
      });

      return res.json({ success: true });
    } catch (error) {
      console.error('SMTP send error:', error);
      return res.status(500).json({ error: 'Failed to send via SMTP. Please check server configuration.' });
    }
  }

  const logDir = join(__dirname, 'server-logs');
  const logFile = join(logDir, 'contact-fallback.log');
  const logEntry = `${new Date().toISOString()}\n${mailSubject}\n${mailText}\n---\n`;

  try {
    await fs.mkdir(logDir, { recursive: true });
    await fs.appendFile(logFile, logEntry, 'utf8');
    return res.json({
      success: true,
      warning: 'SMTP is not configured. The submission was stored locally in server-logs/contact-fallback.log.',
    });
  } catch (error) {
    console.error('Fallback log write error:', error);
    return res.status(500).json({ error: 'Failed to store the message on the server.' });
  }
});

app.post('/api/newsletter', async (req, res) => {
    const { email, source, fullName, organization } = req.body || {};
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return res.status(400).json({ error: 'A valid email address is required.' });
  }

  const mailSubject = 'NACETEM Newsletter Subscription';
    const mailText = `Name: ${fullName || 'Not provided'}\nEmail: ${normalizedEmail}\nOrganization: ${organization || 'Not provided'}\nSource: ${source || 'website'}\nSubscribed At: ${new Date().toISOString()}`;

  if (mailTransporter) {
    try {
      await mailTransporter.sendMail({
        from: smtpUser,
        to: newsletterRecipient,
        subject: mailSubject,
        text: mailText,
      });

      return res.json({ success: true });
    } catch (error) {
      console.error('Newsletter SMTP send error:', error);
      return res.status(500).json({ error: 'Failed to record subscription via SMTP. Please check server configuration.' });
    }
  }

  const logDir = join(__dirname, 'server-logs');
  const logFile = join(logDir, 'newsletter-subscriptions.log');
  const logEntry = `${new Date().toISOString()}\n${mailSubject}\n${mailText}\n---\n`;

  try {
    await fs.mkdir(logDir, { recursive: true });
    await fs.appendFile(logFile, logEntry, 'utf8');
    return res.json({
      success: true,
      warning: 'SMTP is not configured. The subscription was stored locally in server-logs/newsletter-subscriptions.log.',
    });
  } catch (error) {
    console.error('Newsletter fallback log write error:', error);
    return res.status(500).json({ error: 'Failed to store the subscription on the server.' });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Contact fallback server running on http://localhost:${port}`);
  if (!mailTransporter) {
    console.log('SMTP is not configured. Contact submissions will be stored locally in server-logs/contact-fallback.log.');
  }
});

import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);
export const FROM = process.env.EMAIL_FROM ?? 'TEDx IMT Paris <noreply@tedximtparis.com>';
export const ADMIN_EMAIL = process.env.EMAIL_ADMIN ?? 'csfeir@gmail.com';
export const SITE = 'https://tedximtparis.com';

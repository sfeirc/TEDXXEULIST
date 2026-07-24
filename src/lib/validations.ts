import { z } from 'zod';

export const contactSchema = z.object({
  name:     z.string().min(2, 'Name must be at least 2 characters').max(100),
  email:    z.string().email('Invalid email address'),
  subject:  z.string().min(3, 'Subject must be at least 3 characters').max(200),
  message:  z.string().min(10, 'Message must be at least 10 characters').max(5000),
  interest: z.string().max(50).optional(),
});

export const registrationSchema = z.object({
  name:        z.string().min(2, 'Name must be at least 2 characters').max(100),
  email:       z.string().email('Invalid email address'),
  institution: z.string().max(200).optional(),
  role:        z.string().max(200).optional(),
  motivation:  z.string().max(1000).optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const urlOrEmpty = z.string().refine(
  v => v === '' || /^https?:\/\/.+/.test(v),
  { message: 'Must be a valid URL or empty' }
).optional();

export const speakerSchema = z.object({
  name:          z.string().min(2).max(100),
  title:         z.string().min(2).max(200),
  bio:           z.string().max(2000).optional(),
  image_url:     urlOrEmpty,
  theme:         z.string().max(100).optional(),
  display_order: z.number().int().min(0).default(0),
  is_published:  z.boolean().default(false),
});

export const partnerSchema = z.object({
  name:          z.string().min(2).max(100),
  logo_url:      urlOrEmpty,
  website_url:   urlOrEmpty,
  tier:          z.enum(['gold', 'silver', 'bronze', 'institutional']),
  display_order: z.number().int().min(0).default(0),
  is_published:  z.boolean().default(true),
});

export const teamMemberSchema = z.object({
  name:          z.string().min(2).max(100),
  role:          z.string().min(2).max(200),
  school:        z.string().max(100).optional(),
  pole:          z.string().max(100).optional(),
  image_url:     urlOrEmpty,
  linkedin_url:  urlOrEmpty,
  display_order: z.number().int().min(0).default(0),
  is_published:  z.boolean().default(true),
});

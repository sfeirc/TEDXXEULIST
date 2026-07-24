export type Speaker = {
  id: string;
  name: string;
  title: string;
  bio: string | null;
  image_url: string | null;
  theme: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type Partner = {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  tier: 'gold' | 'silver' | 'bronze' | 'institutional';
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  school: string | null;
  pole: string | null;
  image_url: string | null;
  linkedin_url: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  interest: string | null;
  status: 'new' | 'read' | 'replied';
  ip_address: string | null;
  created_at: string;
};

export type Registration = {
  id: string;
  name: string;
  email: string;
  institution: string | null;
  role: string | null;
  motivation: string | null;
  status: 'pending' | 'confirmed' | 'waitlisted' | 'cancelled';
  ip_address: string | null;
  created_at: string;
};

export type NewsletterSubscriber = {
  id: string;
  email: string;
  confirmed: boolean;
  ip_address: string | null;
  created_at: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type ProgrammeSession = {
  id: string;
  time: string;
  title: string;
  type: 'doors' | 'opening' | 'session' | 'break' | 'lunch' | 'closing' | 'cocktail' | 'forum';
  section: string | null;
  description: string | null;
  speaker_count: number;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type SiteSetting = {
  key: string;
  value: string | null;
  label: string | null;
  description: string | null;
  type: string | null;
  updated_at: string;
};

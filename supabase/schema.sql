-- TEDx IMT Paris — Supabase schema
-- Run this in Supabase > SQL Editor

-- Enable pgcrypto for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ─── Speakers ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS speakers (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT        NOT NULL,
  title         TEXT        NOT NULL,
  bio           TEXT,
  image_url     TEXT,
  theme         TEXT,
  display_order INTEGER     DEFAULT 0,
  is_published  BOOLEAN     DEFAULT false,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Partners ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS partners (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT        NOT NULL,
  logo_url      TEXT,
  website_url   TEXT,
  tier          TEXT        DEFAULT 'bronze' CHECK (tier IN ('gold', 'silver', 'bronze', 'institutional')),
  display_order INTEGER     DEFAULT 0,
  is_published  BOOLEAN     DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Team members ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS team_members (
  id            UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name          TEXT        NOT NULL,
  role          TEXT        NOT NULL,
  image_url     TEXT,
  linkedin_url  TEXT,
  display_order INTEGER     DEFAULT 0,
  is_published  BOOLEAN     DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Contact submissions ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_submissions (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name       TEXT        NOT NULL,
  email      TEXT        NOT NULL,
  subject    TEXT        NOT NULL,
  message    TEXT        NOT NULL,
  interest   TEXT,
  status     TEXT        DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Registrations ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS registrations (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT        NOT NULL,
  email       TEXT        NOT NULL,
  institution TEXT,
  role        TEXT,
  motivation  TEXT,
  status      TEXT        DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'waitlisted', 'cancelled')),
  ip_address  INET,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Newsletter subscribers ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id         UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  email      TEXT        UNIQUE NOT NULL,
  confirmed  BOOLEAN     DEFAULT false,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Auto-update updated_at ───────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER speakers_updated_at  BEFORE UPDATE ON speakers  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER partners_updated_at  BEFORE UPDATE ON partners  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER team_updated_at      BEFORE UPDATE ON team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── Row Level Security ───────────────────────────────────────────────────────
ALTER TABLE speakers             ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners             ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members         ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions  ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations        ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Public can read published speakers/partners/team
CREATE POLICY "public_read_speakers"  ON speakers       FOR SELECT USING (is_published = true);
CREATE POLICY "public_read_partners"  ON partners       FOR SELECT USING (is_published = true);
CREATE POLICY "public_read_team"      ON team_members   FOR SELECT USING (is_published = true);

-- Anyone can insert into public-facing tables (forms)
CREATE POLICY "public_insert_contact" ON contact_submissions  FOR INSERT WITH CHECK (true);
CREATE POLICY "public_insert_reg"     ON registrations        FOR INSERT WITH CHECK (true);
CREATE POLICY "public_insert_newsletter" ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- Authenticated users (admins) can do everything
CREATE POLICY "admin_all_speakers"   ON speakers             FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_partners"   ON partners             FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_team"       ON team_members         FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_contact"    ON contact_submissions  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_reg"        ON registrations        FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "admin_all_newsletter" ON newsletter_subscribers FOR ALL USING (auth.role() = 'authenticated');

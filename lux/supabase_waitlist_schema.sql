-- HIPJOY LUX Seeds Waitlist — Supabase Schema
-- Run this in your Supabase project: Dashboard > SQL Editor > New query > Paste > Run
--
-- After running, go to Settings > API to get your project URL and anon key.
-- Paste them into waitlist.html where SUPABASE_URL and SUPABASE_KEY are set.

-- Enable UUID generation (already enabled in most Supabase projects)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id                   UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  email                TEXT        NOT NULL UNIQUE,
  phone                TEXT,
  role                 TEXT,

  -- Survey answers (null until survey is completed or question is answered)
  q1_broken_system     TEXT,        -- NEURO: most broken system in daily life
  q2_recovery          TEXT,        -- WELLSPRING: how they recover from hard days
  q3_devices           TEXT,        -- SONARIS: how many devices they work from
  q4_productivity_wrong TEXT,       -- REBEL: what productivity tools get wrong
  q5_future_self       TEXT,        -- VOX: message to their future self

  survey_completed     BOOLEAN     DEFAULT false,
  created_at           TIMESTAMPTZ DEFAULT now()
);

-- Index for fast email lookups
CREATE INDEX IF NOT EXISTS waitlist_email_idx ON waitlist (email);
CREATE INDEX IF NOT EXISTS waitlist_created_idx ON waitlist (created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Policy: anyone can INSERT a new row (sign up)
CREATE POLICY "allow_public_insert" ON waitlist
  FOR INSERT TO anon
  WITH CHECK (true);

-- Policy: users can UPDATE their own row by ID (survey answers)
-- The app stores the row ID in memory after insert and uses it to update.
CREATE POLICY "allow_update_by_id" ON waitlist
  FOR UPDATE TO anon
  USING (true)
  WITH CHECK (true);

-- Policy: allow SELECT for counting (social proof seed count on final step)
CREATE POLICY "allow_count_select" ON waitlist
  FOR SELECT TO anon
  USING (true);

-- Seed count view (optional — cleaner for front-end queries)
CREATE OR REPLACE VIEW waitlist_count AS
  SELECT COUNT(*) AS total FROM waitlist;

GRANT SELECT ON waitlist_count TO anon;

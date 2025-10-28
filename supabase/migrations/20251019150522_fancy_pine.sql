/*
  # Create admin OTP table

  1. New Tables
    - `admin_otp`
      - `id` (uuid, primary key)
      - `password` (text, the one-time password)
      - `expires_at` (timestamp, when the password expires)
      - `used` (boolean, whether the password has been used)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `admin_otp` table
    - Add policy for service role access only
*/

CREATE TABLE IF NOT EXISTS admin_otp (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  password text NOT NULL,
  expires_at timestamptz NOT NULL,
  used boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_otp ENABLE ROW LEVEL SECURITY;

-- Only service role can access this table
CREATE POLICY "Service role can manage OTP"
  ON admin_otp
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
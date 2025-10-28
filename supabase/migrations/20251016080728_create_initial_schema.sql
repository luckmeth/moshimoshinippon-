/*
  # Initial Schema for Moshi Moshi Nippon Visa Consultation

  1. New Tables
    - `admin_users`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `created_at` (timestamptz)
      
    - `inquiries`
      - `id` (uuid, primary key)
      - `name` (text) - Customer name
      - `email` (text) - Contact email
      - `phone` (text) - Contact phone
      - `visa_type` (text) - Type of visa (student/business)
      - `message` (text) - Additional details
      - `status` (text) - Status (pending/contacted/completed)
      - `created_at` (timestamptz) - Submission timestamp
      
    - `services`
      - `id` (uuid, primary key)
      - `title` (text) - Service title
      - `description` (text) - Service description
      - `icon` (text) - Icon identifier
      - `order_index` (integer) - Display order
      - `created_at` (timestamptz)
      
    - `gallery_images`
      - `id` (uuid, primary key)
      - `image_url` (text) - Image URL
      - `caption` (text) - Image caption
      - `category` (text) - Image category
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public can insert inquiries
    - Public can read services and gallery images
    - Only authenticated admins can manage all data
*/

-- Create admin_users table first
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view admin users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users au
      WHERE au.id = auth.uid()
    )
  );

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  visa_type text NOT NULL,
  message text DEFAULT '',
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit inquiries"
  ON inquiries FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Admins can view all inquiries"
  ON inquiries FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can update inquiries"
  ON inquiries FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete inquiries"
  ON inquiries FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  icon text DEFAULT '',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view services"
  ON services FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can insert services"
  ON services FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can update services"
  ON services FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete services"
  ON services FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  caption text DEFAULT '',
  category text DEFAULT 'general',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view gallery images"
  ON gallery_images FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can insert gallery images"
  ON gallery_images FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can update gallery images"
  ON gallery_images FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

CREATE POLICY "Admins can delete gallery images"
  ON gallery_images FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
    )
  );

-- Insert default services
INSERT INTO services (title, description, icon, order_index) VALUES
  ('Business Visa', 'Complete assistance with business visa applications for entrepreneurs and companies looking to expand to Japan', 'briefcase', 1),
  ('Student Visa', 'Support for students planning to study in Japan, from language schools to universities', 'graduation-cap', 2),
  ('Intra-Company Transfer', 'Facilitate smooth transfers for employees moving to Japanese branches', 'building', 3),
  ('Dependent Visa', 'Help family members join their loved ones in Japan', 'users', 4),
  ('Visa Consultation', 'Expert advice on visa types, requirements, and application processes', 'message-circle', 5),
  ('Document Preparation', 'Professional assistance with preparing and translating required documents', 'file-text', 6)
ON CONFLICT DO NOTHING;
-- Supabase Schema for Booking System

-- Create opening_hours table for customized work hours
CREATE TABLE IF NOT EXISTS opening_hours (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE UNIQUE NOT NULL,
  open_time TEXT,
  close_time TEXT,
  is_closed BOOLEAN DEFAULT false
);

-- Set Row Level Security (RLS) for opening_hours
ALTER TABLE opening_hours ENABLE ROW LEVEL SECURITY;

-- Allow public read access to opening_hours (needed for availability check if done from client, but we do it via server. Still good to have)
CREATE POLICY "Allow public read opening_hours" ON opening_hours
  FOR SELECT USING (true);

-- Allow authenticated users to manage opening_hours
CREATE POLICY "Allow authenticated manage opening_hours" ON opening_hours
  FOR ALL USING (auth.role() = 'authenticated');

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 30,
  status TEXT DEFAULT 'confirmed' NOT NULL,
  UNIQUE(booking_date, booking_time)
);

-- Set Row Level Security (RLS)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert (so they can book without logging in)
CREATE POLICY "Allow public insert to bookings" ON bookings
  FOR INSERT WITH CHECK (true);

-- Allow authenticated users to read all bookings (for the admin panel)
CREATE POLICY "Allow authenticated read all bookings" ON bookings
  FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to update all bookings
CREATE POLICY "Allow authenticated update all bookings" ON bookings
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete all bookings
CREATE POLICY "Allow authenticated delete all bookings" ON bookings
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  duration_minutes INTEGER NOT NULL,
  price DECIMAL(10, 2),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set RLS for services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Allow public read access to services
CREATE POLICY "Allow public read services" ON services
  FOR SELECT USING (true);

-- Allow authenticated users to manage services
CREATE POLICY "Allow authenticated manage services" ON services
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert initial services
INSERT INTO services (name, duration_minutes, price) VALUES
('Hiustenleikkaus', 30, 35.00),
('Värjäys & Raidat', 180, 120.00),
('Juhlakampaus', 60, 65.00)
ON CONFLICT (name) DO NOTHING;
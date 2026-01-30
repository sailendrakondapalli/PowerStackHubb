/*
  # Add Contact Form Support

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `subject` (text)
      - `message` (text)
      - `type` (text) - general, technical, custom, component, business
      - `status` (text) - new, read, replied, closed
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on contact_messages table
    - Add policy for anyone to insert messages
    - Add policy for admin to read all messages

  3. Sample Data
    - Insert sample contact messages for testing
*/

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'general' CHECK (type IN ('general', 'technical', 'custom', 'component', 'business')),
  status text DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'closed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policies for contact messages
CREATE POLICY "Anyone can insert contact messages"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read all contact messages"
  ON contact_messages
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contact messages"
  ON contact_messages
  FOR UPDATE
  TO authenticated
  USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_contact_messages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for contact messages
CREATE TRIGGER update_contact_messages_updated_at
  BEFORE UPDATE ON contact_messages
  FOR EACH ROW
  EXECUTE FUNCTION update_contact_messages_updated_at();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_messages_status ON contact_messages(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_type ON contact_messages(type);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON contact_messages(created_at DESC);

-- Insert sample contact messages for testing
INSERT INTO contact_messages (name, email, subject, message, type, status) VALUES
(
  'John Smith',
  'john.smith@example.com',
  'Help with Power Apps Component',
  'Hi, I need help implementing the custom form validation component in my Power Apps project. Can you provide guidance on the setup process?',
  'technical',
  'new'
),
(
  'Sarah Johnson',
  'sarah.j@company.com',
  'Custom Power BI Dashboard Request',
  'We need a custom Power BI dashboard for our sales team. Can you provide a quote for developing a comprehensive sales analytics dashboard?',
  'custom',
  'new'
),
(
  'Mike Chen',
  'mike.chen@startup.io',
  'Power Automate Flow Development',
  'Looking for help with creating automated workflows for our document approval process. What would be the timeline and cost for this project?',
  'business',
  'read'
),
(
  'Lisa Rodriguez',
  'lisa.r@nonprofit.org',
  'Component Customization Question',
  'I downloaded the inventory management component but need to customize it for our specific needs. Do you offer customization services?',
  'component',
  'replied'
),
(
  'David Wilson',
  'david.wilson@enterprise.com',
  'General Inquiry About Services',
  'Can you provide more information about your consulting services and availability for a large-scale Power Platform implementation?',
  'general',
  'new'
);
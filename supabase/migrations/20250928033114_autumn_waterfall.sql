/*
  # PowerStack Complete Database Schema

  1. New Tables
    - `posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `content` (text) - YAML/code content
      - `type` (text) - powerbi, powerapps, powerautomate
      - `is_free` (boolean, default true)
      - `difficulty` (text) - Beginner, Intermediate, Advanced
      - `tags` (text array)
      - `images` (text array) - URLs to images (16:9 aspect ratio)
      - `download_link` (text) - Google Drive link
      - `is_published` (boolean, default false)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `author_id` (uuid, references auth.users)

    - `youtube_videos`
      - `id` (uuid, primary key)
      - `title` (text)
      - `youtube_url` (text)
      - `thumbnail_url` (text)
      - `duration` (text)
      - `views` (text)
      - `is_published` (boolean, default false)
      - `created_at` (timestamp)
      - `author_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access to published content
    - Add policies for authenticated admin users to manage content

  3. Indexes
    - Add performance indexes for common queries
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  content text NOT NULL,
  type text NOT NULL CHECK (type IN ('powerapps', 'powerbi', 'powerautomate')),
  is_free boolean DEFAULT true,
  difficulty text DEFAULT 'Beginner' CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  tags text[] DEFAULT '{}',
  images text[] DEFAULT '{}',
  download_link text,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  author_id uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

-- YouTube videos table
CREATE TABLE IF NOT EXISTS youtube_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  youtube_url text NOT NULL,
  thumbnail_url text,
  duration text,
  views text,
  is_published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  author_id uuid REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE youtube_videos ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can read published posts" ON posts;
DROP POLICY IF EXISTS "Authenticated users can manage posts" ON posts;
DROP POLICY IF EXISTS "Authenticated users can insert posts" ON posts;
DROP POLICY IF EXISTS "Anyone can read published videos" ON youtube_videos;
DROP POLICY IF EXISTS "Authenticated users can manage videos" ON youtube_videos;
DROP POLICY IF EXISTS "Authenticated users can insert videos" ON youtube_videos;

-- Policies for posts
CREATE POLICY "Anyone can read published posts"
  ON posts
  FOR SELECT
  USING (is_published = true);

CREATE POLICY "Authenticated users can manage their posts"
  ON posts
  FOR ALL
  TO authenticated
  USING (auth.uid() = author_id);

CREATE POLICY "Authenticated users can insert posts"
  ON posts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

-- Policies for YouTube videos
CREATE POLICY "Anyone can read published videos"
  ON youtube_videos
  FOR SELECT
  USING (is_published = true);

CREATE POLICY "Authenticated users can manage their videos"
  ON youtube_videos
  FOR ALL
  TO authenticated
  USING (auth.uid() = author_id);

CREATE POLICY "Authenticated users can insert videos"
  ON youtube_videos
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = author_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_posts_updated_at ON posts;

-- Trigger for posts
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(is_published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_type ON posts(type);
CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_videos_published ON youtube_videos(is_published, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_videos_author ON youtube_videos(author_id);

-- Insert sample data (optional - remove if not needed)
-- This will only insert if no posts exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM posts LIMIT 1) THEN
    INSERT INTO posts (title, description, content, type, difficulty, tags, images, is_published, author_id) VALUES
    (
      'Custom Form Validation Component',
      'A comprehensive form validation component for Power Apps with real-time validation, custom error messages, and multiple input types support.',
      '# Custom Form Validation Component\n\n```yaml\nControls:\n  - Name: FormContainer\n    Type: Container\n    Properties:\n      Fill: RGBA(245, 245, 245, 1)\n      BorderRadius: 10\n      Padding: 20\n```\n\nThis component provides advanced form validation with:\n- Real-time field validation\n- Custom error messaging\n- Multiple input type support\n- Responsive design',
      'powerapps',
      'Intermediate',
      ARRAY['form', 'validation', 'ui', 'component'],
      ARRAY['https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800&h=450'],
      true,
      (SELECT id FROM auth.users LIMIT 1)
    ),
    (
      'Sales Dashboard Template',
      'Professional sales dashboard for Power BI with KPIs, trend analysis, and interactive visualizations for comprehensive sales reporting.',
      '# Sales Dashboard Template\n\n```json\n{\n  "version": "1.0",\n  "dataModel": {\n    "tables": [\n      {\n        "name": "Sales",\n        "columns": ["Date", "Amount", "Product", "Region"]\n      }\n    ]\n  },\n  "visualizations": [\n    {\n      "type": "card",\n      "title": "Total Sales",\n      "measure": "SUM(Sales[Amount])"\n    }\n  ]\n}\n```\n\nFeatures:\n- Revenue tracking\n- Regional performance\n- Product analysis\n- Time-based trends',
      'powerbi',
      'Advanced',
      ARRAY['dashboard', 'sales', 'kpi', 'analytics'],
      ARRAY['https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800&h=450'],
      true,
      (SELECT id FROM auth.users LIMIT 1)
    );
  END IF;
END $$;
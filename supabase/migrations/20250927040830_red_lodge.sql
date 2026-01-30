/*
  # PowerStack Database Schema

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
      - `images` (text array) - URLs to images
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
*/

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

-- Policies for posts
CREATE POLICY "Anyone can read published posts"
  ON posts
  FOR SELECT
  USING (is_published = true);

CREATE POLICY "Authenticated users can manage posts"
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

CREATE POLICY "Authenticated users can manage videos"
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

-- Trigger for posts
CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
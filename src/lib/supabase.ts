import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Post = {
  id: string;
  title: string;
  description: string;
  content: string;
  type: 'powerapps' | 'powerbi' | 'powerautomate';
  is_free: boolean;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  images: string[];
  download_link?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  author_id: string;
};

export type YouTubeVideo = {
  id: string;
  title: string;
  youtube_url: string;
  thumbnail_url?: string;
  duration?: string;
  views?: string;
  is_published: boolean;
  created_at: string;
  author_id: string;
};
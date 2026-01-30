import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Copy, Download, Tag, Clock, User, Lock, Eye } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase, Post } from '../lib/supabase';

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user, signInWithGoogle } = useAuth();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .eq('is_published', true)
        .single();
      
      if (error) throw error;
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
      setError('Post not found or not published');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = async (content: string) => {
    if (!user) {
      signInWithGoogle();
      return;
    }
    
    try {
      await navigator.clipboard.writeText(content);
      alert('Code copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
      alert('Failed to copy code. Please try again.');
    }
  };

  const handleDownload = (downloadLink: string) => {
    if (!user) {
      signInWithGoogle();
      return;
    }
    
    if (downloadLink) {
      window.open(downloadLink, '_blank');
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-orange-600 bg-orange-100';
      case 'Advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'powerapps': return 'Power Apps';
      case 'powerbi': return 'Power BI';
      case 'powerautomate': return 'Power Automate';
      default: return type;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 text-teal-600 hover:text-teal-700"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-teal-600 hover:text-teal-700 mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          
          <div className="bg-white rounded-xl shadow-sm p-8">
            {/* Post Header */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-teal-100 text-teal-700">
                  {getTypeLabel(post.type)}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(post.difficulty)}`}>
                  {post.difficulty}
                </span>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                  <Tag className="w-3 h-3 inline mr-1" />
                  {post.is_free ? 'Free' : 'Premium'}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
              
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Clock className="w-4 h-4 mr-2" />
                <span>Published on {new Date(post.created_at).toLocaleDateString()}</span>
              </div>
              
              <p className="text-gray-700 text-lg leading-relaxed">{post.description}</p>
            </div>

            {/* Images */}
            {post.images && post.images.length > 0 && (
              <div className="mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {post.images.map((image, index) => (
                    <div key={index} className="aspect-video overflow-hidden rounded-lg">
                      <img 
                        src={image} 
                        alt={`${post.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => handleCopyCode(post.content)}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
                >
                  {!user && <Lock className="w-5 h-5" />}
                  <Copy className="w-5 h-5" />
                  <span>{user ? 'Copy Code' : 'Sign in to Copy Code'}</span>
                </button>
                
                {post.download_link && (
                  <button 
                    onClick={() => handleDownload(post.download_link!)}
                    className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
                  >
                    {!user && <Lock className="w-5 h-5" />}
                    <Download className="w-5 h-5" />
                    <span>{user ? 'Download Files' : 'Sign in to Download'}</span>
                  </button>
                )}
              </div>
              
              {!user && (
                <p className="text-sm text-gray-600 mt-3">
                  <Lock className="w-4 h-4 inline mr-1" />
                  Sign in with Google to copy code and download files
                </p>
              )}
            </div>

            {/* Code Content */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Code & Implementation</h3>
              <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
                <pre className="text-green-400 text-sm leading-relaxed whitespace-pre-wrap">
                  {post.content}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
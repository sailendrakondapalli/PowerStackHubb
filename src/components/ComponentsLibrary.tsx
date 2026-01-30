import React, { useState } from 'react';
import { Eye, Copy, Download, Tag, Star, Clock, Lock, ArrowRight, ExternalLink, Zap, BarChart3, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase, Post } from '../lib/supabase';

const ComponentsLibrary = () => {
  const { user, signInWithGoogle } = useAuth();
  const [activeTab, setActiveTab] = useState('Power Apps');
  const [posts, setPosts] = useState<Post[]>([]);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  const tabs = [
    { label: 'Power Apps', value: 'powerapps' },
    { label: 'Power BI', value: 'powerbi' },
    { label: 'Power Automate', value: 'powerautomate' }
  ];
  
  React.useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // Fetch all posts to check if there are more than what we display
      const { data: allData, error: allError } = await supabase
        .from('posts')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });
      
      if (allError) throw allError;
      setAllPosts(allData || []);
      
      // Show only first 6 posts for display
      setPosts((allData || []).slice(0, 6));
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const currentTabValue = tabs.find(tab => tab.label === activeTab)?.value || 'powerapps';
  const filteredComponents = posts.filter(post => post.type === currentTabValue);
  const totalComponentsInCategory = allPosts.filter(post => post.type === currentTabValue).length;
  const hasMoreComponents = totalComponentsInCategory > filteredComponents.length;

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

  return (
    <div className="bg-white">
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`py-3 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.label
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Component Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading components...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredComponents.map((post) => (
            <div key={post.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group relative">
            {/* Image */}
              {post.images && post.images.length > 0 && (
                <Link to={`/post/${post.id}`} className="block aspect-video overflow-hidden">
                  <img 
                    src={post.images[0]} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
              )}
            
            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <Link to={`/post/${post.id}`} className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                    {post.title}
                </h3>
                </Link>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(post.difficulty)}`}>
                    {post.difficulty}
                </span>
              </div>
              
              <Link to={`/post/${post.id}`}>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {post.description}
                </p>
              </Link>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    <Tag className="w-3 h-3 inline mr-1" />
                    {post.is_free ? 'Free' : 'Premium'}
                  </span>
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
              
              {/* Actions */}
              <div className="flex gap-3 mb-3">
                  <button 
                    onClick={() => handleCopyCode(post.content)}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
                  >
                    {!user && <Lock className="w-4 h-4" />}
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </button>
                  
                  {post.download_link && (
                    <button 
                      onClick={() => handleDownload(post.download_link!)}
                      className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
                    >
                      {!user && <Lock className="w-4 h-4" />}
                      <Download className="w-4 h-4" />
                    </button>
                  )}
              </div>
              
              {/* View Details Link */}
              <Link 
                to={`/post/${post.id}`}
                className="inline-flex items-center space-x-2 text-teal-600 hover:text-teal-700 text-sm font-medium"
              >
                <Eye className="w-4 h-4" />
                <span>View Details</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
          ))}
        </div>
      )}

      {/* View All Button */}
      {!loading && filteredComponents.length > 0 && hasMoreComponents && (
        <div className="text-center mt-8">
          <Link 
            to={`/${currentTabValue}`}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
          >
            <span>View All {activeTab} Components</span>
            <ArrowRight className="w-4 h-4" />
            <span className="bg-white/20 px-2 py-1 rounded-full text-sm">
              {totalComponentsInCategory}
            </span>
          </Link>
        </div>
      )}

      {/* No Components Message */}
      {!loading && filteredComponents.length === 0 && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {activeTab === 'Power Apps' && <Zap className="w-8 h-8 text-gray-400" />}
              {activeTab === 'Power BI' && <BarChart3 className="w-8 h-8 text-gray-400" />}
              {activeTab === 'Power Automate' && <Workflow className="w-8 h-8 text-gray-400" />}
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No {activeTab} components available yet
            </h3>
            <p className="text-gray-500">
              We're working on adding more {activeTab} components soon.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComponentsLibrary;
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Copy, Download, Tag, Lock, Eye, ExternalLink, Search, TrendingUp, Star, Clock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase, Post } from '../lib/supabase';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { user, signInWithGoogle } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState<'featured' | 'latest' | 'popular'>('featured');

  const categoryMap: { [key: string]: { label: string; type: string } } = {
    'powerapps': { label: 'Power Apps', type: 'powerapps' },
    'powerbi': { label: 'Power BI', type: 'powerbi' },
    'powerautomate': { label: 'Power Automate', type: 'powerautomate' }
  };

  const currentCategory = categoryMap[category || ''];

  useEffect(() => {
    if (currentCategory) {
      fetchPosts();
    }
  }, [category]);

  useEffect(() => {
    filterPosts();
  }, [posts, searchQuery, activeSection]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('is_published', true)
        .eq('type', currentCategory.type)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = [...posts];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply section sorting
    switch (activeSection) {
      case 'featured':
        // Featured: Free posts first, then by difficulty (Beginner first)
        filtered.sort((a, b) => {
          if (a.is_free !== b.is_free) return a.is_free ? -1 : 1;
          const difficultyOrder = { 'Beginner': 0, 'Intermediate': 1, 'Advanced': 2 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        });
        break;
      case 'latest':
        // Latest: Most recent first
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'popular':
        // Popular: Simulate popularity by mixing difficulty and recency
        filtered.sort((a, b) => {
          const aScore = (a.is_free ? 2 : 1) + (a.difficulty === 'Beginner' ? 2 : a.difficulty === 'Intermediate' ? 1 : 0);
          const bScore = (b.is_free ? 2 : 1) + (b.difficulty === 'Beginner' ? 2 : b.difficulty === 'Intermediate' ? 1 : 0);
          return bScore - aScore;
        });
        break;
    }

    setFilteredPosts(filtered);
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

  const getSectionIcon = (section: string) => {
    switch (section) {
      case 'featured': return <Star className="w-4 h-4" />;
      case 'latest': return <Clock className="w-4 h-4" />;
      case 'popular': return <TrendingUp className="w-4 h-4" />;
      default: return null;
    }
  };

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link to="/" className="text-teal-600 hover:text-teal-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-teal-600 hover:text-teal-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {currentCategory.label} Components
              </h1>
              <p className="text-gray-600">
                {filteredPosts.length} components available • All {currentCategory.label} solutions
              </p>
            </div>

            {/* Search Box */}
            <div className="relative max-w-md w-full lg:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white shadow-sm"
              />
            </div>
          </div>

          {/* Section Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-8">
              {[
                { key: 'featured', label: 'Featured', description: 'Curated best components' },
                { key: 'latest', label: 'Latest', description: 'Most recent additions' },
                { key: 'popular', label: 'Popular', description: 'Most downloaded' }
              ].map((section) => (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key as any)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                    activeSection === section.key
                      ? 'border-teal-600 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {getSectionIcon(section.key)}
                  <span>{section.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Section Description */}
          <div className="mb-6">
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 border border-teal-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                {getSectionIcon(activeSection)}
                <span className="font-medium text-gray-900">
                  {activeSection === 'featured' && 'Featured Components'}
                  {activeSection === 'latest' && 'Latest Components'}
                  {activeSection === 'popular' && 'Popular Components'}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {activeSection === 'featured' && 'Hand-picked components perfect for getting started'}
                {activeSection === 'latest' && 'Recently added components with the newest features'}
                {activeSection === 'popular' && 'Most downloaded and highly-rated components'}
              </p>
            </div>
          </div>
        </div>

        {/* Components Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading components...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <div key={post.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group relative">
                {/* Featured Badge */}
                {activeSection === 'featured' && index < 3 && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                      <Star className="w-3 h-3 fill-current" />
                      <span>Featured</span>
                    </div>
                  </div>
                )}

                {/* Popular Badge */}
                {activeSection === 'popular' && index < 3 && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>Popular</span>
                    </div>
                  </div>
                )}

                {/* New Badge */}
                {activeSection === 'latest' && index < 3 && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>New</span>
                    </div>
                  </div>
                )}

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
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.description}
                    </p>
                  </Link>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      <Tag className="w-3 h-3 inline mr-1" />
                      {post.is_free ? 'Free' : 'Premium'}
                    </span>
                    {post.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-500">
                        +{post.tags.length - 2} more
                      </span>
                    )}
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

        {/* No Results */}
        {filteredPosts.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchQuery ? 'No components found' : `No ${currentCategory.label} components available yet`}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchQuery 
                  ? `Try adjusting your search terms or browse other categories.`
                  : `We're working on adding more ${currentCategory.label} components soon.`
                }
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-teal-600 hover:text-teal-700 font-medium"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        )}

        {/* Stats Footer */}
        {filteredPosts.length > 0 && (
          <div className="mt-12 bg-white rounded-xl shadow-sm p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-teal-600">{filteredPosts.length}</div>
                <div className="text-sm text-gray-600">Components Available</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {filteredPosts.filter(p => p.is_free).length}
                </div>
                <div className="text-sm text-gray-600">Free Components</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {filteredPosts.filter(p => p.difficulty === 'Beginner').length}
                </div>
                <div className="text-sm text-gray-600">Beginner Friendly</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
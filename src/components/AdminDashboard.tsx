import React, { useState, useEffect } from 'react';
import { Plus, CreditCard as Edit, Trash2, Eye, EyeOff, Upload, Save, X } from 'lucide-react';
import { supabase, Post, YouTubeVideo } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState<'posts' | 'videos'>('posts');
  const [posts, setPosts] = useState<Post[]>([]);
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Post | YouTubeVideo | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    type: 'powerapps' as 'powerapps' | 'powerbi' | 'powerautomate',
    difficulty: 'Beginner' as 'Beginner' | 'Intermediate' | 'Advanced',
    tags: '',
    images: '',
    download_link: '',
    youtube_url: '',
    thumbnail_url: '',
    duration: '',
    views: ''
  });

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    try {
      const [postsResponse, videosResponse] = await Promise.all([
        supabase.from('posts').select('*').order('created_at', { ascending: false }),
        supabase.from('youtube_videos').select('*').order('created_at', { ascending: false })
      ]);

      if (postsResponse.error) throw postsResponse.error;
      if (videosResponse.error) throw videosResponse.error;

      setPosts(postsResponse.data || []);
      setVideos(videosResponse.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      type: 'powerapps',
      difficulty: 'Beginner',
      tags: '',
      images: '',
      download_link: '',
      youtube_url: '',
      thumbnail_url: '',
      duration: '',
      views: ''
    });
    setEditingItem(null);
    setShowForm(false);
  };

  const handleEdit = (item: Post | YouTubeVideo) => {
    setEditingItem(item);
    if ('content' in item) {
      // It's a Post
      const post = item as Post;
      setFormData({
        title: post.title,
        description: post.description,
        content: post.content,
        type: post.type,
        difficulty: post.difficulty,
        tags: post.tags.join(', '),
        images: post.images.join(', '),
        download_link: post.download_link || '',
        youtube_url: '',
        thumbnail_url: '',
        duration: '',
        views: ''
      });
    } else {
      // It's a YouTubeVideo
      const video = item as YouTubeVideo;
      setFormData({
        title: video.title,
        description: '',
        content: '',
        type: 'powerapps',
        difficulty: 'Beginner',
        tags: '',
        images: '',
        download_link: '',
        youtube_url: video.youtube_url,
        thumbnail_url: video.thumbnail_url || '',
        duration: video.duration || '',
        views: video.views || ''
      });
    }
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      if (activeTab === 'posts') {
        const postData = {
          title: formData.title,
          description: formData.description,
          content: formData.content,
          type: formData.type,
          difficulty: formData.difficulty,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
          images: formData.images.split(',').map(img => img.trim()).filter(Boolean),
          download_link: formData.download_link || null,
          author_id: user.id
        };

        if (editingItem && 'content' in editingItem) {
          const { error } = await supabase
            .from('posts')
            .update(postData)
            .eq('id', editingItem.id);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('posts')
            .insert([postData]);
          if (error) throw error;
        }
      } else {
        const videoData = {
          title: formData.title,
          youtube_url: formData.youtube_url,
          thumbnail_url: formData.thumbnail_url || null,
          duration: formData.duration || null,
          views: formData.views || null,
          author_id: user.id
        };

        if (editingItem && !('content' in editingItem)) {
          const { error } = await supabase
            .from('youtube_videos')
            .update(videoData)
            .eq('id', editingItem.id);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('youtube_videos')
            .insert([videoData]);
          if (error) throw error;
        }
      }

      await fetchData();
      resetForm();
      alert('Saved successfully!');
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving. Please try again.');
    }
  };

  const togglePublish = async (item: Post | YouTubeVideo) => {
    try {
      const table = 'content' in item ? 'posts' : 'youtube_videos';
      const { error } = await supabase
        .from(table)
        .update({ is_published: !item.is_published })
        .eq('id', item.id);

      if (error) throw error;
      await fetchData();
    } catch (error) {
      console.error('Error toggling publish:', error);
    }
  };

  const handleDelete = async (item: Post | YouTubeVideo) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const table = 'content' in item ? 'posts' : 'youtube_videos';
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', item.id);

      if (error) throw error;
      await fetchData();
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
          
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('posts')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'posts'
                    ? 'border-teal-600 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Posts ({posts.length})
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === 'videos'
                    ? 'border-teal-600 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                YouTube Videos ({videos.length})
              </button>
            </div>
          </div>

          {/* Add Button */}
          <button
            onClick={() => setShowForm(true)}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add {activeTab === 'posts' ? 'Post' : 'Video'}</span>
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {editingItem ? 'Edit' : 'Add'} {activeTab === 'posts' ? 'Post' : 'Video'}
                  </h2>
                  <button
                    onClick={resetForm}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>

                  {activeTab === 'posts' ? (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description *
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Content/Code *
                        </label>
                        <textarea
                          required
                          rows={8}
                          value={formData.content}
                          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent font-mono text-sm"
                          placeholder="Paste your YAML or code here..."
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Type *
                          </label>
                          <select
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          >
                            <option value="powerapps">Power Apps</option>
                            <option value="powerbi">Power BI</option>
                            <option value="powerautomate">Power Automate</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Difficulty
                          </label>
                          <select
                            value={formData.difficulty}
                            onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          >
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tags (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={formData.tags}
                          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="e.g., form, validation, ui"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Images (comma-separated URLs, 16:9 aspect ratio recommended)
                        </label>
                        <input
                          type="text"
                          value={formData.images}
                          onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Download Link (Google Drive)
                        </label>
                        <input
                          type="url"
                          value={formData.download_link}
                          onChange={(e) => setFormData({ ...formData, download_link: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="https://drive.google.com/..."
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          YouTube URL *
                        </label>
                        <input
                          type="url"
                          required
                          value={formData.youtube_url}
                          onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="https://youtube.com/watch?v=..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Thumbnail URL
                        </label>
                        <input
                          type="url"
                          value={formData.thumbnail_url}
                          onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Duration
                          </label>
                          <input
                            type="text"
                            value={formData.duration}
                            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="10:45"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Views
                          </label>
                          <input
                            type="text"
                            value={formData.views}
                            onChange={(e) => setFormData({ ...formData, views: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="15.2K"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Content List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    {activeTab === 'posts' && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                    )}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {(activeTab === 'posts' ? posts : videos).map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.title}</div>
                      </td>
                      {activeTab === 'posts' && (
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {(item as Post).type}
                          </span>
                        </td>
                      )}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.is_published 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.is_published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="text-teal-600 hover:text-teal-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => togglePublish(item)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            {item.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {(activeTab === 'posts' ? posts : videos).length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No {activeTab} found. Create your first one!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
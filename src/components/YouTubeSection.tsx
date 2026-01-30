import React from 'react';
import { Play, Youtube, ExternalLink } from 'lucide-react';
import { supabase, YouTubeVideo } from '../lib/supabase';

const YouTubeSection = () => {
  const [videos, setVideos] = React.useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('youtube_videos')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false })
        .limit(4);
      
      if (error) throw error;
      setVideos(data || []);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoClick = (youtubeUrl: string) => {
    window.open(youtubeUrl, '_blank');
  };

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Youtube className="w-8 h-8 text-red-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">
              Latest YouTube Tutorials
            </h2>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn from step-by-step tutorials and see components in action. 
            Subscribe for weekly Power Platform tips and tricks.
          </p>
        </div>

        {/* Video Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading videos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {videos.map((video) => (
              <div 
                key={video.id} 
                className="group cursor-pointer"
                onClick={() => handleVideoClick(video.youtube_url)}
              >
              <div className="relative overflow-hidden rounded-xl bg-gray-900 aspect-video mb-3">
                  {video.thumbnail_url ? (
                    <img 
                      src={video.thumbnail_url} 
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <Youtube className="w-12 h-12 text-red-600" />
                    </div>
                  )}
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-red-600 rounded-full p-3">
                    <Play className="w-6 h-6 text-white fill-current ml-1" />
                  </div>
                </div>

                {/* Duration */}
                  {video.duration && (
                    <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
                  )}
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors">
                {video.title}
              </h3>
                {video.views && (
                  <p className="text-sm text-gray-500">{video.views} views</p>
                )}
            </div>
            ))}
            
            {videos.length === 0 && (
              <div className="col-span-4 text-center py-12">
                <p className="text-gray-500">No videos available yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Subscribe CTA */}
        <div className="text-center">
          <button 
            onClick={() => window.open('https://youtube.com/@yourchannel', '_blank')} // TODO: Replace with your YouTube channel
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 mx-auto transition-all transform hover:scale-105 shadow-lg"
          >
            <Youtube className="w-5 h-5" />
            <span>Subscribe to Channel</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default YouTubeSection;
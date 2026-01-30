import React from 'react';
import { User, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const { user, signInWithGoogle, signOut, isAdmin } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 hover:text-teal-600 transition-colors whitespace-nowrap">
              PowerStack<span className="text-teal-600">Hub</span>
            </a>
          </div>

          {/* Navigation - Hidden on small screens */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
              Home
            </a>
            {isAdmin && (
              <a href="/admin" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
                Admin
              </a>
            )}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center flex-shrink-0">
            {user ? (
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="flex items-center space-x-2">
                  <img
                    src={user.user_metadata?.avatar_url}
                    alt={user.user_metadata?.full_name}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
                  />
                  <span className="hidden sm:block text-sm font-medium text-gray-700 truncate max-w-[120px]">
                    {user.user_metadata?.full_name}
                  </span>
                </div>
                <button
                  onClick={signOut}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={signInWithGoogle}
                className="bg-white border border-gray-300 rounded-lg px-3 py-2 sm:px-4 flex items-center space-x-2 hover:bg-gray-50 transition-colors text-sm sm:text-base whitespace-nowrap"
              >
                <User className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline">Sign In with Google</span>
                <span className="sm:hidden">Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
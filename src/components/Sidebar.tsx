import React from 'react';
import { Heart, Coffee, Mail, Phone, DollarSign, Star } from 'lucide-react';

const Sidebar = () => {
  const handlePayPalDonate = () => {
    // TODO: Replace with your actual PayPal donation link
    window.open('https://paypal.me/naveensadanala', '_blank');
  };

  const handleBuyMeCoffee = () => {
    // TODO: Replace with your actual Buy Me a Coffee link
    window.open('https://www.buymeacoffee.com/yourusername', '_blank');
  };

  const handleWhatsApp = () => {
    // TODO: Replace with your actual WhatsApp number
    window.open('https://wa.me/1234567890?text=Hi,%20I%20need%20help%20with%20Power%20Platform%20components', '_blank');
  };

  const handleEmail = () => {
    // TODO: Replace with your actual email
    window.open('mailto:your-email@gmail.com?subject=Power%20Platform%20Help%20Request', '_blank');
  };

  return (
    <div className="sticky top-24 space-y-6">
      {/* Donate Box */}
      <div className="bg-gradient-to-br from-pink-50 to-red-50 border border-pink-200 rounded-xl p-6">
        <div className="text-center">
          <Heart className="w-8 h-8 text-red-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Like my work?
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Support free components ❤️
          </p>
          
          <div className="space-y-3">
            <button 
              onClick={handlePayPalDonate}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
            >
              <DollarSign className="w-4 h-4" />
              <span>Support via PayPal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Contact / Hire Box */}
      <div className="bg-gradient-to-br from-teal-50 to-blue-50 border border-teal-200 rounded-xl p-6">
        <div className="text-center mb-4">
          <Star className="w-8 h-8 text-teal-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Need Expert Help?
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Professional deployment and configuration services
          </p>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-lg p-4 mb-4 border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600 text-sm">Hourly Rate:</span>
            <div className="text-right">
              <div className="font-bold text-teal-600">$20 USD</div>
              <div className="text-sm text-gray-500">₹1,600 INR</div>
            </div>
          </div>
        </div>

        {/* Contact Options */}
        <div className="space-y-3">
          <button 
            onClick={handleWhatsApp}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>WhatsApp</span>
          </button>
          
          <button 
            onClick={handleEmail}
            className="w-full bg-gray-700 hover:bg-gray-800 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Email Me</span>
          </button>
        </div>

        <div className="mt-4 text-center">
          <div className="flex items-center justify-center text-yellow-500 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <p className="text-xs text-gray-500">5.0 rating from 50+ clients</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Community Stats</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600 text-sm">Total Downloads</span>
            <span className="font-semibold text-gray-900">15,234</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 text-sm">Active Users</span>
            <span className="font-semibold text-gray-900">3,456</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 text-sm">Components</span>
            <span className="font-semibold text-gray-900">125+</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
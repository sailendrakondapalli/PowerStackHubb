import React from 'react';
import { Youtube, Linkedin, Github, Mail, Shield, FileText, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">
              PowerStack<span className="text-teal-400">Hub</span>
            </h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Your ultimate destination for PowerStackHub components. 
              Ship faster, build better, scale smarter with our production-ready solutions.
            </p>
            
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a href="https://youtube.com/@yourchannel" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-red-600 p-3 rounded-lg transition-colors"> {/* TODO: Replace with your YouTube */}
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com/in/naveensadhanala" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-blue-600 p-3 rounded-lg transition-colors"> {/* TODO: Replace with your LinkedIn */}
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="bg-gray-800 hover:bg-gray-600 p-3 rounded-lg transition-colors"> {/* TODO: Replace with your GitHub */}
                <Github className="w-5 h-5" />
              </a>
              <a href="mailto:your-email@gmail.com" className="bg-gray-800 hover:bg-teal-600 p-3 rounded-lg transition-colors"> {/* TODO: Replace with your email */}
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="/#components" className="text-gray-300 hover:text-teal-400 transition-colors">
                  Components Library
                </a>
              </li>
              <li>
                <a href="/#pricing" className="text-gray-300 hover:text-teal-400 transition-colors">
                  Custom Projects
                </a>
              </li>
              <li>
                <a href="/#pricing" className="text-gray-300 hover:text-teal-400 transition-colors">
                  Pricing & Services
                </a>
              </li>
              <li>
                <a href="https://youtube.com/@yourchannel" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-teal-400 transition-colors"> {/* TODO: Replace with your YouTube */}
                  YouTube Channel
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="/contact" className="text-gray-300 hover:text-teal-400 transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 PowerStackHub — Powered by Microsoft Power Platform
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Made with ❤️ for the Power Platform community</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
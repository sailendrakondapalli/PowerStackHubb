import React from 'react';
import { Zap, BarChart3, Workflow, ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-16 md:py-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Circles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-teal-500/10 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-purple-500/10 rounded-full animate-pulse delay-700"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-orange-500/10 rounded-full animate-bounce delay-500"></div>
        
        {/* Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1200 600">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path 
            d="M200,150 Q400,100 600,200 T1000,180" 
            stroke="url(#lineGradient)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse"
          />
          <path 
            d="M100,300 Q300,250 500,350 T900,320" 
            stroke="url(#lineGradient)" 
            strokeWidth="2" 
            fill="none"
            className="animate-pulse delay-1000"
          />
        </svg>
        
        {/* Grid Pattern (FIXED) */}
        <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.03%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <div className="mb-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-blue-100 to-teal-200 bg-clip-text text-transparent">
                PowerStack
              </span>
              <span className="text-teal-400">Hub</span>
            </h1>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              <p className="text-xl md:text-2xl text-blue-100 font-medium">
                Ready-made components for Microsoft Power Platform
              </p>
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse delay-500" />
            </div>
          </div>

          {/* Power Platform Icons */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-8 md:space-x-12 mb-6">
              <div className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-4 rounded-full border border-white/20 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-8 h-8 text-purple-300" />
                </div>
                <p className="text-white/80 text-sm mt-2 font-medium">Power Apps</p>
              </div>

              <ArrowRight className="w-6 h-6 text-teal-400 animate-pulse hidden md:block" />

              <div className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-4 rounded-full border border-white/20 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-8 h-8 text-yellow-300" />
                </div>
                <p className="text-white/80 text-sm mt-2 font-medium">Power BI</p>
              </div>

              <ArrowRight className="w-6 h-6 text-teal-400 animate-pulse hidden md:block" />

              <div className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-4 rounded-full border border-white/20 group-hover:scale-110 transition-transform duration-300">
                  <Workflow className="w-8 h-8 text-blue-300" />
                </div>
                <p className="text-white/80 text-sm mt-2 font-medium">Power Automate</p>
              </div>
            </div>

            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-500/20 to-blue-500/20 backdrop-blur-sm px-6 py-3 rounded-full border border-teal-400/30">
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
              <span className="text-teal-200 font-medium">One Stop Solution</span>
              <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse delay-300"></div>
            </div>
          </div>

          <p className="text-lg md:text-xl text-blue-100/90 leading-relaxed mb-8 max-w-3xl mx-auto">
            Copy code or download instantly after Google sign-in.
            <span className="text-teal-300 font-semibold"> Ship faster, build better, scale smarter</span> with our production-ready solutions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#components" 
              className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Explore Components</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a 
              href="#pricing" 
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105"
            >
              Custom Development
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

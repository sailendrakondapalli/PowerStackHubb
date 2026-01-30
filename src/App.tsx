import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import ComponentsLibrary from './components/ComponentsLibrary';
import Sidebar from './components/Sidebar';
import YouTubeSection from './components/YouTubeSection';
import PricingSection from './components/PricingSection';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import AuthCallback from './components/AuthCallback';
import ContactForm from './components/ContactForm';
import CategoryPage from './components/CategoryPage';
import PostDetailPage from './components/PostDetailPage';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      
      {/* Main Content */}
      <section className="py-16" id="components">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content - Components Library */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Components Library
                </h2>
              </div>
              <ComponentsLibrary />
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Sidebar />
            </div>
          </div>
        </div>
      </section>

      {/* YouTube Section */}
      <YouTubeSection />

      {/* Pricing Section */}
      <PricingSection />
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/post/:id" element={<PostDetailPage />} />
  <Route path="/:category" element={<CategoryPage />} />
  <Route path="/admin" element={<AdminDashboard />} />
  <Route path="/auth/callback" element={<AuthCallback />} />
  <Route path="/contact" element={<ContactForm />} />
</Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
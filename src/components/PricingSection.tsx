import React from 'react';
import { Check, Zap, Settings, Clock, MessageCircle, Phone, Mail } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: 'Quick Setup',
      price: '$49',
      priceInr: '₹4,300',
      description: 'Perfect for getting started with existing components',
      features: [
        'Component installation & configuration',
        'Basic customization',
        'Email support',
        '1 revision included',
        '24-48 hour delivery'
      ],
      icon: Zap,
      popular: false
    },
    {
      name: 'Full Deployment',
      price: '$199',
      priceInr: '₹16,000',
      description: 'Complete solution with custom modifications',
      features: [
        'Full custom deployment',
        'Advanced customizations',
        'Integration with existing systems',
        'Priority support',
        '3 revisions included',
        'Documentation included',
        '7-10 day delivery'
      ],
      icon: Settings,
      popular: true
    },
    {
      name: 'Hourly Consulting',
      price: '$10/hr',
      priceInr: '₹900/hr',
      description: 'Flexible consulting for ongoing projects',
      features: [
        'Pay as you go',
        'Real-time collaboration',
        'Expert guidance',
        'No minimum commitment',
        'Same-day availability'
      ],
      icon: Clock,
      popular: false
    }
  ];

  return (
    <section className="py-16 bg-white" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Custom Power Platform Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Custom Power Apps projects, Power BI dashboards, and Power Automate flows.
            Professional development services at affordable rates.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div 
              key={plan.name} 
              className={`relative bg-white rounded-2xl border-2 p-8 ${
                plan.popular 
                  ? 'border-teal-600 shadow-xl scale-105' 
                  : 'border-gray-200 shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-teal-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <plan.icon className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                  <div className="text-sm text-gray-500">{plan.priceInr}</div>
                </div>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-teal-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
  href="/contact"
  className={`w-full py-3 px-6 rounded-xl font-semibold transition-colors inline-block text-center ${
    plan.popular
      ? 'bg-teal-600 hover:bg-teal-700 text-white'
      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
  }`}
>
  Contact for Quote
</a>

            </div>
          ))}
        </div>

        {/* Contact Options */}
        <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Professional Power Platform Services
          </h3>
          <p className="text-gray-600 mb-6">
            Custom Power Apps, Power BI dashboards, and Power Automate flows. Check out my 5-star ratings on Upwork.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.open('https://www.upwork.com/freelancers/~01adec175575791b2d?p=1792149977134260224', '_blank')} // TODO: Replace with your Upwork profile
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.142-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.438-5.439-5.438z"/>
              </svg>
              <span>View Upwork Profile</span>
            </button>
            
            <button 
              onClick={() => window.open('https://wa.me/+918639803676?text=Hi,%20I%20need%20help%20with%20Power%20Platform%20development', '_blank')} // TODO: Replace with your WhatsApp
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>WhatsApp</span>
            </button>
            
            <button 
              onClick={() => window.open('mailto:powerstackhub@gmail.com?subject=Power%20Platform%20Development%20Request', '_blank')} // TODO: Replace with your email
              className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center space-x-2 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>Email</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
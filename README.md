# PowerStack - Power Platform Components Marketplace

A modern, responsive web application for sharing and managing Power Platform components including Power Apps, Power BI, and Power Automate solutions.

## 🚀 Features

### Public Features
- **Component Library**: Browse Power Apps, Power BI, and Power Automate components
- **Google Authentication**: Required for copying code and downloading components
- **YouTube Integration**: Watch tutorial videos and subscribe to channel
- **Professional Services**: Pricing and contact information for custom development
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile

### Admin Features
- **Content Management**: Add, edit, and publish posts and YouTube videos
- **Rich Editor**: Support for YAML/code content with syntax highlighting
- **Image Management**: Upload and manage 16:9 aspect ratio images
- **Publishing Control**: Draft and publish content with toggle controls
- **User Management**: Admin-only access with email-based authentication

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Storage)
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Build Tool**: Vite

## 📋 Setup Instructions

### 1. Supabase Configuration

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Update the `.env` file with your credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### 2. Database Setup

1. In your Supabase dashboard, go to SQL Editor
2. Run the migration file: `supabase/migrations/create_powerstack_complete_schema.sql`
3. This will create all necessary tables and security policies

### 3. Authentication Setup

1. In Supabase dashboard, go to Authentication > Providers
2. Enable Google OAuth provider
3. Add your Google OAuth credentials
4. Set redirect URL to: `https://yourdomain.com/auth/callback`

### 4. Admin Configuration

Update the admin email in `src/hooks/useAuth.ts`:
```typescript
isAdmin: user?.email === 'your-actual-admin-email@gmail.com'
```

### 5. External Links Configuration

Update the following placeholder links in the components:

**Sidebar.tsx**:
- PayPal donation link
- Buy Me a Coffee link
- WhatsApp number
- Email address

**PricingSection.tsx**:
- Upwork profile URL
- WhatsApp number
- Email address

**YouTubeSection.tsx & Footer.tsx**:
- YouTube channel URL
- LinkedIn profile
- GitHub profile

## 🎨 Design Features

- **Clean, Modern UI**: Professional design with teal and orange accent colors
- **Responsive Layout**: Mobile-first design that works on all devices
- **16:9 Image Support**: Optimized for component preview images
- **Smooth Animations**: Hover effects and transitions throughout
- **Accessibility**: Proper contrast ratios and keyboard navigation

## 🔒 Security

- **Row Level Security (RLS)**: Implemented on all database tables
- **Authentication Required**: Copy and download features require Google sign-in
- **Admin-Only Access**: Content management restricted to admin users
- **Secure API**: All database operations through Supabase with proper policies

## 📱 Mobile Responsive

The application is fully responsive with:
- Mobile-optimized navigation
- Touch-friendly buttons and interactions
- Responsive grid layouts
- Optimized images and loading states

## 🚀 Deployment

The application is ready for deployment on platforms like:
- Vercel
- Netlify
- Bolt Hosting

Make sure to:
1. Set environment variables in your deployment platform
2. Configure OAuth redirect URLs for your domain
3. Test all functionality in production environment

## 📞 Support

For support or custom development services:
- **Email**: your-email@gmail.com
- **WhatsApp**: +1234567890
- **Upwork**: [Your Upwork Profile]
- **Rate**: $20/hour for custom Power Platform development

## 📄 License

This project is licensed under the MIT License.
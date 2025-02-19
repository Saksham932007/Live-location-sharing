# LocateMe - Real-time Location Sharing

LocateMe is a modern, secure, and user-friendly application for real-time location sharing. Built with Next.js, Supabase, and modern web technologies, it offers a seamless experience for sharing your location with others.

## Features

- **Secure Authentication**
  - Social login (Google, Apple)
  - Email/password authentication
  - Protected API routes and data access

- **Real-time Location Sharing**
  - Share location via phone number
  - Customizable sharing duration
  - Real-time location updates
  - Offline support with background sync

- **Mobile-First Design**
  - Progressive Web App (PWA)
  - Responsive UI
  - Touch-friendly controls
  - Offline functionality

- **Push Notifications**
  - Location share notifications
  - Share expiration alerts
  - Real-time updates
  - Customizable preferences

- **Dashboard**
  - Active shares overview
  - Share management
  - Analytics and statistics
  - Real-time updates

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn
- Supabase account
- Twilio account (for SMS)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/locateme.git
cd locateme
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_FROM_NUMBER=your_twilio_number
NEXT_PUBLIC_VAPID_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key
VAPID_SUBJECT=mailto:your-email@example.com
```

4. Run database migrations:
```bash
npm run migrations
```

5. Start the development server:
```bash
npm run dev
```

### Production Deployment

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Architecture

### Tech Stack

- **Frontend**
  - Next.js 14
  - React
  - TailwindCSS
  - Mapbox GL
  - IndexedDB

- **Backend**
  - Supabase (Database & Authentication)
  - Next.js API Routes
  - Twilio (SMS)
  - Web Push API

- **Infrastructure**
  - Vercel (Recommended)
  - Supabase Cloud
  - PWA with Service Workers

### Database Schema

```sql
-- Users (handled by Supabase Auth)
auth.users

-- Location Shares
create table public.location_shares (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  recipient_phone text not null,
  end_time timestamp with time zone not null,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Location Updates
create table public.location_updates (
  id uuid primary key default uuid_generate_v4(),
  share_id uuid references public.location_shares not null,
  latitude double precision not null,
  longitude double precision not null,
  accuracy double precision,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Push Subscriptions
create table public.push_subscriptions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  subscription jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```

## Security

- Row Level Security (RLS) policies
- Secure authentication flow
- Protected API routes
- Encrypted data transmission
- Phone number verification
- Rate limiting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@locateme.com or create an issue in the GitHub repository.

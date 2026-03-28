# V4 - Fathom Calls Collector

Automatically sync, organize, and search your Fathom call recordings and transcripts in Google Drive for business insights.

## What this does

This application automatically syncs your Fathom call recordings to Google Drive, extracts transcripts, organizes everything by date, and sends you email notifications when new calls are processed. Think of it as your personal business therapy archive — every call conversation stored, searchable, and organized.

## Who it's for

Built for personal use by business professionals who want to maintain a continuous feed of all their calls for analysis and reflection.

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Edge Functions)
- **Integrations**: Twilio, HubSpot, Gmail, Google Drive, Zapier, Make, n8n
- **Deployment**: Vercel
- **Storage**: Google Drive for recordings, Supabase for metadata

## Prerequisites

- Node.js 18+
- npm or yarn
- Supabase CLI
- Google Cloud Platform account
- Fathom account
- Gmail account
- Twilio account

## Local Setup

1. **Clone the repository**
   bash
   git clone <repository-url>
   cd v4-fathom-calls-collector
   

2. **Install dependencies**
   bash
   npm install
   

3. **Set up environment variables**
   Copy `.env.example` to `.env.local` and fill in your values:
   bash
   cp .env.example .env.local
   

4. **Start Supabase**
   bash
   supabase start
   

5. **Run the development server**
   bash
   npm run dev
   

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `FATHOM_API_KEY` | Fathom API key for call sync | Yes |
| `GOOGLE_DRIVE_CREDENTIALS` | Google Drive service account JSON | Yes |
| `GMAIL_CREDENTIALS` | Gmail API credentials | Yes |
| `TWILIO_ACCOUNT_SID` | Twilio account SID | Yes |
| `TWILIO_AUTH_TOKEN` | Twilio auth token | Yes |
| `TWILIO_PHONE_NUMBER` | Twilio phone number | Yes |
| `HUBSPOT_API_KEY` | HubSpot API key | No |
| `ZAPIER_WEBHOOK_URL` | Zapier webhook URL | No |
| `MAKE_WEBHOOK_URL` | Make.com webhook URL | No |
| `N8N_WEBHOOK_URL` | n8n webhook URL | No |

## Database Setup

1. **Apply migrations**
   bash
   supabase db reset
   

2. **Verify setup**
   bash
   supabase status
   

The database includes 8 tables: users, fathom_calls, call_transcripts, action_items, email_notifications, api_integrations, search_queries, and processing_jobs.

## Deploy to Vercel

1. **Connect to Vercel**
   bash
   npx vercel
   

2. **Set environment variables in Vercel dashboard**
   Add all environment variables from your `.env.local`

3. **Deploy**
   bash
   npx vercel --prod
   

## Project Structure


src/
├── app/                 # Next.js 15 app router
│   ├── (auth)/         # Authentication pages
│   ├── (dashboard)/    # Protected dashboard pages
│   └── api/            # API routes and webhooks
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   └── forms/         # Form components
├── lib/               # Utility functions and business logic
├── db/                # Database queries and schema
├── actions/           # Server actions
└── types/             # TypeScript type definitions

supabase/
├── migrations/        # Database migrations
└── functions/         # Edge functions


## Features

- 🔄 **Automatic Sync**: Fathom calls automatically sync to Google Drive
- 📁 **Smart Organization**: Date-based folder structure (YYYY/MM/DD)
- 📝 **Transcript Extraction**: Searchable text files for every call
- 📧 **Email Notifications**: Gmail alerts when new calls are processed
- 🏷️ **Metadata Tagging**: Duration, participants, meeting type in file names
- 📱 **SMS Notifications**: Twilio text alerts for important updates
- 🔍 **Advanced Search**: Find conversations across all stored transcripts

## Contributing

This is a personal project. Please read `CLAUDE.md` before making any changes.
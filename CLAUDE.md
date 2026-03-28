# CLAUDE.md - V4 Fathom Calls Collector

## Project Overview
An automated system that syncs Fathom call recordings to Google Drive, extracts transcripts, and provides intelligent organization and search capabilities. Built as a personal business therapy tool for continuous call analysis and reflection.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase (PostgreSQL + Auth + Edge Functions)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Key Integrations**: Fathom API, Google Drive API, Gmail API, Twilio

## Folder Structure

src/
├── app/                    # Next.js app router
│   ├── (auth)/            # Auth pages: login, signup, forgot-password
│   ├── (dashboard)/       # Protected pages: dashboard, calls, search, etc.
│   ├── api/               # API routes and webhooks
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── forms/             # Form components
│   ├── dashboard/         # Dashboard-specific components
│   └── auth/              # Authentication components
├── lib/
│   ├── supabase.ts        # Supabase client configuration
│   ├── auth.ts            # Authentication utilities
│   ├── fathom.ts          # Fathom API integration
│   ├── google-drive.ts    # Google Drive API integration
│   ├── gmail.ts           # Gmail API integration
│   ├── twilio.ts          # Twilio integration
│   └── utils.ts           # General utilities
├── db/
│   ├── queries/           # Database query functions
│   ├── schema.ts          # TypeScript types for database
│   └── migrations/        # SQL migration files
├── actions/
│   ├── auth.ts            # Authentication server actions
│   ├── calls.ts           # Call management server actions
│   ├── sync.ts            # Sync process server actions
│   └── search.ts          # Search server actions
└── types/
    ├── database.ts        # Database type definitions
    ├── api.ts             # API response types
    └── integrations.ts    # Integration-specific types

supabase/
├── migrations/            # Database schema migrations
├── functions/             # Edge functions for webhooks
└── config.toml           # Supabase configuration


## Coding Conventions
- **TypeScript**: Strict mode enabled, no `any` types
- **Components**: Server components by default, use 'use client' only when needed
- **Data Access**: Only in `/db` directory using Supabase client
- **Business Logic**: Only in `/lib` and `/actions` directories
- **Security**: No secrets in client components, all API keys server-side only
- **Error Handling**: Structured error responses with proper HTTP status codes
- **Naming**: PascalCase for components, camelCase for functions, kebab-case for files

## Current State (Scaffold)
The following has been generated:
- ✅ Complete database schema with 8 tables
- ✅ All page route stubs (18 pages total)
- ✅ Authentication system with Supabase
- ✅ Basic dashboard layout structure
- ✅ Integration configuration stubs for all APIs
- ✅ TypeScript types for all data models
- ✅ Tailwind CSS setup with basic styling
- ✅ Supabase RLS policies (basic implementation)

## What to Build Next (V1 Features)
1. **Automatic Fathom Call Sync** - Connect to Fathom API and sync recordings to Google Drive with date-based folder structure
2. **Transcript Extraction** - Extract and convert call transcripts to searchable text files
3. **Gmail Notification System** - Send summary emails when new calls are processed
4. **Call Metadata Tagging** - Embed duration, participants, and meeting type in file organization
5. **Voice-to-Action Item Extraction** - Automatically create tasks from call discussions
6. **Advanced Search** - Search across all stored transcripts with keyword highlighting
7. **Twilio SMS Notifications** - Essential text notifications for processing updates

## Never Touch Rules
- ❌ Never modify `.env` files directly in commits
- ❌ Never edit migration files without explicit instruction to rollback/modify
- ❌ Never change RLS policies without security review
- ❌ Never commit API keys or secrets
- ❌ Never use `any` type in TypeScript
- ❌ Never put database queries in components

## How to Work on This Project
1. **Always read this file first** before making any changes
2. **Run `npm run build`** before committing to catch TypeScript errors
3. **Commit small and often** with conventional commit messages (feat:, fix:, docs:, etc.)
4. **Test integrations** in development environment before production
5. **Document technical debt** explicitly in TECHNICAL_DEBT.md
6. **Keep it simple** - the user specifically mentioned they want simplicity
7. **Focus on automation** - minimize manual user input where possible

## Integration Priority Order
1. Fathom API (core functionality)
2. Google Drive API (storage)
3. Gmail API (notifications)
4. Twilio SMS (essential notifications)
5. HubSpot (roadmap feature)
6. Zapier/Make/n8n (automation enhancement)

## Key User Experience Principles
- **Simplicity First**: User described themselves as "kind of an idiot" - keep UI extremely simple
- **Automation Over Configuration**: Minimize settings, maximize automatic behavior
- **Clear Feedback**: Always show what's happening during sync processes
- **Error Recovery**: Graceful handling of API failures with retry mechanisms
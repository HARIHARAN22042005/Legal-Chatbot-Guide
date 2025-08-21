# Authentication Setup Guide

This guide will help you set up authentication for the Legal Chatbot Guide application using Supabase.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. Node.js and npm installed

## Setup Steps

### 1. Create a Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Choose your organization
4. Enter a project name (e.g., "legal-chatbot-guide")
5. Enter a database password
6. Choose a region
7. Click "Create new project"

### 2. Get Your Supabase Credentials

1. In your Supabase dashboard, go to Settings > API
2. Copy the following values:
   - Project URL
   - Anon (public) key

### 3. Configure Environment Variables

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and replace the placeholder values:
   ```
   VITE_SUPABASE_URL=your-actual-supabase-url
   VITE_SUPABASE_ANON_KEY=your-actual-anon-key
   ```

### 4. Configure Authentication in Supabase

1. In your Supabase dashboard, go to Authentication > Settings
2. Configure the following settings:

#### Site URL
- Set to `http://localhost:5173` for development
- For production, set to your actual domain

#### Email Templates (Optional)
- Customize the email templates for signup confirmation, password reset, etc.

#### Providers (Optional)
- Enable additional authentication providers like Google, GitHub, etc.

### 5. Set Up User Table (Optional)

If you want to store additional user information:

1. Go to the SQL Editor in your Supabase dashboard
2. Run this SQL to create a profiles table:

```sql
-- Create a table for public profiles
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,

  constraint username_length check (char_length(username) >= 3)
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

### 6. Run the Application

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

## Features

The authentication system includes:

- **Sign Up**: Users can create new accounts with email and password
- **Sign In**: Existing users can log in
- **Password Reset**: Users can reset their passwords via email
- **Session Management**: Automatic session handling and persistence
- **Protected Routes**: The main application is only accessible to authenticated users
- **User Profile**: Display user email and sign-out functionality

## Security Notes

1. Never commit your `.env` file to version control
2. Use strong passwords for your Supabase database
3. Configure Row Level Security (RLS) policies for any additional tables
4. Set up proper CORS settings for production
5. Consider enabling email confirmation for new signups

## Troubleshooting

### Common Issues

1. **"Invalid API key" error**: Check that your environment variables are correctly set
2. **CORS errors**: Ensure your site URL is configured in Supabase settings
3. **Email not sending**: Check your email settings in Supabase Auth configuration
4. **User not persisting**: Verify that your Supabase URL and key are correct

### Development vs Production

- For development: Use `http://localhost:5173` as your site URL
- For production: Update the site URL to your actual domain
- Make sure to update environment variables for production deployment

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/auth-signin)
- [React Authentication Patterns](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui)

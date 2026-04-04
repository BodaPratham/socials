SOCIALS ⚡
Elevate Your Digital Profile.
SOCIALS is a high-performance, premium digital identity platform. It is engineered for creators, designers, and entrepreneurs who demand a digital presence that reflects the quality of their work. Unlike generic link aggregators, SOCIALS provides editorial-grade layouts, integrated commerce, and a "Billionaire-Master" aesthetic out of the box.

📖 Table of Contents
Core Features

Theming Architecture

Tech Stack

Database Schema

Installation & Deployment

Monetization Logic

✨ Core Features
1. Dynamic Layout Engine
SOCIALS doesn't just change colors; it changes the entire structural experience.

Dhurndhar (Creative Portfolio): A scroll-to-reveal experience with a pinned hero background.

Cafe & Restaurant: High-impact food imagery with an overlapping "Menu & Info" card.

Brand & Commerce: An editorial lookbook layout featuring 4:5 aspect ratio product cards for a luxury feel.

2. Pro Dashboard
A command center for the modern digital nomad.

Real-time Earnings: Unified view of product revenue and fan support.

Profile Analytics: Track views and click-through rates (CTR).

Theme Management: Instant switching between 12+ premium configurations.

🎨 Theming Architecture
The project uses a JSONB Configuration System. Instead of hardcoding styles, every theme is a configuration object stored in the database.

Theme Name	Tier	Aesthetic
The Stark	Pro	Dark Titanium & Gold (Billionaire vibe)
Neon Apex	Pro	Obsidian with Cyber-Lime accents
Alabaster Minimal	Classic	High-end, airy minimalism
Metropolis	Pro	Deep Navy & Crimson (Iconic/Heroic)
🛠 Tech Stack
Frontend: Next.js 14+ (App Router), React

Styling: Tailwind CSS (Custom extended palette)

Database: Supabase (PostgreSQL)

Authentication: Supabase Auth (Magic Links/Social)

Icons: Lucide-React

Deployment: Vercel

🗄 Database Schema
To support the premium feature set, the database utilizes the following structure:

templates Table
Stores the design system configurations.

SQL
CREATE TABLE templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC DEFAULT 0,
  category TEXT, -- 'Classic' or 'Pro'
  config JSONB -- Stores colors, fonts, and border styles
);
tips Table
Handles the "Buy me a coffee" support stream.

SQL
CREATE TABLE tips (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  recipient_id UUID REFERENCES profiles(id),
  amount NUMERIC NOT NULL,
  sender_name TEXT DEFAULT 'Anonymous',
  message TEXT
);
🚀 Installation & Deployment
1. Environment Configuration
Create a .env.local and connect your Supabase project:

Bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
2. Local Setup
Bash
npm install
npm run dev
3. Database Migration
Execute the provided SQL scripts in your Supabase SQL editor to initialize the Unified Earnings View:

SQL
CREATE OR REPLACE VIEW user_total_revenue AS
SELECT recipient_id as user_id, SUM(amount) as total FROM tips GROUP BY recipient_id
UNION ALL
SELECT seller_id as user_id, SUM(developer_revenue) as total FROM marketplace_transactions GROUP BY seller_id;
💰 Monetization Logic
SOCIALS is built to turn profiles into profit centers:

Platform Fee: Built-in logic to calculate developer_revenue vs platform share.

Direct Tips: Low-friction "Tip" button integrated into every profile layout.

Premium Themes: Pro-tier themes can be locked behind a one-time purchase or subscription.

🛡 License
This project is licensed under No License.

Would you like me to add a "Troubleshooting" section or a specific "API Documentation" part if you plan on opening the platform for other developers?
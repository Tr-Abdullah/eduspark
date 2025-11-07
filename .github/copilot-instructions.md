# Eduspark - Custom Instructions

## Project Overview
Eduspark is a personal educational platform with two main sections:
- Private Admin section (authenticated) with report generator
- Public section for sharing content

## Key Features
- Next.js 16 with App Router
- TypeScript for type safety
- Tailwind CSS 4 for styling
- Simple cookie-based authentication
- Report generator tool
- Public content sharing

## Development Guidelines
- Use Arabic for UI text where appropriate
- Keep authentication simple but secure
- Maintain clean, modular code structure
- Follow Next.js best practices

## Project Structure
- `/src/app/admin` - Private admin area
- `/src/app/public` - Public sharing area
- `/src/app/api/auth` - Authentication endpoints
- `/src/lib` - Utility functions

## Default Admin Password
- Password: `eduspark123` (set in .env.local)
- Can be changed via ADMIN_PASSWORD environment variable

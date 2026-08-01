# TailOS

TailOS is a vertical business operating system for independent and multi-location pet groomers. It combines a customer-and-pet CRM, scheduling, inventory, memberships, payments, marketing automation, and owner-grade analytics with a high-performance public website and customer portal.

## Current scaffold

- Next.js App Router with TypeScript
- Tailwind CSS design foundation
- Responsive owner dashboard starter
- Supabase authentication and PostgreSQL foundation
- Multi-tenant database model with row-level security
- Core entities for organizations, team members, customers, pets, services, appointments, and inventory

## Technology

- **Web:** Next.js, React, TypeScript, Tailwind CSS
- **Database/Auth:** Supabase/PostgreSQL
- **Validation:** Zod
- **Charts:** Recharts
- **Deployment target:** Vercel

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Create a Supabase project, place its credentials in `.env.local`, then apply the migrations in `supabase/migrations`.

## Product modules

```text
src/
├── app/                  Next.js routes and layouts
├── components/           Shared UI and domain components
├── features/
│   ├── appointments/     Calendar, booking, waitlist, check-in
│   ├── customers/        Customer CRM and communications
│   ├── pets/             Pet profiles, history, behavior and health notes
│   ├── inventory/        Consumables, retail stock and purchasing
│   ├── team/             Staff, commissions, capacity and performance
│   ├── memberships/      Recurring plans and entitlements
│   ├── marketing/        Campaigns, reviews and retention workflows
│   └── analytics/        KPIs, profitability and operational insights
└── lib/                  Infrastructure clients and shared utilities
```

## Build sequence

1. Authentication, organization onboarding, and roles
2. Customer and pet CRM
3. Service catalog and appointment calendar
4. Public booking flow with deposits
5. Checkout, tips, invoices, and payments
6. Inventory and product usage
7. Owner dashboard backed by production queries
8. Retention workflows and review requests
9. Memberships and packages
10. Multi-location reporting and forecasting

## Product principles

- Pet-centered records rather than generic contact records
- Operational intelligence rather than basic reporting
- Fast daily workflows for receptionists and groomers
- Transparent profitability by service, pet type, breed, employee, and location
- Mobile-friendly by default
- Secure organization isolation at the database layer

## Initial database model

The first migration creates:

- `organizations`
- `profiles`
- `customers`
- `pets`
- `services`
- `appointments`
- `inventory_items`

All operational records carry an `organization_id`. Supabase row-level security policies restrict authenticated users to their own organization.

## Status

This repository currently contains the Phase 0 technical foundation and visual dashboard shell. The dashboard data is mocked until onboarding and production queries are connected.

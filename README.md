# ArogyaCare

**Care That Connects** - a smart hospital appointment and patient management platform.

## Features

- Patients: find doctors by specialty, book in-person or video appointments, view prescriptions and lab reports
- Doctors: manage appointments, mark visits completed, write prescriptions, add lab reports
- Hospital admins: dashboard with totals, add doctors with weekly schedules
- Three languages: English, Hindi and Punjabi
- Email notifications for bookings and cancellations

## Tech stack

Next.js, React, TypeScript, Tailwind CSS, PostgreSQL, Prisma

## Run it locally

1. Install Node.js and PostgreSQL
2. Run `npm install`
3. Create a `.env` file with `DATABASE_URL` and `SESSION_SECRET`
4. Run `npx prisma migrate dev`
5. Run `npx tsx prisma/seed.ts` to add sample data
6. Run `npm run dev` and open http://localhost:3000

## Author

Shruti Sharma

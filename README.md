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

**Requirements:** Node.js 20 or newer, PostgreSQL and Git.

Download the project and install it:

    git clone https://github.com/Shruti-138/arogyacare.git
    cd arogyacare
    npm install

Create a `.env` file in the project folder (copy `.env.example` and fill in your own values), then set up the database and start the website:

    npx prisma migrate dev
    npx tsx prisma/seed.ts
    npm run dev

Open **[http://localhost:3000](http://localhost:3000)** in your browser. This link works on your own computer while `npm run dev` is running.
## Author

Shruti Sharma

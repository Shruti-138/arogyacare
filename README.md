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
## Pages

These links work on your own computer while `npm run dev` is running.

| Page | Who can use it | Link |
|---|---|---|
| Home | Everyone | [localhost:3000](http://localhost:3000) |
| Find a Doctor | Everyone | [localhost:3000/doctors](http://localhost:3000/doctors) |
| Sign in | Everyone | [localhost:3000/login](http://localhost:3000/login) |
| Register | New patients | [localhost:3000/register](http://localhost:3000/register) |
| My appointments | Patients | [localhost:3000/appointments](http://localhost:3000/appointments) |
| Prescriptions | Patients | [localhost:3000/prescriptions](http://localhost:3000/prescriptions) |
| Lab reports | Patients | [localhost:3000/lab-reports](http://localhost:3000/lab-reports) |
| Doctor dashboard | Doctors | [localhost:3000/dashboard](http://localhost:3000/dashboard) |
| Add lab reports | Doctors | [localhost:3000/lab](http://localhost:3000/lab) |
| Admin dashboard | Hospital admins | [localhost:3000/admin](http://localhost:3000/admin) |
| Add a doctor | Hospital admins | [localhost:3000/admin/doctors/new](http://localhost:3000/admin/doctors/new) |
| Database check | Developers | [localhost:3000/api/health](http://localhost:3000/api/health) |
## Author

Shruti Sharma

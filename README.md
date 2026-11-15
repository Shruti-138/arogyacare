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
## Sample accounts

Running `npx tsx prisma/seed.ts` creates these accounts for local testing. All of them use the password `Password@123`.

| Email | Role |
|---|---|
| admin@arogyacare.test | Hospital admin |
| neha.sharma@arogyacare.test | Doctor (Cardiology) |
| rahul.verma@arogyacare.test | Doctor (Dermatology) |
| anil.mehta@arogyacare.test | Doctor (General Medicine) |
| shruti@arogyacare.test | Patient |

These accounts are for local development only. Never keep these passwords on a live website.

## Project structure

    arogyacare/
    |-- app/                 Pages of the website
    |   |-- components/      Header, footer, hero and other shared pieces
    |   |-- doctors/         Doctor list and doctor profile with booking
    |   |-- appointments/    Patient appointments
    |   |-- prescriptions/   Patient prescriptions
    |   |-- lab-reports/     Patient lab reports
    |   |-- lab/             Doctors add lab reports
    |   |-- dashboard/       Doctor dashboard
    |   |-- admin/           Admin dashboard and add-doctor form
    |   |-- login/           Sign in
    |   |-- register/        Patient sign up
    |   `-- api/health/      Database check
    |-- lib/                 Database, sessions, email, video rooms and helpers
    |   `-- messages/        English, Hindi and Punjabi text
    |-- prisma/              Database schema, migrations and sample data
    |-- public/              Images
    `-- README.md
## Environment settings

The project reads these settings from a `.env` file. That file holds secrets, so it is never uploaded to GitHub. Copy `.env.example` to `.env` and fill in your own values.

| Setting | Required | What it is |
|---|---|---|
| `DATABASE_URL` | Yes | Link to your PostgreSQL database |
| `SESSION_SECRET` | Yes | Long random text used to sign login cookies |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | No | Email server settings. Without them, emails are printed in the terminal instead of being sent |
| `MAIL_FROM` | No | The "from" address used in emails |

Make a random `SESSION_SECRET` with:

    node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

## Live demo

The website has not been deployed yet. A public link will be added here after deployment.
## Author

Shruti Sharma

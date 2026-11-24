import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const HOSPITALS = [
  {
    name: "Sunrise Multispeciality Hospital",
    city: "Chandigarh",
    address: "Sector 17",
    phone: "0172-0000001",
    doctors: [
      { name: "Dr. Priya Kapoor", email: "priya.kapoor@arogyacare.test", specialty: "Gynaecology", years: 10 },
      { name: "Dr. Arjun Singh", email: "arjun.singh@arogyacare.test", specialty: "Orthopaedics", years: 14 },
    ],
  },
  {
    name: "Green Valley Care Centre",
    city: "Amritsar",
    address: "Lawrence Road",
    phone: "0183-0000002",
    doctors: [
      { name: "Dr. Simran Kaur", email: "simran.kaur@arogyacare.test", specialty: "Pediatrics", years: 7 },
      { name: "Dr. Vikram Malhotra", email: "vikram.malhotra@arogyacare.test", specialty: "Neurology", years: 12 },
    ],
  },
];

async function main() {
  const password = process.env.NEW_DEMO_PASSWORD ?? "";
  if (password.length < 12) {
    throw new Error("NEW_DEMO_PASSWORD must be at least 12 characters.");
  }
  const passwordHash = await bcrypt.hash(password, 10);

  for (const h of HOSPITALS) {
    let hospital = await prisma.hospital.findFirst({ where: { name: h.name } });
    if (!hospital) {
      hospital = await prisma.hospital.create({
        data: { name: h.name, city: h.city, address: h.address, phone: h.phone },
      });
    }

    for (const d of h.doctors) {
      const user = await prisma.user.upsert({
        where: { email: d.email },
        update: {},
        create: {
          name: d.name,
          email: d.email,
          passwordHash,
          role: "DOCTOR",
          hospitalId: hospital.id,
          doctor: {
            create: {
              specialty: d.specialty,
              experienceYears: d.years,
              hospitalId: hospital.id,
            },
          },
        },
      });

      const doctor = await prisma.doctor.findUnique({ where: { userId: user.id } });
      if (!doctor) continue;

      const existing = await prisma.availability.count({
        where: { doctorId: doctor.id },
      });
      if (existing === 0) {
        await prisma.availability.createMany({
          data: [1, 2, 3, 4, 5].map((day) => ({
            doctorId: doctor.id,
            dayOfWeek: day,
            startTime: "10:00",
            endTime: "17:00",
            slotMinutes: 30,
          })),
        });
      }
    }
  }

  console.log("Hospitals:", await prisma.hospital.count());
  console.log("Doctors:", await prisma.doctor.count());
}

main()
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

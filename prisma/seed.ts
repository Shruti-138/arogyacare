import "dotenv/config";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const doctors = [
  { name: "Dr. Neha Sharma", email: "neha.sharma@arogyacare.test", specialty: "Cardiology", years: 8 },
  { name: "Dr. Rahul Verma", email: "rahul.verma@arogyacare.test", specialty: "Dermatology", years: 6 },
  { name: "Dr. Anil Mehta", email: "anil.mehta@arogyacare.test", specialty: "General Medicine", years: 12 },
];

async function main() {
  const passwordHash = await bcrypt.hash("Password@123", 10);

  let hospital = await prisma.hospital.findFirst({
    where: { name: "ArogyaCare City Hospital" },
  });
  if (!hospital) {
    hospital = await prisma.hospital.create({
      data: {
        name: "ArogyaCare City Hospital",
        address: "Model Town",
        city: "Ludhiana",
        phone: "0161-0000000",
      },
    });
  }

  await prisma.user.upsert({
    where: { email: "admin@arogyacare.test" },
    update: {},
    create: {
      name: "Hospital Admin",
      email: "admin@arogyacare.test",
      passwordHash,
      role: "ADMIN",
      hospitalId: hospital.id,
    },
  });

  for (const d of doctors) {
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

    const existing = await prisma.availability.count({ where: { doctorId: doctor.id } });
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

  await prisma.user.upsert({
    where: { email: "shruti@arogyacare.test" },
    update: {},
    create: {
      name: "Shruti Sharma",
      email: "shruti@arogyacare.test",
      passwordHash,
      role: "PATIENT",
      patient: { create: { phone: "9999999999", gender: "Female" } },
    },
  });

  console.log("Hospitals:", await prisma.hospital.count());
  console.log("Users:", await prisma.user.count());
  console.log("Doctors:", await prisma.doctor.count());
  console.log("Availability slots:", await prisma.availability.count());
  console.log("Patients:", await prisma.patient.count());
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
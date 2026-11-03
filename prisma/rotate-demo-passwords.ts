import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const EMAILS = [
  "admin@arogyacare.test",
  "neha.sharma@arogyacare.test",
  "rahul.verma@arogyacare.test",
  "anil.mehta@arogyacare.test",
  "shruti@arogyacare.test",
];

async function main() {
  const password = process.env.NEW_DEMO_PASSWORD ?? "";
  if (password.length < 12) {
    throw new Error("NEW_DEMO_PASSWORD must be at least 12 characters.");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const result = await prisma.user.updateMany({
    where: { email: { in: EMAILS } },
    data: { passwordHash },
  });
  console.log(`Updated ${result.count} sample accounts.`);
}

main()
  .catch((e) => {
    console.error(e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

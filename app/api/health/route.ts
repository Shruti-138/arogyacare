import { prisma } from "../../../lib/prisma";

export async function GET() {
  const hospitals = await prisma.hospital.count();
  const doctors = await prisma.doctor.count();
  return Response.json({ status: "database connected", hospitals, doctors });
}
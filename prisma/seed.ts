import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);
  await prisma.adminUser.upsert({
    where: { email: "admin@portfolio.com" },
    update: {},
    create: {
      email: "admin@portfolio.com",
      password: hashedPassword,
      name: "Admin",
    },
  });

  // Profile (single row, id = 1)
  await prisma.profile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Your Name",
      tagline: "Fullstack Developer",
      bio: "I build fast, scalable web applications.",
      email: "your@email.com",
    },
  });

  console.log("✅ Seed complete");
  console.log("   Admin email:    admin@portfolio.com");
  console.log("   Admin password: admin123");
  console.log("   ⚠️  Change the password after first login!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

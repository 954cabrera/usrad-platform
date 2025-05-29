// scripts/seed.ts
import { db } from '../src/lib/db';
import { users } from '../src/lib/schema';
import bcrypt from 'bcryptjs';

async function seedAdmin() {
  const email = 'mike@macworld.cc';
  const plainPassword = 'z8zJK6gH8KyY';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  await db.insert(users).values({
    email,
    hashed_password: hashedPassword,
    role: 'admin',
  });

  console.log('Admin user seeded');
}

seedAdmin().then(() => process.exit(0));

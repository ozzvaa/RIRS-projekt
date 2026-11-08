import 'dotenv/config'
import bcrypt from 'bcrypt'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma/client'

const databaseUrl = process.env.DATABASE_URL
const email = process.env.ADMIN_EMAIL!.trim().toLowerCase()
const password = process.env.ADMIN_PASSWORD

if (!databaseUrl || !email || !password) {
  throw new Error('Nastavi DATABASE_URL, ADMIN_EMAIL in ADMIN_PASSWORD v .env.')
}

const adapter = new PrismaPg({ connectionString: databaseUrl })
const prisma = new PrismaClient({ adapter })

async function main() {
  const gesloHash = await bcrypt.hash(password!, 12)

  await prisma.uporabnik.upsert({
    where: { email },
    update: { vloge: ['ADMIN'] },
    create: {
      email,
      gesloHash,
      vloge: ['ADMIN'],
    },
  })

  console.log(`Administratorski račun je pripravljen za ${email}.`)
}

main()
  .catch((error: unknown) => {
    console.error('Napaka pri ustvarjanju administratorskega računa:', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

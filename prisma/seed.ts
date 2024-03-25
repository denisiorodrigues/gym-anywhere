import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
const prisma = new PrismaClient()

async function main() {
  console.log('Users')

  const alice = await prisma.user.upsert({
    where: { email: 'alice@prisma.io' },
    update: {},
    create: {
      email: 'alice@prisma.io',
      name: 'Alice',
      password_hash: await hash('123321', 6),
      created_at : new Date()
    },
  })
  const bob = await prisma.user.upsert({
    where: { email: 'bob@prisma.io' },
    update: {},
    create: {
      email: 'bob@prisma.io',
      name: 'Bob',
      password_hash: await hash('123321', 6),
      created_at : new Date()
    },
  })
  console.log({ alice, bob })

  console.log('Check-ins')
  
  const topform = await prisma.gym.upsert({
    where: { id: 'abc' },
    update: {},
    create: {
      title: 'Top Form',
      description: 'Some description',
      phone: '1199999999',
      latitude: -3.7256625,
      longitude: -38.537535,
    },
  })

  const newGym = await prisma.gym.upsert({
    where: { id: 'abc' },
    update: {},
    create: {
      title: 'New Gym',
      description: 'Some description',
      phone: '1199999999',
      latitude: -3.7250784,
      longitude: -38.5657111,
    },
  })

  const rubyGym = await prisma.gym.upsert({
    where: { id: 'abc' },
    update: {},
    create: {
      title: 'Ruby Gym',
      description: 'Some description',
      phone: '1199999999',
      latitude: -3.7256625,
      longitude: -38.537535,
    },
  })
  
  console.log({topform, newGym, rubyGym})
  console.log('Check-ins')
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
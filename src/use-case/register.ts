import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisteruseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUserCase({
  name,
  email,
  password,
}: RegisteruseCaseRequest) {
  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('Email already exists!')
  }

  const password_hash = await hash(password, 6)

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
}

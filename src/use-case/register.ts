import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisteruseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUserCase {
  constructor(private usersRepository: any) {}

  async execute({ name, email, password }: RegisteruseCaseRequest) {
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new Error('Email already exists!')
    }

    const password_hash = await hash(password, 6)

    this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}

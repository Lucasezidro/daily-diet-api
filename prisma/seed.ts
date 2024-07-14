import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function seed() {
  await prisma.user.deleteMany()
  await prisma.snack.deleteMany()

  const user1 = await prisma.user.create({
    data: {
      email: 'lucas@acme.com',
      name: 'Lucas ezidro',
      password: await hash('123456', 6),
      objective: 'Perder peso',
    },
  })

  const user2 = await prisma.user.create({
    data: {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: await hash('123456', 6),
      objective: 'Ganhar musculatura',
    },
  })

  const user3 = await prisma.user.create({
    data: {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: await hash('123456', 6),
      objective: 'Ganhar peso, e musculutura',
    },
  })

  await prisma.user.create({
    data: {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      role: 'nutritionist',
      password: await hash('123456', 6),
      objective: 'Ganhar peso, e musculutura',
    },
  })

  await prisma.snack.createMany({
    data: [
      {
        name: 'Banana',
        description: faker.lorem.paragraph(),
        isPartOfTheDiet: true,
        userId: user1.id,
      },
      {
        name: 'X-tudo',
        description: faker.lorem.paragraph(),
        isPartOfTheDiet: false,
        userId: user1.id,
      },
      {
        name: 'Macarrão',
        description: faker.lorem.paragraph(),
        isPartOfTheDiet: false,
        userId: user1.id,
      },
      {
        name: 'Sorvete',
        description: faker.lorem.paragraph(),
        isPartOfTheDiet: false,
        userId: user1.id,
      },
      {
        name: 'Salada de tomate',
        description: faker.lorem.paragraph(),
        isPartOfTheDiet: true,
        userId: user1.id,
      },
    ],
  })

  await prisma.snack.createMany({
    data: [
      {
        name: 'Pizza de calabresa',
        description: faker.lorem.paragraph(),
        isPartOfTheDiet: false,
        userId: user2.id,
      },
      {
        name: 'Big mac',
        description: faker.lorem.paragraph(),
        isPartOfTheDiet: false,
        userId: user2.id,
      },
      {
        name: 'Lasanha',
        description: faker.lorem.paragraph(),
        isPartOfTheDiet: false,
        userId: user2.id,
      },
      {
        name: 'sushi',
        description: faker.lorem.paragraph(),
        isPartOfTheDiet: false,
        userId: user2.id,
      },
      {
        name: 'Ovos mexido',
        description: faker.lorem.paragraph(),
        isPartOfTheDiet: true,
        userId: user2.id,
      },
    ],
  })
  await prisma.snack.createMany({
    data: [
      {
        name: 'Frango grlhado',
        description: faker.lorem.paragraph(),
        isPartOfTheDiet: true,
        userId: user3.id,
      },
      {
        name: 'Arroz integral com file de peixe',
        description: faker.lorem.paragraph(),
        isPartOfTheDiet: true,
        userId: user3.id,
      },
      {
        name: 'Macarrao com molho branco e brocolis',
        description: faker.lorem.paragraph(),
        isPartOfTheDiet: true,
        userId: user3.id,
      },
      {
        name: 'Lanche burguer king',
        description: faker.lorem.paragraph(),
        isPartOfTheDiet: false,
        userId: user3.id,
      },
      {
        name: 'Salada Caeser',
        description: faker.lorem.paragraph(),
        isPartOfTheDiet: true,
        userId: user3.id,
      },
    ],
  })
}

seed().then(() => console.log('Database seeded!'))

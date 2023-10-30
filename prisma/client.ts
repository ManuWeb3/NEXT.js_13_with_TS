// the commented code below was the boilerplate to use prisma/client but it will cause errors in Development (Not Prod.)
/*
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default prisma
*/

//====================

import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
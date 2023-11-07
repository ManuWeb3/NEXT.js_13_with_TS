// create a new user = POST

import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcrypt'

export async function POST(request: NextRequest) {
  // now, body contains email and password credentisla that user entered
  const body = await request.json() // parsing JSON to JS Object = body

  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(5), // can add more rules here itself
  })

  const validation = schema.safeParse(body)

  // Check # 1: (SCHEMA/FORMAT CHECK)
  if (!validation.success)
    // user failed to follow the rules here for either or both of the email and pwd
    return NextResponse.json(validation.error.errors)

  // Check # 2: (PRESENCE of user CHECK)
  // using prisma to return a "unique" user
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
    },
  })

  if (user)
    // truthy = already exists
    return NextResponse.json(
      { error: 'User with this email id already exists' },
      { status: 400 }
    )

  // Check # 3: (CREATE USER), finally
  // part 1 - bcrypt for hashing
  const hashedPassword = await bcrypt.hash(body.password, 10) // salt/rounds: the higher, the more secure
  // part 2 - actually create user - create()
  const newUser = await prisma.user.create({
    data: {
      // 2 columns in my DB: email and hashedPwd
      email: body.email,
      hashedPassword, // short ES6 convention Or hashedPassword: hashedPassword
    },
  })
  // just a formality to comfort the user that its "account" has been created in our DB (via Prisma)
  return NextResponse.json({ email: newUser.email }, { status: 201 })
}

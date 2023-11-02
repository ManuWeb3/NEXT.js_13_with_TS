// GET (all, Not specific "id") + POST

// no rafec here, bcz no React Component
// it's a Request Handler fn. this time

// similarly, refactor PUT using zod
import { NextRequest, NextResponse } from 'next/server'
import schema from './schema'
import prisma from '@/prisma/client'

// despite not using "request" object, keep it.
// if removed, next.js 13 will cache the response
// next time, we hit the endpoint, it will return the cached response only.
export async function GET(request: NextRequest) {
  /* sample hardcoded data
  return NextResponse.json([
    { id: 1, name: 'Manu' },
    { id: 2, name: 'Kapoor' },
  ])
  */

  // actual data from MySQL Server 8.2 database
  // findMany = GET all (no [id])
  const users = await prisma.user.findMany()
  // can filter the data to tbe fetched from the database basis some logical conditionals (prisma-docs)
  return NextResponse.json(users)
}
// Testing POST with POSTman (not poss. on browsers)
// inside /users, NOT /[id]
export async function POST(request: NextRequest) {
  const body = await request.json() // .json() is of JS -> Promise
  // ideally, real-app, validation of Request Body (coming form client)
  // If valid, return data, else error 400 (Client-side code = Bad Request)
  // if a user/client sent a bad data in the request (body), then client-side error = 400

  // Level # 1 check: request-body valid Or not

  // if (!body.name)
  const validation = schema.safeParse(body) // parse yells for an error whereas safeParse doesn't + schema test gets applied on "body"
  if (!validation.success)
    return NextResponse.json(
      // { error: 'Valid name is required' }, commented to let zod take care of the errors
      validation.error.errors,
      { status: 400 } // 400 = Bad Request
    )

  // Level # 2 check: if Not a Bad Request, is emial id duplicate?

  // check whether a user with this email id already exists, using GET
  const user = await prisma.user.findUnique({
    where: {
      email: body.email, // 1st "email" = DB column
    },
  })

  if (user)
    return NextResponse.json({ error: 'User already exists' }, { status: 400 })

  // Finally, create the data in DB with the new user, when both the above checks passed

  const newUser = await prisma.user.create({
    data: {
      // explicitly extract properties out of pasred "body" JS object
      // id = auto, regAt = now(), 2 default values -> total 6 done for the next-row where data is being created in DB
      name: body.name,
      email: body.email,
    },
  })
  return NextResponse.json(newUser, { status: 201 }) // .json() is of NextJS response -> NO Promise
}

/*return NextResponse.json(body)
}*/

// 201 = Created
// { id: 1, name: body.name } = JS Object, Not JSON

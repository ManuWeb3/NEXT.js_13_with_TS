// GET (specific) + PUT + PATCH + DELETE

import { NextRequest, NextResponse } from 'next/server'
import schema from '../schema'
import prisma from '@/prisma/client'

// despite not using "request" object, keep it.
// if removed, next.js 13 will cache the response
// next time, we hit the endpoint, it will return the cached response only.
// GET takes 2 onjects as input params
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } } // string, bcz part of url (segment) is treated as string
) {
  // validations on what user sent in the id (no need to check the Req. Body)
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    // it seems 1st "id" should match the column name of the table, based on user model in schema.prisma
    // params.id is as usual
    // parsing the string "id" as a number here bcz schema.prisma-model defines "id" as an Int
  })

  // if (params.id > 10)
  if (!user)
    return NextResponse.json(
      { error: `User With ID: ${params.id} Not Found` },
      { status: 404 }
    )

  return NextResponse.json(user) // hardcoded value replaced by "user"
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // request => you'll get body
  // params: params.id => id
  // any and every validation can be applied onto either/both
  const body = await request.json()
  // if(!body.name)
  // Level # 1 check: whether "body" valid
  const validation = schema.safeParse(body)
  if (!validation.success)
    return NextResponse.json(
      // {error: "A Valid Name is Required"},
      validation.error.errors,
      { status: 400 }
    )

  // Level # 2 check: does user exist with this valid body.properties: name and email
  // this "user" object is aJS Object with all 6 properties present that correspond to each of the schema column
  // user.id, etc. is good
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  })

  if (!user)
    // else if(params.id > 10)
    return NextResponse.json(
      { error: `User with an Id ${params.id} Does Not Exist` },
      { status: 404 }
    )

  // All checks done, now update and return the updated User
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      // only update the 2 props, not all 6
      name: body.name, // not user.name as that returns older value, body.name is the updated one
      email: body.email, // not user.email as that returns older value, body.email is the updated one
    },
  })
  return NextResponse.json(updatedUser, { status: 201 })
}

// DELETE = no body(no body-check, no Level 1 check, no zod-schema), has an "id" = specific
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // only Level # 2 check: Check Id exists
  const user = await prisma.user.findUnique({
    where: { id: params.id },
  })

  // if(params.id > 10)
  if (!user)
    return NextResponse.json(
      { error: `User with an Id ${params.id} Does Not Exist` },
      { status: 404 }
    )

  const deletedUser = await prisma.user.delete({
    where: { id: user.id },
  })
  return NextResponse.json({}, { status: 200 })
  // default status code = 200 fr success of an api call
}

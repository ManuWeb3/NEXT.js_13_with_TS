// GET + POST

// no rafec here, bcz no React Component
// it's a Request Handler fn. this time

import { NextRequest, NextResponse } from 'next/server'

// despite not using "request" object, keep it.
// if removed, next.js 13 will cache the response
// next time, we hit the endpoint, it will return the cached response only.
export function GET(request: NextRequest) {
  return NextResponse.json([
    { id: 1, name: 'Manu' },
    { id: 2, name: 'Kapoor' },
  ])
}
// Testing POST with POSTman (not poss. on browsers)
// inside /users, NOT /[id]
export async function POST(request: NextRequest) {
  const body = await request.json() // .json() is of JS -> Promise
  // ideally, real-app, validation of request body (coming form client)
  // If valid, return data, else error 400 (Client-side code)
  // if a user/client sent a bad data in the request (body), then client-side error = 400
  if (!body.name)
    return NextResponse.json(
      { error: 'Valid name is required' },
      { status: 400 } // 400 = Bad Request
    )
  return NextResponse.json({ id: 1, name: body.name }, { status: 201 }) // .json() is of NextJS response -> NO Promise
}
// 201 = Created
// { id: 1, name: body.name } = JS Object, Not JSON

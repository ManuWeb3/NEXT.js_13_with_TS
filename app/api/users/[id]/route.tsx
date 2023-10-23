// GET (specific) + PUT + PATCH + DELETE

import { NextRequest, NextResponse } from 'next/server'
import schema from '../schema'

// despite not using "request" object, keep it.
// if removed, next.js 13 will cache the response
// next time, we hit the endpoint, it will return the cached response only.
// GET takes 2 onjects as input params
export function GET (
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // validations on what user sent in the id (no need to check the Req. Body)
  if (params.id > 10)
    return NextResponse.json({ error: `User With ID: ${params.id} Not Found` }, {status: 404})

  return NextResponse.json({ id: 1, name: 'Manu' })
}

export async function PUT( 
  request: NextRequest, 
  {params}:{params: {id: number}}
  ) {
    // request => you'll get body
    // params: params.id => id
    // any and every validation can be applied onto either/both
    const body = await request.json()
    // if(!body.name) 
    const validation = schema.safeParse(body)
    if(!validation.success)
      return NextResponse.json(
    // {error: "A Valid Name is Required"}, 
    validation.error.errors,
    {status: 400}
    )
    else if(params.id > 10)
      return NextResponse.json({error: `User Id ${params.id} Does Not Exist`}, {status: 404})
    else 
      return NextResponse.json({id: 1, name: body.name}, {status: 201})
}

// DELETE = no body, has an id
export async function DELETE(
  request: NextRequest, 
  {params}: {params: {id: number}}
  ) {
    // Validation: Check Id
    if(params.id > 10)
      return NextResponse.json({error: `User Id ${params.id} Does Not Exist`}, {status: 404})
    return NextResponse.json({})
}
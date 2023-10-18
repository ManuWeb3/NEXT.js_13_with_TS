// GET specific + PUT + PATCH

import { NextRequest, NextResponse } from 'next/server'

// despite not using "request" object, keep it.
// if removed, next.js 13 will cache the response
// next time, we hit the endpoint, it will return the cached response only.
export function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  if (params.id > 10)
    return NextResponse.json({ error: `User With ID: ${params.id} Not Found` })

  return NextResponse.json({ id: 1, name: 'Manu' })
}

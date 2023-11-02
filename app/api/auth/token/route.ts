// Only for learning about JWT (JSON object), not used in prod. app

import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request })
  return NextResponse.json(token)
}

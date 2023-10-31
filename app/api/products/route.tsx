// practice only, can add GET(id), PUT, PATCH, DELETE

// Entire script is commented until migration happens successfully and prisma/client does not go bad
/*
import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
    const products = await prisma.product.findMany()
    return NextResponse.json(products)
}

export async function POST(request: NextRequest) {
    const body = await request.json()
    // Level 1 check
    const validation = schema.safeParse(body)
    if(!validation.success)
        return NextResponse.json(validation.error.errors, {status: 400}) // validation failed = Bad Request = 400
    
    const product = await prisma.product.create({
        data: {
            name: body.name,
            price: body.price
        }
    })

    return NextResponse.json(product, {status: 201})
}
*/
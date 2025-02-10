import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const productsCount = await prisma.product.count();

    return NextResponse.json(productsCount);
  } catch (error) {
    console.error("Error fetching products count:", error);
  }
}

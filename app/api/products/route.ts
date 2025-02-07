import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const skip = parseInt(searchParams.get("skip") || "0");
  const take = parseInt(searchParams.get("take") || "5");

  try {
    const products = await prisma.product.findMany({
      orderBy: { id: "desc" },
      skip,
      take,
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" + error },
      { status: 500 },
    );
  }
}

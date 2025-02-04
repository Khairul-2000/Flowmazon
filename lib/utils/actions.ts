"use server";

import { redirect } from "next/navigation";
import prisma from "../db/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const addProduct = async (formData: FormData) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }
  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const category = formData.get("category")?.toString();
  const imageUrl = formData.get("imageURL")?.toString();
  const price = Number(formData.get("price") || 0);

  if (!name || !description || !imageUrl || !price || !category) {
    throw new Error("Missing required fields");
  }

  await prisma.product.create({
    data: {
      name,
      description,
      category,
      imageUrl,
      price,
    },
  });

  redirect("/");
};

export const searchProducts = (formData: FormData) => {
  const searchQuery = formData.get("searchQuery")?.toString();
  console.log(searchQuery);

  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  } else {
    redirect("/");
  }
};

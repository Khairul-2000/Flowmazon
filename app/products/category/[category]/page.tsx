import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import { cache } from "react";

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const getProducts = cache(async (category: string) => {
  const products = await prisma.product.findMany({
    where: {
      category: category.toLowerCase(),
    },
  });

  if (!products) {
    notFound();
  }

  return products;
});
const CategoryPage = async ({ params: { category } }: CategoryPageProps) => {
  const products = await getProducts(category);

  return (
    <div className="flex min-h-screen w-full flex-row items-start justify-start">
      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="text-6xl font-semibold">No Products found</div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;

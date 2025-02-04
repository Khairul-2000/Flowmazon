import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db/prisma";

interface SearchPageProps {
  searchParams: { query: string };
}

const page = async ({ searchParams: { query } }: SearchPageProps) => {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          category: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: {
      id: "desc",
    },
  });
  if (products.length === 0) {
    return <div>No Products found</div>;
  }
  return (
    <div className="grid min-h-screen grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default page;

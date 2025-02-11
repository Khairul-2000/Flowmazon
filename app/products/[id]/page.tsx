import PriceTag from "@/components/PriceTag";
import prisma from "@/lib/db/prisma";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import AddToCartButton from "./AddToCartButton";
import incrementProductQuntity from "./actions";
import ProductCard from "@/components/ProductCard";

interface ProductPageProps {
  params: {
    id: string;
  };
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  if (!product) {
    notFound();
  }

  return product;
});

const getSuggestProducts = cache(async (category: string, id: string) => {
  const products = await prisma.product.findMany({
    where: {
      NOT: {
        id,
      },
      category,
    },

    take: 4,
  });

  return products;
});

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id);

  return {
    title: `${product.name} - Flowmazon`,
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
}

const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await getProduct(id);
  const suggestedProducts = await getSuggestProducts(product.category, id);

  return (
    <div className="h-full p-4">
      <div className="flex flex-col gap-4 bg-white lg:flex-row lg:items-center">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={500}
          height={500}
          className="h-[500px] w-[500px] rounded-lg object-center"
          priority
        />
        <div>
          <h1 className="text-5xl font-bold">{product.name}</h1>
          <PriceTag price={product.price} className="mt-4" />
          <p className="py-6">{product.description}</p>
          <AddToCartButton
            productId={product.id}
            incrementProductQuantity={incrementProductQuntity}
          />
        </div>
      </div>

      <div className="my-10 h-full bg-white">
        <h4 className="w-full bg-gray-300 p-3 text-xl font-semibold">{`Ratings & Reviews of ${product.name} `}</h4>
        <div className="p-4">
          <p>⭐️⭐️⭐️⭐️</p>
          <p>Great product</p>
        </div>
        <div>
          <h4 className="w-full bg-gray-300 p-3 text-xl font-semibold">
            Add a review
          </h4>
          <form className="p-4">
            <textarea className="h-24 w-full" placeholder="Your review" />
            <button className="btn btn-primary">Submit</button>
          </form>
        </div>
        <div className="overflow-y-hidden">
          <h4 className="w-full bg-gray-300 p-3 text-xl font-semibold">
            Reviews && Comments
          </h4>
          <div></div>
          <div className="p-4">
            <span>🙍‍♂️</span>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="p-4">
            <span>🙍‍♂️</span>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="p-4">
            <span>🙍‍♂️</span>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="p-4">
            <span>🙍‍♂️</span>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
          <div className="p-4">
            <span>🙍‍♂️</span>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
      </div>

      {suggestedProducts.length ? (
        <div className="my-10 w-full">
          <h4 className="text-2xl">You may also like</h4>
          <div className="grid grid-cols-4 gap-4">
            {suggestedProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductPage;

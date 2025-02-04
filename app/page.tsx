// import PaginationBar from "@/components/PaginationBar";
import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";
import { categorys } from "@/lib/utils/category";

import ImageSlider from "@/components/ImageSlider";

// interface HomeProps {
//   searchParams: { page: string };
// }

/*


{
  searchParams: { page = "1" },
}: HomeProps
*/

export default async function Home() {
  // const currentPage = parseInt(page);

  // const pageSize = 6;

  // const heroItemCount = 1;

  // const totalItemCount = await prisma.product.count();

  // const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);
  // console.log(page);

  const products = await prisma.product.findMany({
    orderBy: {
      id: "desc",
    },
    // skip:
    //   (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    // take: pageSize + (currentPage === 1 ? 1 : 0),
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center gap-2">
        <ImageSlider />
      </div>
      <div className="my-5 w-full">
        <h4 className="my-2 text-xl font-semibold">Flash Sale</h4>
        <div className="bg-white">
          <div className="flex w-full flex-row items-center justify-between p-2">
            <h4 className="font-semibold text-orange-600">On Sale Now</h4>
            <button className="border border-orange-600 p-1 font-semibold text-orange-600">
              Show All Products
            </button>
          </div>
          <hr className="my-2" />
          <div className="flex flex-row items-center justify-around">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      <div className="my-5 w-full">
        <h4 className="my-6 text-2xl">Categories</h4>
        <div className="grid grid-cols-8 items-center justify-center gap-0">
          {categorys.map((category) => (
            <Link
              href={`/products/category/${category.category}`}
              key={category.category}
            >
              <div
                className="flex h-[150px] w-[150px] cursor-pointer flex-col items-center justify-center rounded-md bg-white hover:scale-105"
                key={category.category}
              >
                <Image
                  src={category.image}
                  alt={category.category}
                  width={200}
                  height={200}
                  key={category.category}
                  className="h-[100px] w-[100px] rounded-md"
                />
                <p>{category.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full">
        <h4 className="my-5 text-2xl">New Arrivals</h4>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      {/* <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div> */}
      {/* <PaginationBar currentPage={currentPage} totalPages={totalPages} /> */}
    </div>
  );
}

import { Product } from "@prisma/client";
import Link from "next/link";
import PriceTag from "./PriceTag";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;
  return (
    <div className="flex h-[300px] w-[200px] flex-col items-start justify-start overflow-scroll bg-white">
      <Link href={"/products/" + product.id}>
        <figure>
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={200}
            height={200}
            className="h-[200px] w-[200px]"
          />
        </figure>
        <div className="mt-2 overflow-hidden pl-2">
          <h2 className="text-sm font-semibold">{product.name}</h2>
          {isNew && <div className="">NEW</div>}

          <PriceTag price={product.price} />
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;

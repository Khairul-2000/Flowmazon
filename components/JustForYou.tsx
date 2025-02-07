"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const JustForYou = () => {
  const [products, setProducts] = useState([]);

  const [count, setCount] = useState(0);
  const take = 5;

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `/api/products?skip=${count === 0 ? 0 : take * count}&take=${take}`,
      );
      const newProducts = await res.json();

      if (newProducts && newProducts.length) {
        setProducts([...products, ...newProducts]);
      }

      console.log("New products:", newProducts);

      console.log("Fetched products:", products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [count]);

  return (
    <div className="my-6 flex flex-col items-start gap-3">
      <h4 className="text-2xl">Just For You</h4>
      <div className="grid grid-cols-5 gap-5">
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
        className="border-[2px] border-green-300 p-2 text-2xl text-green-600"
      >
        Load More
      </button>
    </div>
  );
};

export default JustForYou;

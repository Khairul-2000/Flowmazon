"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const JustForYou = () => {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const take = 5;

  const fetchProductsCount = async () => {
    try {
      const res = await fetch("/api/counts");
      const count = await res.json();
      setProductsCount(count);
    } catch (error) {
      console.log("Error fetching products count:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        `/api/products?skip=${count === 0 ? 0 : take * count}&take=${take}`,
      );
      const newProducts = await res.json();

      if (newProducts && newProducts.length) {
        setProducts([...products, ...newProducts]);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchProductsCount();
  }, [count]);

  return (
    <div className="mt-6">
      <h4 className="text-2xl">Just For You</h4>
      <div className="my-6 flex flex-col items-center gap-3">
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
            setLoading(true);
          }}
          className="w-[400px] border border-blue-700 p-1 text-2xl text-blue-600"
        >
          {loading && productsCount < 8 ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default JustForYou;

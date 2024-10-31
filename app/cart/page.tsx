import { getCart } from "@/lib/utils/cart";
import { Metadata } from "next";
import CartEntry from "./CartEntry";
import setProductQuantity from "./actions";
import { formatPrice } from "@/lib/utils/format";

export const metadata: Metadata = {
  title: "Shopping Cart - Flowmazon",
};

const Cartpage = async () => {
  const cart = await getCart();
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      {cart?.items.map((item) => (
        <CartEntry
          key={item.id}
          cartItem={item}
          setProductQuantity={setProductQuantity}
        />
      ))}
      {!cart?.items.length && <p>Your cart is empty.</p>}
      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total: {formatPrice(cart?.subTotal || 0)}
        </p>
        <button className="btn btn-primary sm:w-[200px]">Checkout</button>
      </div>
    </div>
  );
};

export default Cartpage;

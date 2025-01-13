"use client";

import Link from "next/link";
import React from "react";
import { formatPrice } from "@/lib/utils/format";

const PaymentButton = ({ session, cart }) => {
  const user = session?.user;
  const cartAmount = formatPrice(cart?.subTotal || 0);
  console.log(cartAmount);
  return (
    <div onClick={() => "/payment"}>
      <button className="btn btn-primary sm:w-[200px]">
        <Link
          href={`${user ? `${cartAmount !== "$0.00" ? "/payment" : "/"}` : "/sign-in"}`}
        >
          Checkout
        </Link>
      </button>
    </div>
  );
};

export default PaymentButton;

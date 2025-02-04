"use client";

import Link from "next/link";
import React from "react";
import { formatPrice } from "@/lib/utils/format";

const PaymentButton = ({ session, cart }) => {
  const user = session?.user;
  const cartAmount = formatPrice(cart?.subTotal || 0);

  return (
    <div onClick={() => "/payment"}>
      <Link
        href={`${user ? `${cartAmount !== "$0.00" ? "/payment" : "/"}` : "/sign-in"}`}
      >
        <button className="btn btn-primary sm:w-[200px]">Checkout</button>
      </Link>
    </div>
  );
};

export default PaymentButton;

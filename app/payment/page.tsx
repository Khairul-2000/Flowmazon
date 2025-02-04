"use client";

import CheckoutPage from "@/components/CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
);

const Payment = () => {
  return (
    <div>
      <main className="m-10 mx-auto max-w-6xl rounded-md border bg-gradient-to-tr from-blue-500 to-purple-500 p-10 text-center text-white">
        <div>
          <h1 className="mb-2 text-4xl font-extrabold">xyx</h1>
          <h2 className="text-2xl">has requested</h2>
          <span className="font-bold">xyz</span>
        </div>
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: 1000,
            currency: "usd",
          }}
        >
          <CheckoutPage amount={30} />
        </Elements>
      </main>
    </div>
  );
};

export default Payment;

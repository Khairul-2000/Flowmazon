"use client";

import { signIn } from "next-auth/react";
import { ComponentProps, PropsWithChildren, useState } from "react";

type SignInButtonProps = {
  children: PropsWithChildren;
} & ComponentProps<"button">;

const SignInButton = ({ children }: SignInButtonProps) => {
  const [isPending, setIsPending] = useState<boolean>(false);
  return (
    <button
      disabled={isPending}
      onClick={() => {
        setIsPending(true);
        signIn("google", { callbackUrl: "/" });
      }}
      className="btn btn-primary w-full"
    >
      {isPending && <span className="loading loading-spinner"></span>}
      {children}
    </button>
  );
};

export default SignInButton;

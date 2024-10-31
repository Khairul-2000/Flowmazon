"use client";

import { ComponentProps, PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

type FormSubmitButtonProps = {
  children: PropsWithChildren;
  className?: string;
} & ComponentProps<"button">;

const FormSubmitButton = ({ children, className }: FormSubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <button
      className={`btn btn-primary ${className}`}
      type="submit"
      disabled={pending}
    >
      {pending && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
};

export default FormSubmitButton;

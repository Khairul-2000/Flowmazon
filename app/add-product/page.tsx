import FormSubmitButton from "@/components/FormSubmitButton";
import { addProduct } from "@/lib/utils/actions";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Add Product - Flowmazon",
  description: "We make your wallet cry",
};

const AddProductPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }
  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Add Product</h1>
      <form action={addProduct}>
        <input
          type="text"
          required
          name="name"
          placeholder="Name"
          className="input input-bordered mb-3 w-full"
        />
        <textarea
          name="description"
          required
          placeholder="Description"
          className="textarea textarea-bordered mb-3 w-full"
        ></textarea>

        <input
          type="url"
          required
          name="imageURL"
          placeholder="imageURL"
          className="input input-bordered mb-3 w-full"
        />
        <input
          type="number"
          required
          name="price"
          placeholder="Price"
          className="input input-bordered mb-3 w-full"
        />

        <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
      </form>
    </div>
  );
};

export default AddProductPage;

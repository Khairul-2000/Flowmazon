import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { searchProducts } from "@/lib/utils/actions";
import { getCart } from "@/lib/utils/cart";
import ShoppingCartButton from "./ShoppingCartButton";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { CiSearch } from "react-icons/ci";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const cart = await getCart();
  return (
    <div className="bg-red-500 text-white">
      <div className="navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl normal-case">
            <Image src={logo} alt="Flowmazon logo" width={40} height={40} />
            Flowmazon
          </Link>
        </div>
        <div className="flex flex-row justify-between bg-white p-2">
          <form action={searchProducts}>
            <div className="form-control">
              <input
                type="text"
                name="searchQuery"
                placeholder="Search in Flowmazon"
                className="w-[600px] min-w-[100px] bg-transparent text-black outline-none"
              />
            </div>
          </form>
          <div>
            <CiSearch size={25} color="black" />
          </div>
        </div>
        <div className="flex-none gap-2">
          <ShoppingCartButton cart={cart} />
          <UserMenuButton session={session} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

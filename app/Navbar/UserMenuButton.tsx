"use client";

import { Session } from "next-auth";
import Image from "next/image";
import profilePicPlaceholder from "@/assets/profile-pic-placeholder.png";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface UserMenuButtonProps {
  session: Session | null;
}

const UserMenuButton = ({ session }: UserMenuButtonProps) => {
  const user = session?.user;
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-circle btn-ghost">
        {user ? (
          <Image
            src={user?.image || profilePicPlaceholder}
            alt="Profile Picture"
            width={32}
            height={32}
            className="w-10 rounded-full"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        )}
      </label>
      <ul
        tabIndex={0}
        className="menu dropdown-content menu-sm z-30 mt-3 w-32 rounded-box bg-base-100 shadow"
      >
        <li>
          {user ? (
            <button
              className="text-black"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Sign Out
            </button>
          ) : (
            <Link href="/sign-in" className="text-black">
              Sign In
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};

export default UserMenuButton;

"use client";
import Link from "next/link";
import React from "react";
import { useUser } from "@clerk/nextjs";
import useCartStore from "../../../stores/cart-store";
import Cart from "../icons/Cart";

function Header() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { cartItems } = useCartStore();
  return (
    <header className="flex justify-between items-center">
      <nav className="flex text-gray-500 gap-6 items-center">
        <Link className="text-xl font-semibold text-red-500" href={"/"}>
          ST PIZZA
        </Link>
        <Link href={"/"}>Home</Link>
        <Link href={""}>Menu</Link>
        <Link href={""}>About</Link>
        <Link href={""}>Contact</Link>
      </nav>
      <nav className="flex gap-4 items-center text-gray-400 font-semibold">
        {isSignedIn ? (
          <>
            <p>Hello {user.firstName} </p>
            <Link
              className="px-6 py-2 rounded-full text-white bg-red-500"
              href={"/account/profile"}
            >
              Your Account
            </Link>

            <Link href={"/cart"} className="flex gap-1 indicator">
              <span className="indicator-item badge badge-secondary">
                {cartItems.length}{" "}
              </span>
              <Cart />
            </Link>
          </>
        ) : (
          <>
            <Link href={"/sign-in"}>Login</Link>
            <Link
              className="px-6 py-2 rounded-full text-white bg-red-500"
              href={"/sign-up"}
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;

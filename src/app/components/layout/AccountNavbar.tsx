"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const navbardata = [
  {
    name: "Profile",
    link: "/account/profile",
  },
  {
    name: "Categories",
    link: "/account/categories",
  },
  {
    name: "Menu Items",
    link: "/account/menuItems",
  },
];

const AccountNavbar = () => {
  let pathName = usePathname();
  return (
    <div className="flex gap-2 mt-10 mb-4 justify-center">
      {navbardata.map((d, index) => {
        return (
          <Link key={index} href={d.link}>
            <div
              className={`badge badge-lg ${
                pathName === d.link ? "text-white" : "badge-outline"
              } badge-accent`}
            >
              {" "}
              {d.name}{" "}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default AccountNavbar;

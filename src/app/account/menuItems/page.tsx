import React from "react";
import prisma from "../../../utils/db";
import MenuItemCard from "../../components/menu/MenuItemCard";
import Right from "../../components/icons/Right";
import Link from "next/link";

const page = async () => {
  const menuItems = await prisma.menuItem.findMany();
  console.log(menuItems);
  return (
    <div>
      <Link
        href="/account/menuItems/createMenuItem"
        className="flex gap-2 items-center w-full btn btn-outline mb-10"
      >
        Create a new Menu Item <Right />{" "}
      </Link>

      <h2>Edit Menu Items :</h2>

      <div className="grid grid-cols-3 gap-2 flex-wrap">
        {menuItems.map((menu, index) => {
          return <MenuItemCard key={index} item={menu} />;
        })}
      </div>
    </div>
  );
};

export default page;

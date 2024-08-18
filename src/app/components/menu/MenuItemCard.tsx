import Link from "next/link";
import React from "react";

const MenuItemCard = ({ item }) => {
  return (
    <Link
      href={`/account/menuItems/${item.id}`}
      className="bg-gray-200 p-4 rounded-md text-center hover:bg-white transition-all flex flex-col justify-between"
    >
      <div className="text-center">
        <img
          src={item.image}
          className="max-h-48 rounded-xl object-cover w-full block mx-auto"
          alt="pizza"
        />
      </div>
      <h4 className="my-3 font-semibold text-xl uppercase">{item.name} </h4>
    </Link>
  );
};

export default MenuItemCard;

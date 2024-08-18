"use client";
import React, { useState } from "react";
import { MenuItemType } from "../../../utils/types";
import useCartStore from "../../../stores/cart-store";
import toast from "react-hot-toast";

function MenuItem({ item }: { item: MenuItemType }) {
  const { addToCart, cartItems } = useCartStore();
  const [quantity, setQuantity] = useState(null);

  const handleClick = () => {
    if (!quantity || quantity === 0) {
      toast.error("Enter Quantity");
      return;
    }

    addToCart({ ...item, quantity: quantity });
    console.log(cartItems);
    toast.success("Added to Cart!");
  };

  return (
    <div className="bg-red-50 p-4 rounded-md text-center transition-all">
      <div className="text-center">
        <img
          src={item.image}
          className="object-cover h-48 rounded-xl w-full block mx-auto"
          alt="pizza"
        />
      </div>
      <h4 className="my-3 font-semibold text-xl"> {item.name} </h4>
      <p className="text-sm mt-2 text-gray-500">{item.description}</p>

      <input
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        type="number"
        className="input h-10 mt-4 -mb-2"
        placeholder="Enter Quantity"
      />

      <button
        onClick={handleClick}
        className="bg-red-500 text-white px-8 py-2 rounded-full mt-4 hover:bg-red-600"
      >
        Add to cart ${item.basePrice}
      </button>
    </div>
  );
}

export default MenuItem;

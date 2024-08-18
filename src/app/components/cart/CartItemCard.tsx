"use client";
import React from "react";
import { CartItemType } from "../../../utils/types";
import useCartStore from "../../../stores/cart-store";

const CartItemCard = ({ item }: { item: CartItemType }) => {
  const { removeFromCart } = useCartStore();
  return (
    <div className="card card-side bg-base-100">
      <figure>
        <img
          className="h-40 w-40 rounded-xl object-contain"
          src={item.image}
          alt="Movie"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.name}</h2>
        <p>
          <span className="font-semibold">Quantity: </span> {item.quantity}{" "}
        </p>
        <div className="w-full gap-2 flex flex-row">
          <button className="btn btn-primary flex-1">
            {" "}
            $ {item.basePrice}{" "}
          </button>
          <button
            onClick={() => removeFromCart(item.id)}
            className="btn btn-warning flex-1"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItemCard;

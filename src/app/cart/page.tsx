"use client";
import React from "react";
import SectionHeaders from "../components/layout/SectionHeaders";
import useCartStore from "../../stores/cart-store";
import CartItemCard from "../components/cart/CartItemCard";
import CartCheckout from "../components/cart/CartCheckout";

const page = () => {
  const { cartItems } = useCartStore();
  let totalPrice = cartItems.reduce((total, cartItem) => {
    return total + parseInt(cartItem.basePrice) * cartItem.quantity;
  }, 0);
  return (
    <>
      <div className="text-center mb-10 mt-10">
        <SectionHeaders subHeader={""} mainHeader={"Cart"} />
      </div>
      <div className="w-full h-10 mt-10 grid grid-cols-2 gap-2">
        <div className="w-full flex flex-col gap-4 overflow-y-scroll">
          {cartItems.map((cartItem, index) => {
            return <CartItemCard item={cartItem} key={index} />;
          })}
        </div>

        <CartCheckout />
        {totalPrice > 0 && (
          <div className="w-full">
            <h1 className="text-md font-semibold">
              SubTotal : <span className="font-bold"> $ {totalPrice} </span>{" "}
            </h1>
            <h1 className="text-md font-semibold">
              Delivery Charges : <span className="font-bold"> $ 5 </span>{" "}
            </h1>
            <h1 className="text-md font-semibold">
              SubTotal : <span className="font-bold"> $ {totalPrice + 5} </span>{" "}
            </h1>
          </div>
        )}
      </div>
    </>
  );
};

export default page;

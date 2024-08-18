import Image from "next/image";
import React from "react";
import Right from "../icons/Right";

function Hero() {
  return (
    <section className="hero">
      <div className="py-8">
        <h1 className="text-4xl font-semibold leading-12">
          Everything is better with a <span className="text-red-500">Pizza</span>
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          {" "}
          Pizza is the missing piece that makes every day complete, a simple yet
          delicious joy in life.
        </p>
        <div className="flex gap-4 items-center">
          <button className="flex gap-2 bg-red-500 text-white px-4 py-2 rounded-full">
            Order Now <Right />
          </button>
          <button className="flex gap-2 py-2 text-gray-600 rounded-full">
             Learn more<Right />
          </button>
        </div>
      </div>
      <div className="relative">
        <Image layout="fill" objectFit="contain" src="/pizza.png" />
      </div>
    </section>
  );
}

export default Hero;

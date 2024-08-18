"use client";
import React, { useEffect, useState } from "react";
import { UserType } from "../../../utils/types";
import { useUser } from "@clerk/nextjs";
import { getUserServerAction } from "../../actions/user";

const CartCheckout = () => {
  const [profile, setProfile] = useState<UserType | null>(null);
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    const fetchUser = async (email: string) => {
      const fetchedUser = await getUserServerAction(email);
      setProfile(fetchedUser);
    };
    if (isSignedIn) {
      fetchUser(user.emailAddresses[0].emailAddress);
    }
  }, [isLoaded, isSignedIn]);

  return (
    <div className="bg-red-50 p-4 rounded-xl">
      <h1 className="text-lg font-semibold">Checkout</h1>

      <form className="mt-2" action="">
        <label className="form-control w-full max-w-lg">
          <span className="label-text -mb-3 font-normal">Mobile Number</span>
          <input
            type="text"
            placeholder="Type here"
            name="mobile-no"
            className="input input-bordered w-full max-w-lg"
          />
        </label>

        <label className="form-control w-full max-w-lg">
          <span className="label-text -mb-3 font-normal">Street Address</span>
          <input
            type="text"
            placeholder="Type here"
            name="address"
            defaultValue={profile?.address}
            className="input input-bordered w-full max-w-lg"
          />
        </label>

        <div className="flex gap-2">
          <label className="form-control w-full max-w-lg">
            <span className="label-text -mb-3 font-normal">Postal Code</span>
            <input
              type="text"
              placeholder="Type here"
              name="postal-code"
              defaultValue={profile?.pincode}
              className="input input-bordered w-full max-w-lg"
            />
          </label>
          <label className="form-control w-full max-w-lg">
            <span className="label-text -mb-3 font-normal">City</span>
            <input
              type="text"
              placeholder="Type here"
              name="city"
              className="input input-bordered w-full max-w-lg"
              defaultValue={profile?.city}
            />
          </label>
        </div>
        <label className="form-control w-full max-w-lg">
          <span className="label-text -mb-3 font-normal">Country</span>
          <input
            type="text"
            placeholder="Type here"
            name="country"
            className="input input-bordered w-full max-w-lg"
          />
        </label>

        <button className="hover:bg-red-600" type="submit">
          Pay
        </button>
      </form>
    </div>
  );
};

export default CartCheckout;

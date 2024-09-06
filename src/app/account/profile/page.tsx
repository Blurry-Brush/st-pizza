"use client";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { motion } from "framer-motion";
import { UploadButton } from "../../../utils/uploadthing";
import {
  createUserServerAction,
  getUserServerAction,
  updateUserServerAction,
} from "../../actions/user";
import { UserType } from "../../../utils/types";
import toast from "react-hot-toast";
import Loading from "../../components/layout/Loading";

const Page = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [profile, setProfile] = useState<UserType | null>(null);

  useEffect(() => {
    const bruh = async (email: string) => {
      setLoading(true);
      const fetchedUser = await getUserServerAction(email);
      console.log("fetched nigga", fetchedUser);
      if (!fetchedUser) {
        const data = {
          first_name: user.firstName,
          last_name: user.lastName,
          email: user.emailAddresses[0].emailAddress,
          profile_pic: user.imageUrl,
          address: "",
          pincode: "",
          city: "",
        };

        const res = await createUserServerAction(data);
        setProfile(res);
        setImageUrl(res.profile_pic);
        console.log("created nigga", res);
        setLoading(false);
        return;
      }

      setProfile(fetchedUser);
      setImageUrl(fetchedUser.profile_pic);
      setLoading(false);
      return;
    };

    if (isSignedIn) {
      let email = user.emailAddresses[0].emailAddress;
      bruh(email as string);
    }
  }, [isLoaded, isSignedIn]);

  useEffect(() => {
    if (isLoaded && user && user.hasImage && imageUrl === "") {
      setImageUrl(user.imageUrl);
    }
  }, [isLoaded]);

  const handleUploadComplete = async (res: any) => {
    setImageUrl(res[0].url);
  };

  if (!isSignedIn || !isLoaded) {
    return <Loading />;
  }

  const updateProfileClientAction = async (formData: FormData) => {
    // console.log("hello");
    const data = {
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      address: formData.get("address") as string,
      pincode: formData.get("pincode") as string,
      profile_pic: imageUrl,
      email: user.emailAddresses[0].emailAddress as string,
      city: formData.get("city") as string,
    };
    await updateUserServerAction(data, user.emailAddresses[0].emailAddress);
    toast.success("Updated profile successfully");
    console.log(data);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-3xl text-orange-600 text-center mt-2 font-semibold">
        Profile
      </h1>

      <div className="flex justify-center mt-10 gap-16">
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{
            delay: 0.1,
            stiffness: 70,
            type: "spring",
          }}
          className="space-y-2 flex flex-col items-start"
        >
          <Image
            className="rounded-xl object-cover"
            src={imageUrl}
            alt="profile_pic"
            height={150}
            width={150}
          />
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={handleUploadComplete}
          />
        </motion.div>

        <motion.form
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{
            delay: 0.1,
            stiffness: 70,
            type: "spring",
          }}
          action={updateProfileClientAction}
        >
          <div className="flex flex-col w-[80%]">
            <div className="flex gap-4 w-full">
              <input
                className="input flex-1"
                placeholder="First Name"
                type="text"
                name="first_name"
                defaultValue={profile?.first_name || ""}
              />
              <input
                className="input flex-1"
                placeholder="Last Name"
                type="text"
                name="last_name"
                defaultValue={profile?.last_name || ""}
              />
            </div>

            <textarea
              placeholder="Address"
              name="address"
              defaultValue={profile?.address || ""}
              className="w-full textarea textarea-bordered"
            ></textarea>

            <input
              type="text"
              placeholder="Email"
              name="email"
              className="input input-bordered"
              disabled
              defaultValue={profile?.email || ""}
            />
            <div className="flex gap-4 w-full">
              <input
                className="input flex-1"
                defaultValue={profile?.pincode || ""}
                placeholder="Pincode"
                name="pincode"
                type="text"
              />
              <input
                className="input flex-1"
                name="city"
                defaultValue={profile?.city || ""}
                placeholder="City"
                type="text"
              />
            </div>

            <button type="submit" className="btn bg-red-500 text-white">
              Edit Profile
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default Page;

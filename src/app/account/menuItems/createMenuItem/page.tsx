"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { UploadButton } from "../../../../utils/uploadthing";
import {
  createMenuItemServerAction,
  getCategoriesServerAction,
} from "../../../actions/menu-actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface CategoryType {
  id: string;
  category: string;
  createdAt: Date;
}

const page = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [categories, setCategories] = useState<CategoryType[] | []>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategoriesServerAction();
      setCategories(data);
      return;
    };

    fetchCategories();
  }, []);

  const createNewMenuItemClientAction = async (formData: FormData) => {
    const itemName = formData.get("item-name");
    const category = formData.get("item-category");
    const itemDescription = formData.get("item-description");
    const basePrice = formData.get("item-price");

    if (!itemName || !category || !itemDescription || !basePrice || !imageUrl) {
      console.log("nigga");
      toast.error("Please provide all the details");
      return;
    }

    let data = {
      name: itemName as string,
      image: imageUrl as string,
      description: itemDescription as string,
      category: category as string,
      basePrice: basePrice as string,
    };
    await createMenuItemServerAction(data);
    toast.success("Menu Item Successfully created");
    router.push("/account/menuItems");
  };

  const handleUploadComplete = (res: any) => {
    setImageUrl(res[0].url);
  };
  return (
    <div className="w-full">
      <h1 className="text-3xl text-orange-600 text-center mt-2 font-semibold">
        Create an Menu Item
      </h1>

      <div className="flex justify-center mt-10 gap-16 w-full">
        <div className="space-y-2 flex flex-col items-start">
          {imageUrl && (
            <Image
              className="rounded-xl object-cover"
              src={imageUrl}
              alt="profile_pic"
              height={150}
              width={150}
            />
          )}
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={handleUploadComplete}
          />
        </div>

        <form
          className="flex-1 flex-col"
          action={createNewMenuItemClientAction}
        >
          <label className="form-control w-full max-w-lg">
            <span className="label-text -mb-3 font-normal">Item Name</span>
            <input
              type="text"
              placeholder="Type here"
              name="item-name"
              className="input input-bordered w-full max-w-lg"
            />
          </label>
          <label className="form-control w-full max-w-lg">
            <span className="label-text -mb-3 font-normal">Description</span>
            <input
              type="text"
              placeholder="Type here"
              name="item-description"
              className="input input-bordered w-full max-w-lg"
            />
          </label>
          <label className="form-control w-full max-w-lg mb-4">
            <span className="label-text font-normal mb-1">Category</span>
            <select
              className="select select-bordered w-full max-w-lg"
              name="item-category"
            >
              <option disabled selected>
                Select a category
              </option>

              {categories.map((c: CategoryType) => {
                return (
                  <option
                    className="text-lg font-normal"
                    key={c.id}
                    value={c.category}
                  >
                    {" "}
                    {c.category}{" "}
                  </option>
                );
              })}
            </select>
          </label>

          <label className="form-control w-full max-w-lg">
            <span className="label-text -mb-3 font-normal">Base Price</span>
            <input
              type="text"
              placeholder="Type here"
              name="item-price"
              className="input input-bordered w-full max-w-lg"
            />
          </label>
          <button type="submit" className="btn w-fit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;

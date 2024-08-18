"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { UploadButton } from "../../../../utils/uploadthing";
import {
  getCategoriesServerAction,
  getMenuItemServerAction,
  updateMenuItemServerAction,
} from "../../../actions/menu-actions";
import { MenuItemType } from "../../../../utils/types";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";
interface CategoryType {
  id: string;
  category: string;
  createdAt: Date;
}

const page = ({ params }: { params: { id: string } }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [categories, setCategories] = useState<CategoryType[] | []>([]);
  const [menuItem, setMenuItem] = useState<MenuItemType | null>(null);
  const router = useRouter();

  const handleUploadComplete = (res: any) => {
    setImageUrl(res[0].url);
  };

  useEffect(() => {
    const fetchMenuItem = async () => {
      const data = await getMenuItemServerAction(params.id);
      setMenuItem(data);
      setImageUrl(data.image);
    };
    fetchMenuItem();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategoriesServerAction();
      setCategories(data);
      return;
    };

    fetchCategories();
  }, []);

  const updateMenuItemClientAction = async (formData: FormData) => {
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
    await updateMenuItemServerAction(data, params.id);
    toast.success("Updated Menu Item");
   
    router.push("/account/menuItems");
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl text-orange-600 text-center mt-2 font-semibold">
        Edit Menu Item
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

        <form className="flex-1 flex-col" action={updateMenuItemClientAction}>
          <label className="form-control w-full max-w-lg">
            <span className="label-text -mb-3 font-normal">Item Name</span>
            <input
              type="text"
              placeholder="Type here"
              name="item-name"
              defaultValue={menuItem?.name}
              className="input input-bordered w-full max-w-lg"
            />
          </label>
          <label className="form-control w-full max-w-lg">
            <span className="label-text -mb-3 font-normal">Description</span>
            <input
              type="text"
              placeholder="Type here"
              name="item-description"
              defaultValue={menuItem?.description}
              className="input input-bordered w-full max-w-lg"
            />
          </label>
          <label className="form-control w-full max-w-lg mb-4">
            <span className="label-text font-normal mb-1">Category</span>
            <select
              className="select select-bordered w-full max-w-lg"
              name="item-category"
            >
              {categories.map((c: CategoryType) => {
                return (
                  <option
                    className="text-md font-normal"
                    key={c.id}
                    value={c.category}
                    selected={menuItem?.category === c.category}
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
              defaultValue={menuItem?.basePrice}
              className="input input-bordered w-full max-w-lg"
            />
          </label>
          <button type="submit" className="btn w-fit">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;

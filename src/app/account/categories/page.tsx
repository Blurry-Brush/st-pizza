"use server";
import { revalidatePath } from "next/cache";
import prisma from "../../../utils/db";
import CategoryList from "../../components/account/CategoryList";

export default async function page() {
  const addCategoryAction = async (formData: FormData) => {
    "use server";
    const categoryName = formData.get("category") as string;
    const data = await prisma.category.create({
      data: { category: categoryName },
    });
    console.log(data);
    revalidatePath("/account/categories");
  };

  const categories = await prisma.category.findMany();
  //   console.log(categories);

  return (
    <div>
      <h1 className="text-center text-red-500 text-xl mt-5 font-semibold">
        Create a Category
      </h1>

      <div className="mt-6">
        <form className="w-full flex gap-2" action={addCategoryAction}>
          <input name="category" className="input input-primary flex-1" />
          <button
            type="submit"
            className="btn bg-red-500 text-white btn-primary w-24"
          >
            Add
          </button>
        </form>
      </div>

      <h1 className="text-center text-red-500 text-xl mt-10 font-semibold">
        All Categories
      </h1>

      <CategoryList categories={categories} />
    </div>
  );
}

"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../utils/db";

export async function deleteCategoryServerAction(category: string) {
  const del = await prisma.category.delete({
    where: {
      category: category,
    },
  });
  revalidatePath("/account/categories");
  console.log("deleted category", del);
}

"use server";

import { revalidatePath } from "next/cache";
import prisma from "../../utils/db";
import { MenuItemType } from "../../utils/types";

export async function createMenuItemServerAction(menuItem: MenuItemType) {
  console.log(menuItem);
  const res = await prisma.menuItem.create({
    data: menuItem,
  });
}

export async function updateMenuItemServerAction(
  menuItem: MenuItemType,
  id: string
) {
  const res = await prisma.menuItem.update({
    where: {
      id: id,
    },
    data: menuItem,
  });
  revalidatePath("/account/menuItems");
  return;
}

export async function getCategoriesServerAction() {
  const res = await prisma.category.findMany();
  return res;
}

export async function getMenuItemServerAction(id: string) {
  const res = await prisma.menuItem.findUnique({
    where: {
      id: id,
    },
  });
  return res;
}

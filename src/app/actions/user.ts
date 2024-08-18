"use server";

import prisma from "../../utils/db";
import { UserType } from "../../utils/types";

export async function getUserServerAction(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  console.log(user);
  return user;
}

export async function createUserServerAction(data: UserType) {
  const user = await prisma.user.create({
    data: data,
  });

  return user;
}

export async function updateUserServerAction(data: UserType, email: string) {
  const user = await prisma.user.update({
    where: {
      email: email,
    },
    data: data,
  });
  return user;
}

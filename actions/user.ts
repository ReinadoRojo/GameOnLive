"use server";

import { revalidatePath } from "next/cache";
import { User } from "@prisma/client";

import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";

export const updateUser = async (values: Partial<User>) => {
  try {
    const self = await getSelf();

    const validData = {
      bio: values.bio,
    };

    const user = await db.user.update({
      where: { id: self.id },
      data: { ...validData },
    });

    revalidatePath(`/${self.username}`);
    revalidatePath(`/u/${self.username}`);

    return user;
  } catch {
    throw new Error("Internal server error");
  }
};

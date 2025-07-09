"use server";
import { auth } from "@/auth";

export const getUser = async () => {
  const session = await auth();

  if (session?.user) {
    return session.user;
  }
  return null;
};

/** @format */

"use server";

import { authOptions } from "@/lib/auth/auth.config";
import { getServerSession } from "next-auth";

export async function isValidAdmin() {
  const session = await getServerSession(authOptions);
  console.log("ss", session);
  const userRole = session?.user?.role;
  console.log("role Admin:", userRole);

  if (userRole !== "Admin") {
    throw new Error(
      "Unauthorized access: User does not have admin privileges."
    );
  } else {
    return { success: "Valid user", data: session?.user.email };
  }
}
export async function isValidUser() {
  const session = await getServerSession(authOptions);
  const userRole = session?.user?.role;

  // Check if user is authorized to perform the action
  if (userRole !== "User") {
    throw new Error(
      "Unauthorized access: User does not have admin privileges."
    );
  } else {
    return {
      success: "Valid user",
      data: session?.user.email || session?.user.phone,
    };
  }
}


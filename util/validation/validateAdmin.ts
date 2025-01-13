/** @format */

"use server";
import {} from "react";
import {
  isValidAdmin,
  isValidUser,
} from "./isValid";

import prisma from "../../lib/prisma";
import { authOptions } from "@/lib/auth/auth.config";

export const validateAdmin = async () => {
  // const session = await getServerSession(authOptions);
  // console.log(session?.user?.role);

  const userStatus = await isValidAdmin();

  if (userStatus.success) {
    const userEmail = userStatus?.data;

    try {
      if (!userEmail) {
        return { error: "Invalid Email" };
      }
      const existingAdmin = await prisma.auth.findFirst({
        where: {
          userEmail: userEmail.toLowerCase(),
        },
      });
      if (!existingAdmin) {
        return { error: "User does not exist" };
      }

      console.log("object", existingAdmin);

      const company = await prisma.auth.findUnique({
        where: {
          userId: existingAdmin?.userId,
        },
      });
      console.log("object2", company);
      if (existingAdmin) {
        return {
          userExist: true,
          userId: existingAdmin?.userId,
          role: existingAdmin?.role,
          data: existingAdmin,
          specificId: company?.companyId,
        };
      } else {
        return { error: "User does not exist" };
      }
    } catch (error) {
      return { error: "Failed to validate user" };
    }
  } else {
    return { error: "Unauthorized access" };
  }
};

export const validateUser = async () => {
  const userStatus = await isValidUser();

  if (userStatus.success) {
    // console.log("userStatus", userStatus);
    const userEmail = userStatus?.data;
    const userPhone = userStatus?.data;

    try {
      let existingUser = null;

      // Check by email
      if (userEmail) {
        existingUser = await prisma.auth.findFirst({
          where: {
            userEmail: userEmail.toLowerCase(),
          },
        });
      }

      // Check by phone if no User found by email
      if (!existingUser && userPhone) {
        existingUser = await prisma.auth.findFirst({
          where: {
            userPhone: userPhone,
          },
        });
      }

      if (!existingUser) {
        return { error: "User does not exist" };
      }
    } catch (error) {
      return { error: "Failed to validate User" };
    }
  } else {
    return { error: "Unauthorized access" };
  }
};

/** @format */

"use server";

import { revalidatePath } from "next/cache";

import { getServerSession } from "next-auth";

import prisma from "@/lib/auth/prisma";
import { authOptions } from "@/lib/auth/auth.config";
import {
  validateAdmin,
  validateUser,
} from "../../../util/validation/validateAdmin";

export const getSetting = async () => {
  console.log("Roles");
  const session = await getServerSession(authOptions);

  const userRole = session?.user?.role;

  try {
    // Validate each user type
    if (userRole === "Admin") {
      const admin = await validateAdmin();
      if (!admin.error) {
        return getSettingsForUser(admin);
      }
    } else if (userRole === "User") {
      const officer = await validateUser();
      if (!officer?.error) {
        return getSettingsForUser(officer);
      }
    }
  } catch (error) {
    return { error: "Invalid Store" };
  }
};

const getSettingsForUser = async (user: any) => {
  if (!user) {
    return { error: "Invalid user" };
  }

  try {
    const basicSettingData = await prisma.userSetting.findUnique({
      where: {
        userId: user?.userId,
      },
    });

    if (!basicSettingData) {
      return { error: "User settings not found" };
    }

    const data = {
      userId: basicSettingData?.userId,
      specificId: user?.specificId,
      calanderType: basicSettingData?.calanderType,
      language: basicSettingData?.language || "en",
      fontSize: basicSettingData?.fontSize,
      theme: basicSettingData?.theme,
      initialSetup: basicSettingData.initialSetup,
    };
    console.log("first", data);
    revalidatePath("/");

    return { success: data };
  } catch (error) {
    return { error: "Failed to retrieve settings" };
  }
};

/** @format */
"use server";

import prisma from "@/lib/auth/prisma";


import DOMPurify from "isomorphic-dompurify";
import { validateAdmin } from "../../../../../util/validation/validateAdmin";

export const updateAdminDetails = async (adminData: string) => {
  const user = await validateAdmin();
  if (!adminData) {
    return { error: "Add appropriate data" };
  }
  if (user?.error) {
    return { error: user?.error };
  }
  if (user.userId) {
    try {
      const name = DOMPurify.sanitize(adminData);

      const { fullName, phone } = JSON.parse(name);

      if (fullName) {
        const existngUser = await prisma.auth.update({
          where: {
            userId: user.userId,
          },
          data: {
            userName: fullName,
            userPhone: phone,
          },
        });
        if (existngUser) {
          return { success: "Details updated successfully" };
        } else {
          return { error: "Updating details failed" };
        }
      } else {
        return { error: "Failed to update details" };
      }
    } catch (error) {
      return { error: "Error creating or finding a unique store public ID" };
    }
  } else {
    return { error: "Invalid store ID." };
  }
};
export const updateAdminSetting = async (adminData: string) => {
  const user = await validateAdmin();
  if (!adminData) {
    return { error: "Add appropriate data" };
  }
  if (user?.error) {
    return { error: user?.error };
  }
  if (user.userId) {
    try {
      const name = DOMPurify.sanitize(adminData);

      const { language, fontSize, theme } = JSON.parse(name);
      // console.log(name);
      if (language || fontSize || theme) {
        const existngUser = await prisma.userSetting.findUnique({
          where: {
            userId: user.userId,
          },
        });
        if (existngUser) {
          const existngUser = await prisma.userSetting.update({
            where: {
              userId: user.userId,
            },
            data: {
              ...(language && { language: language }),
              ...(fontSize && { fontSize: fontSize }),
              ...(theme && { theme: theme }),
            },
          });
          if (existngUser) {
            return { success: "Details updated successfully" };
          } else {
            return { error: "Updating details failed" };
          }
        } else {
          const existngUser = await prisma.userSetting.create({
            data: {
              userInId: user.userId,
              ...(language && { language: language }),
              ...(fontSize && { fontSize: fontSize }),
              ...(theme && { theme: theme }),
            },
          });
          if (existngUser) {
            return { success: "Details created successfully" };
          } else {
            return { error: "Creating details failed" };
          }
        }
      } else {
        return { error: "Failed to update details" };
      }
    } catch (error) {
      return { error: "Error creating or finding a unique ID" };
    }
  } else {
    return { error: "Invalid store ID." };
  }
};
export const getAdminDetails = async () => {
  const user = await validateAdmin();

  if (user?.error) {
    return { error: user?.error };
  }
  if (user.userId) {
    try {
      const existngUser = await prisma.auth.findUnique({
        where: {
          userId: user.userId,
        },
        select: {
          userEmail: true,
          userName: true,
          userPhone: true,
          userSetting: true,
          role: true,
        },
      });
      if (existngUser) {
        return { success: existngUser };
      } else {
        return { error: "Updating details failed" };
      }
    } catch (error) {
      return { error: "Error creating or finding a unique store public ID" };
    }
  } else {
    return { error: "Invalid store ID." };
  }
};




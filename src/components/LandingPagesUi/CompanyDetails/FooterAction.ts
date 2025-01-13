/** @format */

"use server";

import prisma from "../../../../lib/prisma";
import { uploadFile } from "../../../../lib/uploadFileAction";
import { validateAdmin } from "../../../../util/validation/validateAdmin";

export const addFooter = async (footerData: FormData) => {
  console.log("footer Data", footerData);
  const user = await validateAdmin();
  if (user.error) {
    return { error: "Invalid session" };
  }

  try {
    if (!footerData) {
      return { error: "No data provided" };
    }
    console.log("footerData", footerData);

    const footerDataString = footerData.get("footerData") as string;

    if (!footerDataString) {
      return { error: "footer data is missing" };
    }

    const {
      footerId,
      companyName,
      companySlogan,
      companyMoto,
      description,
      address,
      video,
      email,
      phone,
      terms,
      privacyPolicyLink,
      location,
    } = JSON.parse(footerDataString as string);

    const file1 = footerData.get("heroImage") as File;
    console.log("file 1 ", file1);
    let filePath1 = null;
    if (file1) {
      filePath1 = (
        await uploadFile(file1, "elearning/footerDetails")
      ).toString();
      console.log("File uploaded to:", filePath1);
    }

    const file2 = footerData.get("companyLogo") as File;
    console.log("file 2 is here", file2);
    console.log("file2 ", file2);
    let filePath2 = null;
    if (file2) {
      filePath2 = (
        await uploadFile(file2, "elearning/footerDetails/logo")
      ).toString();
      console.log("File uploaded to:", filePath2);
    }

    let locationArray: any;
    if (location) {
      locationArray = location.split(",").map((loc: any) => parseFloat(loc));
    }

    let footerRecord;
    if (footerId) {
      const existingfooter = await prisma.companyMainPageDetails.findUnique({
        where: { footerId: footerId, userId: user.specificId },
      });

      if (existingfooter) {
        // Update existing footer record
        footerRecord = await prisma.companyMainPageDetails.update({
          where: { footerId: footerId },
          data: {
            companyName: companyName || "",
            companySlogan: companySlogan || "",
            companyMoto: companyMoto || "",
            description: description || "",
            address: address || "",
            email: email || "",
            videoLink: video || "",
            location: locationArray || [],
            phone: phone || "",
            privacyPolicyLink: privacyPolicyLink || "",
            terms: terms || "",
            year: new Date().getFullYear().toString(),
            ...(filePath1 && { heroImage: filePath1 }),
            ...(filePath2 && { companyLogo: filePath2 }),
            updatedAt: new Date(),
          },
        });
      } else {
        return { error: "footer record not found for the given ID" };
      }
    } else {
      // Create new footer record
      footerRecord = await prisma.companyMainPageDetails.create({
        data: {
          companyId: user?.specificId,
          companyName: companyName || "",
          companySlogan: companySlogan || "",
          companyMoto: companyMoto || "",
          description: description || "",
          address: address || "",
          email: email || "",
          videoLink: video || "",
          location: locationArray || [],
          phone: phone || "",
          privacyPolicyLink: privacyPolicyLink || "",
          terms: terms || "",
          year: new Date().getFullYear().toString(),
          ...(filePath1 && { heroImage: filePath1 }),
          ...(filePath2 && { companyLogo: filePath2 }),
        },
      });
      console.log("created footer", footerRecord);
    }

    if (footerRecord) {
      return {
        status: 200,
        success: footerId
          ? "footer record updated successfully"
          : "footer record created successfully",
      };
    } else {
      return { error: "Failed to save footer record" };
    }
  } catch (error) {
    console.error("Error in addfooter:", error);
    return { error: "Internal Server Error" };
  }
};

// Get footer details
export const getFooterDetails = async () => {
  try {
    const navItems = await prisma.companyMainPageDetails.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return {
      success: true,
      data: navItems,
    };
  } catch (error) {
    console.error("Error fetching navbar items:", error);
    return {
      error: "Failed to fetch navbar items.",
    };
  }
};

export const deleteFooterDetails = async (footerId: string) => {
  console.log("footerId", footerId);

  const user = await validateAdmin();

  if (!user) {
    return {
      error: "Failed to validate user.",
    };
  }

  try {
    // Check if the navbar item exists
    const existingNav = await prisma.companyMainPageDetails.findUnique({
      where: { footerId: footerId },
    });

    if (!existingNav) {
      return {
        error: "Navbar item not found.",
      };
    }

    // Delete the navbar item
    await prisma.companyMainPageDetails.delete({
      where: { footerId: footerId },
    });

    return {
      success: "Navbar item successfully deleted.",
    };
  } catch (error) {
    console.error("Error deleting navbar item:", error);
    return {
      error: "An error occurred while deleting the navbar item.",
    };
  }
};

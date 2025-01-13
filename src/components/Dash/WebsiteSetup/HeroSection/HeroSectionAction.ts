/** @format */

"use server";

import prisma from "../../../../../lib/prisma";
import { uploadFile } from "../../../../../lib/uploadFileAction";
import { validateAdmin } from "../../../../../util/validation/validateAdmin";

export const addHeroSection = async (heroSectionData: FormData) => {
  console.log("heroSectionData", heroSectionData);
  const user = await validateAdmin();
  if (user.error) {
    return { error: "Invalid session" };
  }

  try {
    if (!heroSectionData) {
      return { error: "No data provided" };
    }
    console.log("heroSectionData", heroSectionData);

    const heroSectionDataString = heroSectionData.get(
      " heroSectionData"
    ) as string;

    if (!heroSectionDataString) {
      return { error: " heroSection data is missing" };
    }

    const {
      heroSectionId,
      companyName,
      companySlogan,
      companyMoto,
      description,
      address,
      email,
      phone,
      terms,
      privacyPolicyLink,
      location,
    } = JSON.parse(heroSectionDataString as string);

    const file1 = heroSectionData.get("heroImage") as File;
    console.log("file 1 ", file1);
    let filePath1 = null;
    if (file1) {
      filePath1 = (
        await uploadFile(file1, "edupress/ heroSectionDetails")
      ).toString();
      console.log("File uploaded to:", filePath1);
    }

    const file2 = heroSectionData.get("companyLogo") as File;
    console.log("file 2 is here", file2);
    console.log("file2 ", file2);
    let filePath2 = null;
    if (file2) {
      filePath2 = (
        await uploadFile(file2, "edupress/ heroSectionDetails/logo")
      ).toString();
      console.log("File uploaded to:", filePath2);
    }

    let locationArray: any;
    if (location) {
      locationArray = location.split(",").map((loc: any) => parseFloat(loc));
    }

    let heroSectionRecord;
    if (heroSectionId) {
      const existingHeroSection =
        await prisma.companyMainPageDetails.findUnique({
          where: { heroSectionId: heroSectionId },
        });

      if (existingHeroSection) {
        // Update existing  heroSection record
        heroSectionRecord = await prisma.companyMainPageDetails.update({
          where: { heroSectionId: heroSectionId },
          data: {
            companyName: companyName || "",
            companySlogan: companySlogan || "",
            companyMoto: companyMoto || "",
            description: description || "",
            address: address || "",
            email: email || "",
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
        return { error: " heroSection record not found for the given ID" };
      }
    } else {
      // Create new  heroSectionrecord
      heroSectionRecord = await prisma.companyMainPageDetails.create({
        data: {
          companyName: companyName || "",
          companySlogan: companySlogan || "",
          companyMoto: companyMoto || "",
          description: description || "",
          address: address || "",
          email: email || "",
          location: locationArray || [],
          phone: phone || "",
          privacyPolicyLink: privacyPolicyLink || "",
          terms: terms || "",
          year: new Date().getFullYear().toString(),
          ...(filePath1 && { heroImage: filePath1 }),
          ...(filePath2 && { companyLogo: filePath2 }),
        },
      });
      console.log("created  heroSection", heroSectionRecord);
    }

    if (heroSectionRecord) {
      return {
        status: 200,
        success: heroSectionId
          ? " heroSection record updated successfully"
          : " heroSectionrecord created successfully",
      };
    } else {
      return { error: "Failed to save  heroSection record" };
    }
  } catch (error) {
    console.error("Error in addHeroSection:", error);
    return { error: "Internal Server Error" };
  }
};

// Get  heroSection details
export const getHeroSectionDetails = async () => {
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

export const deleteHeroSectionDetails = async (heroSectionId: string) => {
  console.log(" heroSectionId", heroSectionId);

  const user = await validateAdmin();

  if (!user) {
    return {
      error: "Failed to validate user.",
    };
  }

  try {
    // Check if the navbar item exists
    const existingNav = await prisma.companyMainPageDetails.findUnique({
      where: { heroSectionId: heroSectionId },
    });

    if (!existingNav) {
      return {
        error: "Navbar item not found.",
      };
    }

    // Delete the navbar item
    await prisma.companyMainPageDetails.delete({
      where: { heroSectionId: heroSectionId },
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

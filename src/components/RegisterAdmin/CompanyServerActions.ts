"use server";
import prisma from "../../../lib/prisma";
import { uploadFile } from "../../../lib/uploadFileAction";
import { validateAdmin } from "../../../util/validation/validateAdmin";

export const getCompany = async () => {
  const user = await validateAdmin();
  if (user?.error) {
    return { error: user?.error };
  }
  const company = await prisma.companyUser.findUnique({
    where: {
      companyId: user?.specificId,
    },
  });
  return {
    success: company,
  };
};

export const updateCompany = async (formData: FormData) => {
  try {
    const user = await validateAdmin();
    if (user?.error) {
      return { error: user?.error };
    }

    const companyDetails = formData.get("companyData");
    const companyPhoto = formData.get("companyLogo");

    const {
      companyId,
      companyName,
      companyPan,
      companyOwnerName,
      companyCountry,
      companyState,
      companyDistrict,
      companyMunicipality,
      companyWard,
      companyCity,
      companyLandmark,
      companyEmail,
      companyPhone,
      companyLocation,
    } = JSON.parse(companyDetails as string);

    let documentPath = null;
    if (companyPhoto && companyPhoto instanceof File) {
      documentPath = (
        await uploadFile(companyPhoto, "elearning/companyLogo")
      ).toString();
      console.log("Document uploaded to:", documentPath);
    }

    const locationArray = companyLocation
      .split(",")
      .map((loc: any) => parseFloat(loc));
    const updatedCompany = await prisma.companyUser.update({
      where: {
        companyId: companyId,
      },
      data: {
        companyName,
        companyPan,
        companyOwnerName,
        companyCountry,
        companyState,
        companyDistrict,
        companyMunicipality,
        companyWard,
        companyLandMark: companyLandmark,
        companyCity,
        companyLocation: locationArray,
        companyEmail,
        companyPhone,
        companyLogo: documentPath,
      },
    });

    if (updatedCompany) {
      await prisma.userSetting.update({
        where: {
          userId: user?.userId,
        },
        data: {
          initialSetup: true,
        },
      });
      return {
        success: "Company updated successfully",
      };
    }
  } catch (error) {
    console.error("Error updating company:", error);
    return {
      error: "Failed to update company. Please try again later.",
    };
  }
};

/** @format */

"use server";

import prisma from "../../../../../lib/prisma";
import { uploadFile } from "../../../../../lib/uploadFileAction";
import { validateAdmin } from "../../../../../util/validation/validateAdmin";

export const addArticleDetails = async (articleDetailsData: FormData) => {
  console.log("articleDetails Data", articleDetailsData);
  const user = await validateAdmin();
  console.log("object", user);
  if (user.error) {
    return { error: "Invalid session" };
  }

  try {
    if (!articleDetailsData) {
      return { error: "No data provided" };
    }
    console.log("articleDetailsData", articleDetailsData);

    const articleDetailsDataString = articleDetailsData.get(
      "articleDetailsData"
    ) as string;

    if (!articleDetailsDataString) {
      return { error: "article Details data is missing" };
    }

    const {
      articleId,
      articleTitle,
      articleDescription,
      articleTags,
      articleCategory,
      date,
    } = JSON.parse(articleDetailsDataString as string);

    const file1 = articleDetailsData.get("articleImage") as File;
    console.log("file 1", file1);
    let filePath1 = null;
    if (file1) {
      const uploadResult = await uploadFile(file1, "edupress/articleDetails");
      if (typeof uploadResult === "string") {
        filePath1 = uploadResult;
        console.log("File uploaded to:", filePath1);
      } else {
        console.error("Upload failed:", uploadResult);
        return { error: "Failed to upload file" };
      }
    }

    let articleDetailsRecord;
    if (articleId) {
      const existingarticleDetails = await prisma.blog.findUnique({
        where: { articleId: articleId },
      });

      if (existingarticleDetails) {
        // Update existing articleDetails record
        articleDetailsRecord = await prisma.blog.update({
          where: { articleId: articleId },
          data: {
            articleTitle: articleTitle || "",
            articleCategory: articleCategory || "",
            userId: user.userId,
            articleDescription: articleDescription || "",
            articleTags: articleTags || "",
            date: date || "",
            ...(filePath1 && { articleImage: filePath1 }),
          },
        });
      } else {
        return { error: "articleDetails record not found for the given ID" };
      }
    } else {
      // Create new articleDetails record
      articleDetailsRecord = await prisma.blog.create({
        data: {
          articleTitle: articleTitle || "",
          articleCategory: articleCategory || "",
          userId: user.userId,
          articleDescription: articleDescription || "",
          articleTags: articleTags || "",
          date: date || "",
          ...(filePath1 && { articleImage: filePath1 }),
        },
      });
      console.log("created article Details", articleDetailsRecord);
    }

    if (articleDetailsRecord) {
      return {
        status: 200,
        success: articleId
          ? "article Details record updated successfully"
          : "article Details record created successfully",
      };
    } else {
      return { error: "Failed to save articleDetails record" };
    }
  } catch (error) {
    console.error("Error in addarticleDetails:", error);
    return { error: "Internal Server Error" };
  }
};

// Get  articleDetails details
export const getArticleDetails = async () => {
  try {
    const user = await validateAdmin();
    if (!user?.userId) {
      return { error: "Invalid session or user not authenticated" };
    }

    const articleItems = await prisma.blog.findMany({
      where: {},
      orderBy: { createdAt: "desc" },
    });

    console.log("Fetched article items:", articleItems);

    return { success: articleItems };
  } catch (error) {
    console.error("Error fetching article details:", error);
    return { error: "Failed to fetch article details" };
  }
};
export const getArticleSpecific = async (articleId: string) => {
  try {
    const existingarticle = await prisma.blog.findUnique({
      where: {
        articleId: articleId,
      },
    });
    if (existingarticle) {
      return {
        success: existingarticle,
      };
    }
    return {
      error: "Failed to fetch articles",
    };
  } catch (error) {
    return {
      error: "Sever error",
    };
  }
};

export const deleteArticleDetails = async (articleId: string) => {
  console.log(" articleId", articleId);

  const user = await validateAdmin();

  if (!user) {
    return {
      error: "Failed to validate user.",
    };
  }

  try {
    // Check if the articlebar item exists
    const existingarticle = await prisma.blog.findUnique({
      where: { articleId: articleId },
    });

    if (!existingarticle) {
      return {
        error: "article item not found.",
      };
    }

    // Delete the article item
    await prisma.blog.delete({
      where: { articleId: articleId },
    });

    return {
      success: "article item successfully deleted.",
    };
  } catch (error) {
    console.error("Error deleting article item:", error);
    return {
      error: "An error occurred while deleting the article item.",
    };
  }
};

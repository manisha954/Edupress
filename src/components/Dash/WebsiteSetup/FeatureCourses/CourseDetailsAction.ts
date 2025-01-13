/** @format */

"use server";

import prisma from "../../../../../lib/prisma";
import { uploadFile } from "../../../../../lib/uploadFileAction";
import { validateAdmin } from "../../../../../util/validation/validateAdmin";

export const addCourseDetails = async (courseDetailsData: FormData) => {
  console.log("courseDetails Data", courseDetailsData);
  const user = await validateAdmin();
  console.log("object", user);
  if (user.error) {
    return { error: "Invalid session" };
  }

  try {
    if (!courseDetailsData) {
      return { error: "No data provided" };
    }
    console.log("courseDetailsData", courseDetailsData);

    const courseDetailsDataString = courseDetailsData.get(
      "courseDetailsData"
    ) as string;

    if (!courseDetailsDataString) {
      return { error: "course Details data is missing" };
    }

    const {
      courseId,
      courseTitle,
      instructor,
      courseDuration,
      courseStudents,
      coursePrice,
      courseLevel,
      reviews,
      courseCategory,
      originalPrice,
    } = JSON.parse(courseDetailsDataString as string);

    const file1 = courseDetailsData.get("courseImage") as File;
    console.log("file 1 ", file1);
    let filePath1 = null;
    if (file1) {
      const uploadResult = await uploadFile(file1, "edupress/courseDetails");
      if (typeof uploadResult === "string") {
        filePath1 = uploadResult;
        console.log("File uploaded to:", filePath1);
      } else {
        console.error("Upload failed:", uploadResult);
        return { error: "Failed to upload file" };
      }
    }

    let courseDetailsRecord;
    if (courseId) {
      const existingcourseDetails = await prisma.featureCourses.findUnique({
        where: { courseId: courseId },
      });

      if (existingcourseDetails) {
        // Update existing courseDetails record
        courseDetailsRecord = await prisma.featureCourses.update({
          where: { courseId: courseId },
          data: {
            courseTitle: courseTitle || "",
            instructor: instructor || "",
            courseCategory: courseCategory || "",
            courseDuration: courseDuration || "",
            courseStudents: courseStudents || "",
            userId: user.userId,
            courseLevel: courseLevel || "",
            reviews: reviews || "",

            coursePrice: parseFloat(coursePrice),
            originalPrice: parseFloat(originalPrice),
            ...(filePath1 && { courseImage: filePath1 }),
          },
        });
      } else {
        return { error: "courseDetails record not found for the given ID" };
      }
    } else {
      // Create new courseDetails record
      courseDetailsRecord = await prisma.featureCourses.create({
        data: {
          courseTitle: courseTitle || "",
          instructor: instructor || "",
          courseCategory: courseCategory || "",
          courseDuration: courseDuration || "",
          courseStudents: courseStudents || "",
          courseLevel: courseLevel || "",
          userId: user.userId,
          reviews: reviews || "",
          originalPrice: parseFloat(originalPrice),
          coursePrice: parseFloat(coursePrice),
          ...(filePath1 && { courseImage: filePath1 }),
        },
      });
      console.log("created courseDetails", courseDetailsRecord);
    }

    if (courseDetailsRecord) {
      return {
        status: 200,
        success: courseId
          ? "course Details record updated successfully"
          : "course Details record created successfully",
      };
    } else {
      return { error: "Failed to save courseDetails record" };
    }
  } catch (error) {
    console.error("Error in addCourseDetails:", error);
    return { error: "Internal Server Error" };
  }
};

// Get  courseDetails details
export const getcourseDetails = async () => {
  try {
    const user = await validateAdmin();
    if (!user?.userId) {
      return { error: "Invalid session or user not authenticated" };
    }

    const courseItems = await prisma.featureCourses.findMany({
      where: {},
      orderBy: { createdAt: "desc" },
    });

    console.log("Fetched course items:", courseItems);

    return { success: courseItems };
  } catch (error) {
    console.error("Error fetching course details:", error);
    return { error: "Failed to fetch course details" };
  }
};

export const deleteCourseDetails = async (courseId: string) => {
  console.log(" courseId", courseId);

  const user = await validateAdmin();

  if (!user) {
    return {
      error: "Failed to validate user.",
    };
  }

  try {
    // Check if the Coursebar item exists
    const existingCourse = await prisma.featureCourses.findUnique({
      where: { courseId: courseId },
    });

    if (!existingCourse) {
      return {
        error: "Course item not found.",
      };
    }

    // Delete the Course item
    await prisma.featureCourses.delete({
      where: { courseId: courseId },
    });

    return {
      success: "Course item successfully deleted.",
    };
  } catch (error) {
    console.error("Error deleting Course item:", error);
    return {
      error: "An error occurred while deleting the Course item.",
    };
  }
};

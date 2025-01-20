/** @format */

"use client";
// main page side

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getcourseDetails } from "../Dash/WebsiteSetup/FeatureCourses/CourseDetailsAction";

export default function FeaturedCourse() {
  const [courseDetails, setCourseDetails] = useState<any[]>([]);

  const { data: courseDetail } = useQuery({
    queryKey: ["feature"],
    queryFn: async () => getcourseDetails(),
  });

  useEffect(() => {
    if (courseDetail?.success) {
      setCourseDetails(courseDetail?.success);
    } else {
      setCourseDetails([]);
    }
  }, [courseDetail?.success]);

  console.log("course", courseDetail);

  return (
    <div className="px-4 md:px-20 pb-20">
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          <h1 className="md:text-3xl text-2xl font-semibold mb-2">
            Featured Courses
          </h1>
          <p className="text-gray-600 text-sm mb-4 md:mb-10">
            Explore our Popular Courses
          </p>
        </div>{" "}
        <div className="mb-10 md:mb-0">
          <Link href="/AllCourses" legacyBehavior>
            <a className="border-2 hover:bg-orange-500 hover:text-white border-orange-500 text-gray-700 font-semibold text-sm px-8 py-3 rounded-full mb-4 md:mb-0">
              All Courses
            </a>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courseDetails?.slice(0, 6).map((course: any, index: number) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
}

export const CourseCard = ({ course }: { course: any }) => {
  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-300 hover:shadow-xl transform transition-transform duration-300 hover:-translate-y-3">
      <div className="absolute top-2 left-2 bg-gray-800 text-white rounded-lg px-4 py-2 text-xs font-semibold">
        {course.courseCategory}
      </div>
      <img
        className="w-full h-56"
        src={course.courseImage}
        alt={course.courseTitle}
      />
      <div className="px-6 py-4">
        <p className="text-gray-700 text-sm mb-2">by {course.instructor}</p>
        <Link
          href={`/courses/${course.courseTitle}/${course.courseId}`}
          // as={`/courses/${course.courseName}`}
        >
          <div className="font-bold hover:text-lg text-base mb-4">
            {course.courseTitle}
          </div>
        </Link>

        <div className="flex justify-between text-sm border-b mb-2">
          <p className="text-gray-700 mb-3">{course.courseDuration}</p>
          <p className="text-gray-700 mb-3">{course.courseStudents} Students</p>
        </div>
        <div className="text-sm flex justify-between mb-4 items-center">
          <p className="text-gray-500 text-sm">
            <span className="line-through">{course.originalPrice}</span>{" "}
            <span
              className={`font-semibold ml-1 ${
                course.coursePrice === "Free"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {course.coursePrice}
            </span>
          </p>
          <Link
            href={`/courses/${course.courseTitle}/${course.courseId}`}
            // as={`/courses/${course.courseName}`}
            className="hover:underline font-semibold"
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  );
};

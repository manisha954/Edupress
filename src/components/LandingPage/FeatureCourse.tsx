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
    <section className="py-16 bg-gradient-to-r from-pink-100 via-white to-blue-100">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 lg:mb-12">
          <div className=" p-2 lg:text-left mb-6 lg:mb-0">
            <h4 className="text-red-500 text-lg sm:text-xl font-semibold mb-2">
              {" What's New"}
            </h4>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-gray-600 text-sm sm:text-lg max-w-xl mx-auto lg:mx-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
              aenean accumsan bibendum gravida maecenas augue elementum et
              neque. Suspendisse imperdiet.
            </p>
          </div>
          <button className="text-fuchsia-900 border-2 border-fuchsia-900 rounded-full px-6 sm:px-8 py-2 sm:py-3 hover:bg-fuchsia-950 hover:text-white transition duration-300">
            All Courses
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courseDetails?.map((course: any, index: number) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}

export const CourseCard = ({ course }: { course: any }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:bg-fuchsia-950 hover:text-white relative group">
      <div className="overflow-hidden p-5">
        <img
          src={course.courseImage}
          alt={course.courseName}
          className="w-full h-68 sm:h-68 object-cover rounded-lg transform transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div>
              <p className="text-gray-600 text-sm font-semibold group-hover:text-white">
                {course.instructor}
              </p>
              <p className="text-gray-500 text-xs group-hover:text-white">
                Instructor
              </p>
            </div>
          </div>
          <button className="p-2 rounded-full bg-white text-red-500 hover:text-red-600 focus:outline-none shadow">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4.008 4.008 0 000 5.656L10 17.656l6.828-6.828a4.008 4.008 0 000-5.656A4.008 4.008 0 0010 3.172a4.008 4.008 0 00-5.656 0z" />
            </svg>
          </button>
        </div>
        <Link
          href={`/courses/${course.courseTitle}/${course.courseId}`}
          // as={`/courses/${course.courseName}`}
        >
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mt-4 mb-2 hover:font-extrabold group-hover:text-white">
            {course.courseTitle}
          </h3>
        </Link>
        <div className="flex items-center text-sm text-gray-500 mb-4 group-hover:text-white">
          <span className="mr-10 sm:mr-20 flex items-center">
            <svg
              className="w-5 h-5 text-red-500 mr-1 group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M5 3a1 1 0 00-1 1v12a1 1 0 001.555.832L10 13.101l4.445 3.731A1 1 0 0016 16V4a1 1 0 00-1-1H5z" />
            </svg>
            {course.courseStudents}
          </span>
          <span className="flex items-center">
            <svg
              className="w-5 h-5 text-gray-500 mr-1 group-hover:text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.93 4.512a.75.75 0 011.13.664v5.648a.75.75 0 01-1.492.111V5.176a.75.75 0 01.362-.664zm-.17 8.12a.75.75 0 111.49.124.75.75 0 01-1.49-.124z"
                clipRule="evenodd"
              />
            </svg>
            {course.courseDuration}
          </span>
        </div>
        <hr className="border-gray-300 group-hover:border-white" />
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center">
            <span className="text-gray-600 text-sm ml-2 group-hover:text-white">
              ({course.reviews})
            </span>
          </div>
          <button className="bg-purple-100 text-purple-800 font-semibold py-2 px-6 rounded-full border border-purple-800 transition duration-300 hover:bg-purple-600 hover:text-white ">
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

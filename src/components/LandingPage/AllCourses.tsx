/** @format */

"use client";
import React, { useEffect, useState } from "react";
import { FaDownload, FaVideo, FaKey, FaTasks } from "react-icons/fa";
import { BsPlayCircle } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";

export default function CourseDetail({ course }: { course: any }) {
  console.table("course got in course detail", course);

  // const [totalChapter, setTotalChapter] = useState<number | null>(null);

  // Extract courseId from course
  const courseId = course?.courseId;

  // const chapterId = course?.CourseChapter?.chapterId;
  // console.log("chapterId", chapterId);

  // console.log("Course ID:", courseId);

  // Use react-query to fetch chapter details
  // const { data: chapterDetail } = useQuery({
  //   queryKey: ["course-chapters", courseId],
  //   queryFn: async () => (courseId),
  // });

  // useEffect(() => {
  //   if (chapterDetail?.success) {
  //     setTotalChapter(chapterDetail?.success);
  //     console.log("Total Chapters Count:", chapterDetail.success);
  //   } else if (chapterDetail?.error) {
  //     console.error("Error fetching chapter details:", chapterDetail.error);
  //     setTotalChapter(null);
  //   }
  // }, [chapterDetail]);

  // console.log("course count", totalChapter);

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("Overview");
  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 mb-6">
      <div className="mx-auto">
        {/* Course Header */}
        <div className="md:p-16 p-4 bg-black">
          <div className="flex items-center gap-4 mb-5">
            <span className="bg-gray-500 text-gray-50 px-3 py-2 rounded-md">
              {course?.courseCategory}
            </span>
            <h2 className="text-gray-400 space-x-4">
              by <span className=" text-gray-50">{course?.instructor}</span>
            </h2>
          </div>

          <h1 className="md:text-4xl text-3xl text-white font-bold mb-4 md:mb-6">
            {course?.courseTitle}
          </h1>

          {/* Course Stats */}
          <div className="md:flex space-y-1  gap-6 text-sm  text-gray-300">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4 text-orange-500"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z"
                  clipRule="evenodd"
                />
              </svg>

              <span className=" text-gray-300">{course?.courseDuration}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4 text-orange-500"
              >
                <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
                <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
                <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
              </svg>

              <span className=" text-gray-300">
                {course?.courseStudents} Students
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4 text-orange-500"
              >
                <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
              </svg>

              <span className=" text-gray-300">{course?.courseLevel}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4 text-orange-500"
              >
                <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
                <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
              </svg>

              <span className=" text-gray-300">20 Lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4 text-orange-500"
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
                  clipRule="evenodd"
                />
              </svg>

              <span className=" text-gray-300">3 Quizzes</span>
            </div>
          </div>
        </div>

        {/* Course Details */}
        <div className="max-w-7xl mx-auto py-4 md:py-16 px-4 lg:px-2 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Right Column - Price and Includes */}
          <div className="space-y-8 lg:col-span-1 order-1 lg:order-2">
            {/* Top Card - Pricing and Enroll */}
            <div className="lg:top-14  md:pr-20 space-y-8  lg:absolute">
              <div className="bg-white shadow-lg  rounded-2xl">
                <img
                  src={course?.courseImage}
                  alt="Course Image"
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <div className="py-8 flex justify-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500 line-through">
                      {course?.originalPrice}
                    </span>{" "}
                    <p className="text-red-500 text-lg font-semibold">
                      Rs.{course?.coursePrice}
                    </p>
                  </div>
                  <button className="bg-orange-500 font-medium hover:bg-orange-600 text-white py-2.5 px-8 rounded-full">
                    Start Now
                  </button>
                </div>
              </div>
              {/* Includes Card */}
            </div>
          </div>

          {/* Left Column - Overview chapter */}
          <div className="lg:col-span-2 order-2 lg:order-1 space-y-8">
            <div className="border border-gray-300 rounded-xl">
              <div className="flex flex-wrap justify-center space-x-4 border-b p-2">
                <button
                  className={`py-2 px-4 ${
                    activeTab === "Overview"
                      ? "border-b-2 border-orange-500 font-semibold text-orange-400 bg-gray-100"
                      : ""
                  }`}
                  onClick={() => setActiveTab("Overview")}
                >
                  Overview
                </button>
                <button
                  className={`py-2 px-4 ${
                    activeTab === "Curriculum"
                      ? "border-b-2 border-orange-500 font-semibold text-orange-400 bg-gray-100"
                      : ""
                  }`}
                  onClick={() => setActiveTab("Curriculum")}
                >
                  Curriculum
                </button>
                <button
                  className={`py-2 px-4 ${
                    activeTab === "Instructor"
                      ? "border-b-2 border-orange-500 font-semibold text-orange-400 bg-gray-100"
                      : ""
                  }`}
                  onClick={() => setActiveTab("Instructor")}
                >
                  Instructor
                </button>
                <button
                  className={`py-2 px-4 ${
                    activeTab === "FAQs"
                      ? "border-b-2 border-orange-500 font-semibold text-orange-400 bg-gray-100"
                      : ""
                  }`}
                  onClick={() => setActiveTab("FAQs")}
                >
                  FAQs
                </button>
                <button
                  className={`py-2 px-4 ${
                    activeTab === "Reviews"
                      ? "border-b-2 border-orange-500 font-semibold text-orange-400 bg-gray-100"
                      : ""
                  }`}
                  onClick={() => setActiveTab("Reviews")}
                >
                  Reviews
                </button>
              </div>
              <div className="p-4">{/* Add tab content here */}</div>
            </div>

            <div className="mt-16 w-full px-4">
              <h2 className="text-2xl font-semibold mb-4">Leave a Comment</h2>
              <p className="mb-6 text-gray-600 text-base">
                Your email address will not be published. Required fields are
                marked *
              </p>
              <form className="flex flex-col space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name*"
                    className="px-4 py-2 text-sm border active:border-orange-500 border-gray-300 rounded-lg"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email*"
                    className="px-4 py-2 text-sm border active:border-orange-500 border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <textarea
                  name="comment"
                  placeholder="Comment"
                  className="px-4 py-2 border text-sm active:border-orange-500 border-gray-300 rounded-lg"
                  required
                ></textarea>
                <div className="flex items-center">
                  <input type="checkbox" id="saveInfo" className="mr-2" />
                  <label htmlFor="saveInfo" className="text-sm text-gray-600">
                    Save my name, email in this browser for the next time I
                    comment.
                  </label>
                </div>
                <input
                  type="submit"
                  value="Posts Comment"
                  className="px-2 py-3 w-40 text-sm font-semibold  hover:text-orange-500 hover:bg-transparent hover:border-orange-500 border-2 active:border-orange-500 border-gray-300 rounded-full bg-orange-500 text-white cursor-pointer"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

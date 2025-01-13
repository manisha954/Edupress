// pages/index.js
"use client";
import Link from "next/link";
import React, { useState } from "react";

interface Course {
  title: string;
  instructor: string;
  duration: string;
  students: number;
  price: string;
  originalPrice: string;
  category: string;
  image: string;
}

const courses: Course[] = [
  {
    title: "Create An LMS Website With LearnPress",
    instructor: "Determined-Poitras",
    duration: "2 Weeks",
    students: 156,
    price: "Free",
    originalPrice: "$29.0",
    category: "Photography",
    image: "/images/LMS.jpg",
  },
  {
    title: "Create An LMS Website With LearnPress",
    instructor: "Determined-Poitras",
    duration: "2 Weeks",
    students: 156,
    price: "Free",
    originalPrice: "$29.0",
    category: "Photography",
    image: "/images/LMS.jpg",
  },
  {
    title: "Create An LMS Website With LearnPress",
    instructor: "Determined-Poitras",
    duration: "2 Weeks",
    students: 156,
    price: "Free",
    originalPrice: "$29.0",
    category: "Photography",
    image: "/images/LMS.jpg",
  },
  {
    title: "Design A Website With ThimPress",
    instructor: "Determined-Poitras",
    duration: "2 Weeks",
    students: 156,
    price: "$49.0",
    originalPrice: "$59.0",
    category: "Photography",
    image: "/images/thim.jpeg",
  },
  {
    title: "Create An LMS Website With LearnPress",
    instructor: "Determined-Poitras",
    duration: "2 Weeks",
    students: 156,
    price: "Free",
    originalPrice: "$29.0",
    category: "Photography",
    image: "/images/study.jpeg",
  },
  {
    title: "Create An LMS Website With LearnPress",
    instructor: "Determined-Poitras",
    duration: "2 Weeks",
    students: 156,
    price: "Free",
    originalPrice: "$29.0",
    category: "Photography",
    image: "/images/LMS.jpg",
  },
  {
    title: "Design A Website With ThimPress",
    instructor: "Determined-Poitras",
    duration: "2 Weeks",
    students: 156,
    price: "$49.0",
    originalPrice: "$59.0",
    category: "Photography",
    image: "/images/thim.jpeg",
  },
  {
    title: "Create An LMS Website With LearnPress",
    instructor: "Determined-Poitras",
    duration: "2 Weeks",
    students: 156,
    price: "Free",
    originalPrice: "$29.0",
    category: "Photography",
    image: "/images/study.jpeg",
  },
];

const CourseCard = ({ course }: { course: Course }) => (
  <div className="relative rounded-xl overflow-hidden border border-gray-300 hover:shadow-xl transform transition-transform duration-300 hover:-translate-y-3">
    <div className="absolute top-2 left-2 bg-gray-800 text-white rounded-lg px-4 py-2 text-xs font-semibold">
      {course.category}
    </div>
    <img className="w-full h-56" src={course.image} alt={course.title} />
    <div className="px-6 py-4">
      <p className="text-gray-700 text-sm mb-2">by {course.instructor}</p>
      <div className="font-bold text-base mb-4">{course.title}</div>
      <div className="flex justify-between text-sm border-b mb-2">
        <p className="text-gray-700 mb-3">{course.duration}</p>
        <p className="text-gray-700 mb-3">{course.students} Students</p>
      </div>
      <div className="text-sm flex justify-between mb-4 items-center">
        <p className="text-gray-500 text-sm">
          <span className="line-through">{course.originalPrice}</span>{" "}
          <span
            className={`font-semibold ml-1 ${
              course.price === "Free" ? "text-green-600" : "text-red-600"
            }`}
          >
            {course.price}
          </span>
        </p>
        <Link href="" className="hover:underline font-semibold">
          View More
        </Link>
      </div>
    </div>
  </div>
);

const FeaturedCourses = () => {
  const displayedCourses = courses.slice(0, 6);

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
        <div className="mb-4 md:mb-0">
          <Link href="/AllCourses" legacyBehavior>
            <a className="border-2 hover:bg-orange-500 hover:text-white border-orange-500 text-gray-700 font-semibold text-sm px-8 py-3 rounded-full mb-4 md:mb-0">
              All Courses
            </a>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {displayedCourses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedCourses;

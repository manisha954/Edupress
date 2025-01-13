"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoGrid, IoSearch } from "react-icons/io5";
import { FaList, FaListAlt, FaPinterestP, FaYoutube } from "react-icons/fa";

interface Course {
  title: string;
  instructor: string;
  duration: string;
  students: number;
  price: string;
  originalPrice: string;
  category: string;
  image: string;
  level: string;
  reviews: number;
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
    level: "Beginner",
    reviews: 4.0,
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
    level: "Beginner",
    reviews: 4.0,
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
    level: "Beginner",
    reviews: 4.0,
  },
  {
    title: "Design A Website With ThimPress",
    instructor: "Determined-Poitras",
    duration: "2 Weeks",
    students: 156,
    price: "Paid",
    originalPrice: "$59.0",
    category: "Photography",
    image: "/images/thim.jpeg",
    level: "Intermediate",
    reviews: 4.2,
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
    level: "Beginner",
    reviews: 4.0,
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
    level: "Beginner",
    reviews: 4.0,
  },
  {
    title: "Design A Website With ThimPress",
    instructor: "Determined-Poitras",
    duration: "2 Weeks",
    students: 156,
    price: "Free",
    originalPrice: "$59.0",
    category: "Photography",
    image: "/images/thim.jpeg",
    level: "Intermediate",
    reviews: 4.2,
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
    level: "Beginner",
    reviews: 4.0,
  },
  {
    title: "Advanced JavaScript",
    instructor: "Jane Doe",
    duration: "3 Weeks",
    students: 200,
    price: "paid",
    originalPrice: "$129.0",
    category: "Development",
    image: "/images/study.jpg",
    level: "Advanced",
    reviews: 4.5,
  },
  {
    title: "Mastering React",
    instructor: "John Smith",
    duration: "4 Weeks",
    students: 300,
    price: "paid",
    originalPrice: "$199.0",
    category: "Development",
    image: "/images/LMS.jpg",
    level: "Intermediate",
    reviews: 4.7,
  },
];

const CourseCard = ({
  course,
  isGridView,
  onClick,
}: {
  course: Course;
  isGridView: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`relative rounded-xl overflow-hidden border border-gray-300 hover:shadow-xl transform transition-transform duration-300 hover:-translate-y-3 cursor-pointer ${
        isGridView ? "" : "flex"
      }`}
      onClick={onClick}
    >
      {isGridView ? (
        <>
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
              <span className="hover:underline font-semibold">View More</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="absolute top-2 left-2 bg-gray-800 text-white rounded-lg px-4 py-2 text-xs font-semibold">
            {course.category}
          </div>
          <img className="w-96 h-auto" src={course.image} alt={course.title} />
          <div className="px-6 py-4 w-full">
            <div className="text-gray-700 text-sm mb-3">
              by {course.instructor}
            </div>
            <div className="font-bold text-base mb-4">{course.title}</div>
            <div className=" space-x-6 flex text-sm border-b pb-8 mb-4">
              <div className="text-gray-700 text-sm mb-3">
                {course.duration}
              </div>
              <div className="text-gray-700 text-sm mb-3">
                {course.students} Students
              </div>
            </div>
            <div className=" flex justify-between">
              <div className="text-gray-500  text-sm mb-3">
                <span className="line-through">{course.originalPrice}</span>{" "}
                <span
                  className={`font-semibold ml-1 ${
                    course.price === "Free" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {course.price}
                </span>
              </div>
              <span className="hover:underline text-sm font-semibold">
                View More
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const AllCourses = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isGridView, setIsGridView] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedInstructor, setSelectedInstructor] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [selectedReview, setSelectedReview] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const filteredCourses = courses.filter(
    (course) =>
      (selectedCategory === "" || course.category === selectedCategory) &&
      (selectedInstructor === "" || course.instructor === selectedInstructor) &&
      (selectedPrice === "" || course.price === selectedPrice) &&
      (selectedLevel === "" || course.level === selectedLevel) &&
      (selectedReview === "" || course.reviews >= parseFloat(selectedReview)) &&
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [
    "Art & Design",
    "Development",
    "Marketing",
    "Photography",
  ];
  const instructors = Array.from(
    new Set(courses.map((course) => course.instructor))
  );
  const prices = ["Free", "Paid"];
  const levels = ["Beginner", "Intermediate", "Advanced"];
  const reviews = ["4.0", "4.5", "5.0"];
  const tags = [
    "Free Course",
    "Marketing",
    "Idea",
    "LMS",
    "WordPress",
    "Design",
  ];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? "" : category);
  };

  return (
    <div className="px-4 md:px-20 pt-24 pb-20 flex flex-col md:flex-row">
      <div className="w-full md:w-3/4">
        {selectedCourse ? (
          <div>
            <button
              onClick={() => setSelectedCourse(null)}
              className="bg-gray-400 text-white hover:bg-gray-500 px-4 py-2 text-xs font-semibold rounded-md mb-4"
            >
              &larr; Back
            </button>
            <h1 className="text-3xl font-semibold mb-4">
              {selectedCourse.title}
            </h1>
            <div className="text-gray-600 space-x-10 text-sm font-medium mb-4 flex items-center">
              <span className="ml-2 flex text-gray-500">
                {selectedCourse.students} Students
              </span>
            </div>
            <img
              className="w-full h-auto rounded-2xl mb-4"
              src={selectedCourse.image}
              alt={selectedCourse.title}
            />
            <p className="text-gray-700 text-sm mb-4">
              {selectedCourse.duration}
            </p>
          </div>
        ) : (
          <div>
            <div className="flex justify-between mb-6">
              <div>
                <h1 className="md:text-3xl text-2xl font-semibold mb-2">
                  All Courses
                </h1>
                <p className="text-gray-600 text-sm mb-6">
                  Explore all our courses
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-2 border-b-2 border-gray-700 w-60 text-sm pr-10"
                  />
                  <IoSearch className="absolute right-2 text-gray-500" />
                </div>
                <IoGrid
                  className={`cursor-pointer ${
                    isGridView ? "text-orange-500" : "text-gray-700"
                  }`}
                  onClick={() => setIsGridView(true)}
                />
                <FaListAlt
                  className={`cursor-pointer ${
                    !isGridView ? "text-orange-500" : "text-gray-700"
                  }`}
                  onClick={() => setIsGridView(false)}
                />
              </div>
            </div>
            <div
              className={`grid ${
                isGridView ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
              } gap-8`}
            >
              {filteredCourses.map((course, index) => (
                <CourseCard
                  key={index}
                  course={course}
                  isGridView={isGridView}
                  onClick={() => setSelectedCourse(course)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="w-full md:w-1/4 pl-0 md:pl-8 mt-8 md:mt-0">
        <div className="sticky top-24">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <ul>
            {categories.map((category, index) => (
              <li
                key={index}
                className={`mb-4 text-sm cursor-pointer flex items-center ${
                  selectedCategory === category
                    ? "text-gray-600 font-bold"
                    : "text-gray-700"
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                <input
                  type="checkbox"
                  checked={selectedCategory === category}
                  onChange={() => handleCategoryChange(category)}
                  className="mr-2"
                />
                {category}
              </li>
            ))}
            <li
              className={`cursor-pointer text-sm flex items-center ${
                selectedCategory === ""
                  ? "text-gray-600 font-bold"
                  : "text-gray-700"
              }`}
              onClick={() => setSelectedCategory("")}
            >
              <input
                type="checkbox"
                checked={selectedCategory === ""}
                onChange={() => setSelectedCategory("")}
                className="mr-2"
              />
              All
            </li>
          </ul>

          <h2 className="text-lg font-semibold mb-4 mt-8">Instructors</h2>
          <ul>
            {instructors.map((instructor, index) => (
              <li
                key={index}
                className={`mb-4 text-sm cursor-pointer flex items-center ${
                  selectedInstructor === instructor
                    ? "text-gray-600 font-bold"
                    : "text-gray-700"
                }`}
                onClick={() => setSelectedInstructor(instructor)}
              >
                <input
                  type="checkbox"
                  checked={selectedInstructor === instructor}
                  onChange={() => setSelectedInstructor(instructor)}
                  className="mr-2"
                />
                {instructor}
              </li>
            ))}
            <li
              className={`cursor-pointer text-sm flex items-center ${
                selectedInstructor === ""
                  ? "text-gray-600 font-bold"
                  : "text-gray-700"
              }`}
              onClick={() => setSelectedInstructor("")}
            >
              <input
                type="checkbox"
                checked={selectedInstructor === ""}
                onChange={() => setSelectedInstructor("")}
                className="mr-2"
              />
              All
            </li>
          </ul>

          <h2 className="text-lg font-semibold mb-4 mt-8">Price</h2>
          <ul>
            {prices.map((price, index) => (
              <li
                key={index}
                className={`mb-4 text-sm cursor-pointer flex items-center ${
                  selectedPrice === price
                    ? "text-gray-600 font-bold"
                    : "text-gray-700"
                }`}
                onClick={() => setSelectedPrice(price)}
              >
                <input
                  type="checkbox"
                  checked={selectedPrice === price}
                  onChange={() => setSelectedPrice(price)}
                  className="mr-2"
                />
                {price}
              </li>
            ))}
            <li
              className={`cursor-pointer text-sm flex items-center ${
                selectedPrice === ""
                  ? "text-gray-600 font-bold"
                  : "text-gray-700"
              }`}
              onClick={() => setSelectedPrice("")}
            >
              <input
                type="checkbox"
                checked={selectedPrice === ""}
                onChange={() => setSelectedPrice("")}
                className="mr-2"
              />
              All
            </li>
          </ul>

          <h2 className="text-lg font-semibold mb-4 mt-8">Level</h2>
          <ul>
            {levels.map((level, index) => (
              <li
                key={index}
                className={`mb-4 text-sm cursor-pointer flex items-center ${
                  selectedLevel === level
                    ? "text-gray-600 font-bold"
                    : "text-gray-700"
                }`}
                onClick={() => setSelectedLevel(level)}
              >
                <input
                  type="checkbox"
                  checked={selectedLevel === level}
                  onChange={() => setSelectedLevel(level)}
                  className="mr-2"
                />
                {level}
              </li>
            ))}
            <li
              className={`cursor-pointer text-sm flex items-center ${
                selectedLevel === ""
                  ? "text-gray-600 font-bold"
                  : "text-gray-700"
              }`}
              onClick={() => setSelectedLevel("")}
            >
              <input
                type="checkbox"
                checked={selectedLevel === ""}
                onChange={() => setSelectedLevel("")}
                className="mr-2"
              />
              All
            </li>
          </ul>

          <h2 className="text-lg  font-semibold mb-4 mt-8">Reviews</h2>
          <ul>
            {reviews.map((review, index) => (
              <li
                key={index}
                className={`mb-4 text-sm cursor-pointer flex items-center ${
                  selectedReview === review
                    ? "text-gray-600 font-bold"
                    : "text-gray-700"
                }`}
                onClick={() => setSelectedReview(review)}
              >
                <input
                  type="checkbox"
                  checked={selectedReview === review}
                  onChange={() => setSelectedReview(review)}
                  className="mr-2"
                />
                {review} & Up
              </li>
            ))}
            <li
              className={`cursor-pointer text-sm flex items-center ${
                selectedReview === ""
                  ? "text-gray-600 font-bold"
                  : "text-gray-700"
              }`}
              onClick={() => setSelectedReview("")}
            >
              <input
                type="checkbox"
                checked={selectedReview === ""}
                onChange={() => setSelectedReview("")}
                className="mr-2"
              />
              All
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AllCourses;

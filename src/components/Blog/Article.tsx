// pages/index.js
import Link from "next/link";
import React from "react";
interface Course {
  title: string;
  date: string;
  feature: string;
  image: string;
}
const courses = [
  {
    title: "Create An LMS Website With LearnPress",

    date: "Jan 24, 2023",
    feature:
      " Looking for an amazing and well-functional LearnPress WordPress THeme?...",
    image: "/images/LMS.jpg",
  },
  {
    title: "Design A Website With ThimPress",

    date: "Jan 24, 2023",
    feature:
      " Looking for an amazing and well-functional LearnPress WordPress THeme?...",
    image: "/images/thim.jpeg",
  },
  {
    title: "Best LearnPress WordPress Theme Collection for 2023",

    date: "Jan 24, 2023",
    feature:
      " Looking for an amazing and well-functional LearnPress WordPress THeme?...",
    image: "/images/study.jpeg",
  },
  {
    title: "Another Great Article",
    date: "Feb 10, 2023",
    feature: "Discover the best practices for creating a WordPress site...",
    image: "/images/article4.jpg",
  },
];

const CourseCard = ({ course }: { course: Course }) => (
  <div className="relative rounded-xl overflow-hidden border border-gray-300 hover:shadow-xl transform transition-transform duration-300 hover:-translate-y-3">
    <img className="w-full h-56" src={course.image} alt={course.title} />
    <div className="px-6 py-4">
      <div className="font-bold text-base mb-4">{course.title}</div>
      <div>
        <p className="text-gray-700 mb-3">{course.date}</p>
        <p className="text-gray-700 text-sm mb-3">{course.feature} </p>
      </div>
    </div>
  </div>
);

const Article = () => (
  <div className="px-4 md:px-20 pb-20">
    <div className="flex flex-col md:flex-row justify-between mb-4 md:mb-10">
      <div>
        <h1 className="md:text-3xl text-2xl font-semibold mb-2">
          Latest Articles
        </h1>
        <p className="text-gray-600 text-sm">Explore our Free Articles</p>
      </div>
      <div className="mt-4 md:mt-0">
        <Link href="/Blog" legacyBehavior>
          <a className="border-2 hover:bg-orange-500 hover:text-white border-orange-500 text-gray-700 font-semibold text-sm px-8 py-3 rounded-full">
            All Articles
          </a>
        </Link>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {courses.slice(0, 3).map((course, index) => (
        <CourseCard key={index} course={course} />
      ))}
    </div>
  </div>
);

export default Article;

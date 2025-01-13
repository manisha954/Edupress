import React from "react";
import { useRouter } from "next/router";

const CoursePage = () => {
  const router = useRouter();
  const { course } = router.query;
  const courseData = course ? JSON.parse(course as string) : null;

  if (!courseData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col md:flex-row p-4">
      <div className="md:w-2/3 p-4">
        <h1 className="text-3xl font-bold">{courseData.title}</h1>
        <p className="text-gray-500">by {courseData.instructor}</p>
        <div className="flex items-center space-x-4 mt-2">
          <span>{courseData.duration}</span>
          <span>{courseData.students} Students</span>
          <span>{courseData.level}</span>
        </div>
        <div className="mt-4">
          <div className="flex space-x-4 border-b">
            <button className="py-2 px-4 border-b-2 border-orange-500">
              Overview
            </button>
            <button className="py-2 px-4">Curriculum</button>
            <button className="py-2 px-4">Instructor</button>
            <button className="py-2 px-4">FAQs</button>
            <button className="py-2 px-4">Reviews</button>
          </div>
          <div className="mt-4">
            <p>
              LearnPress is a comprehensive WordPress LMS Plugin for WordPress.
              This is one of the best WordPress LMS Plugins which can be used to
              easily create & sell courses online. You can create a course
              curriculum with lessons & quizzes included which is managed with
              an easy-to-use interface for users. Having this WordPress LMS
              Plugin, now you have a chance to quickly and easily create
              education, online school, online-course websites with no coding
              knowledge required.
            </p>
            <p className="mt-2">
              LearnPress is free and always will be, but it is still a premium
              high-quality WordPress Plugin that definitely helps you with
              making money from your WordPress Based LMS. Just try and see how
              amazing it is. LearnPress WordPress Online Course plugin is
              lightweight and super powerful with lots of Add-Ons to empower its
              core system. How to use WPML Add-on for LearnPress?
            </p>
          </div>
        </div>
      </div>
      <div className="md:w-1/3 p-4 bg-gray-100 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-xl font-bold">{courseData.title}</h2>
          <p>with {courseData.instructor}</p>
          <div className="flex justify-center mt-4">
            <img
              src={courseData.image}
              alt={courseData.title}
              className="w-2/3"
            />
          </div>
          <div className="mt-4">
            <span className="line-through text-gray-500">{courseData.originalPrice}</span>
            <span className="text-red-500 text-2xl font-bold">{courseData.price}</span>
          </div>
          <button className="mt-4 bg-orange-500 text-white py-2 px-4 rounded">
            Start Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;

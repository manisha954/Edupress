import React from "react";
import Navbar from "./Navbar";
import FeaturedCourses from "./FeatureCourses";
import ExploreCourses from "./ExploreCourses";
import TopCategories from "./TopCategories";
import Cards from "./Cards";
import WordPress from "./Wordpress";
import StudentFeedback from "./StudentFeedback";
import Article from "../Blog/Article";
import Footer from "./Footer";

export default function HeroSection() {
  return (
    <div className=" bg-gray-50">
      <Navbar />
      {/* Hero */}
      <div className="relative h-screen">
        <img
          src="/images/hero.jpg"
          alt="Hero Image"
          className="h-screen w-full object-cover"
        />
        <div className="absolute px-4 md:px-20 inset-0 flex flex-col justify-center items-start pt-20">
          <h1 className="md:text-5xl text-4xl font-semibold mb-6 text-gray-800">
            Build Skills with <br /> Online Course
          </h1>
          <p className="text-base mb-6 space-y-8 max-w-lg text-gray-800">
            We denounce with righteous indignation and dislike men who are so
            beguiled and demoralized that cannot trouble.
          </p>
          <button className="bg-orange-500 text-white py-3 px-7 text-sm font-semibold rounded-full hover:border-orange-500 hover:border-2 hover:bg-transparent hover:text-orange-500 transition">
            Post Comments
          </button>
        </div>
      </div>
      <TopCategories /> <FeaturedCourses />
      <ExploreCourses />
      <Cards />
      <WordPress />
      <StudentFeedback />
      <Article />
      <Footer />
    </div>
  );
}

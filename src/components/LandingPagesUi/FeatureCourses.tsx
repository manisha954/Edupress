import React from "react";

const LMSLandingPage = () => {
  return (
    <div className="min-h-screen  text-white">
      {/* Header Section */}
      <div className="p-8 bg-black">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-gray-600 px-3 py-1 rounded-md">Photography</span>
          <span className="text-gray-400">by Determined-Poitras</span>
        </div>

        <h1 className="text-4xl font-bold mb-8">
          The Ultimate Guide To The Best WordPress LMS Plugin
        </h1>

        {/* Course Stats */}
        <div className="flex gap-6 text-sm text-gray-300">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full" />
            <span>2 Weeks</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full" />
            <span>156 Students</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full" />
            <span>All levels</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full" />
            <span>20 Lessons</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-500 rounded-full" />
            <span>3 Quizzes</span>
          </div>
        </div>
      </div>

      {/* Course Price Card */}
      <div className="fixed top-4 right-14 bg-white rounded-lg shadow-lg p-6 w-80">
        <div className="mb-4">
          <img
            src="/images/study.jpeg"
            alt="LearnPress Plugin"
            className="w-full rounded-lg"
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 line-through">$59.0</span>
            <span className="text-red-500 text-xl font-bold">$49.0</span>
          </div>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600">
            Start Now
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="">
        <div className="flex border-b max-w-xl">
          <button className="px-8 py-4 hover:bg-gray-500">Overview</button>
          <button className="px-8 py-4 hover:bg-gray-500">Curriculum</button>
          <button className="px-8 py-4 hover:bg-gray-500">Instructor</button>
          <button className="px-8 py-4 hover:bg-gray-500">FAQs</button>
          <button className="px-8 py-4 bg-gray-500">Reviews</button>
        </div>

        {/* Reviews Section */}
      </div>
    </div>
  );
};

export default LMSLandingPage;

import React from "react";

export default function ExploreCourses() {
  return (
    <div>
      <div className="relative md:px-20 px-4 pb-20">
        <img
          src="/images/explorecourse.jpg"
          alt="Hero Image"
          className="rounded-2xl "
        />
        <div className="absolute top-12 md:left-32 left-8 text-white">
          <p className=" text-gray-600 mb-2 uppercase text-sm font-semibold">
            Get More Power From{" "}
          </p>
          <h1 className="text-3xl font-semibold  text-gray-800 mb-4">
            LearnPress Add-Ons
          </h1>
          <p className="text-sm mb-4 max-w-sm text-gray-700">
            The next level of LearnPress -LMS WordPress Plugin. More Powerful,
            Flexible and Magical Inside.
          </p>
          <button className="bg-orange-500 text-white py-3 px-7 text-sm font-semibold rounded-full hover:border-orange-500 hover:border-2 hover:bg-transparent hover:text-orange-500 transition">
            Explorer Course
          </button>
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function WordPress() {
  return (
    <div>
      <div className="relative md:px-20 px-4 pb-20">
        <img
          src="/images/wordpressimg.jpg"
          alt="Hero Image"
          className="rounded-2xl"
        />
        <div className="absolute inset-0 flex flex-col -top-20 items-center justify-center text-center text-white">
          <p className="text-gray-600 mb-2 uppercase text-sm font-semibold">
            Providing Amazing{" "}
          </p>
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            Education WordPress Theme
          </h1>
          <p className="text-sm mb-4 max-w-lg text-gray-700">
            The next level of LMS WordPress Theme. Learn anytime and everythng.
          </p>
          <button className="bg-orange-500 text-white py-3 px-7 text-sm font-semibold rounded-full hover:border-orange-500 hover:border-2 hover:bg-transparent hover:text-orange-500 transition">
            Explorer Course
          </button>
        </div>
      </div>
    </div>
  );
}

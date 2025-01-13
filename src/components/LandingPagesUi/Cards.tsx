// pages/index.js
import Head from "next/head";
import { CheckIcon } from "@heroicons/react/16/solid";

const categories = [
  { name: "Active Students", total: 25 },
  { name: "Total Courses", total: 388 },
  { name: "Instructor", total: 158 },
  { name: "Satisfaction Rate", total: 100 },
];

export default function Cards() {
  return (
    <div className="px-4 md:px-20 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {categories.map((category) => (
            <div
              key={category.name}
              className="py-10 border border-gray-200 hover:shadow-lg rounded-xl bg-gray-100 text-center"
            >
              <h1 className="text-3xl font-sans text-orange-500 mb-3 font-medium">
                {category.total}
              </h1>
              <h2 className="text-base font-sans font-semibold mb-2">
                {category.name}
              </h2>
            </div>
          ))}
        </div>
      </div>

      <div className="grid pt-16 grid-cols-1 md:grid-cols-2 gap-14">
        <div>
          <img
            src="/images/ellustration.png"
            alt=""
            className="w-full h-full"
          />
        </div>
        <div className="items-center justify-center mx-auto py-6 max-w-lg">
          <h1 className="text-3xl font-sans font-semibold max-w-xs mb-6">
            Grow Us Your Skill With LearnPress LMS
          </h1>
          <p className="text-gray-600 text-base mb-4">
            We denounce with righteous indignation and dislike men who are so
            beguiled and demoralized that cannot trouble.
          </p>
          <ul className="text-sm space-y-4">
            <li className="flex items-center">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
              Certification
            </li>
            <li className="flex items-center">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
              Certification
            </li>
            <li className="flex items-center">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
              Certification
            </li>
            <li className="flex items-center">
              <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
              Certification
            </li>
          </ul>
          <button className="bg-orange-500 text-white mt-4 py-3 px-7 text-sm font-semibold rounded-full hover:border-orange-500 hover:border-2 hover:bg-transparent hover:text-orange-500 transition">
            Explorer Course
          </button>
        </div>
      </div>
    </div>
  );
}

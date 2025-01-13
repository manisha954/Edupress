// pages/index.js
import React from "react";

const feedbacks = [
  {
    text: "I must explain to you how all this mistaken. Idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound",
    name: "Roe Smith",
    title: "Designer",
  },
  {
    text: "I must explain to you how all this mistaken. Idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound",
    name: "Roe Smith",
    title: "Designer",
  },
  {
    text: "I must explain to you how all this mistaken. Idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound",
    name: "Roe Smith",
    title: "Designer",
  },
  {
    text: "I must explain to you how all this mistaken. Idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound",
    name: "Roe Smith",
    title: "Designer",
  },
];

export default function StudentFeedback() {
  return (
    <div>
      <div className="pb-20 flex flex-col items-center py-2">
        <h1 className="md:text-3xl text-2xl font-bold mb-2">
          Student Feedbacks
        </h1>
        <p className="text-gray-600 text-sm md:text-base mb-6 md:mb-12">
          What Students Say About Academy LMS
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4 sm:px-10 md:px-20 gap-8">
          {feedbacks.map((feedback, index) => (
            <div
              key={index}
              className="border border-gray-300 p-6 hover:shadow-lg rounded-xl transform transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="text-4xl text-gray-400 mb-4">“</div>
              <p className="text-gray-900 text-base mb-4">{feedback.text}</p>
              <h3 className="text-lg font-semibold">{feedback.name}</h3>
              <p className="text-gray-500 text-sm">{feedback.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative px-4 sm:px-10 md:px-20 mb-20">
        <div className="relative">
          <img
            src="/images/student.jpg"
            alt="Hero Image"
            className="rounded-2xl w-full h-auto"
          />
          <div className="absolute inset-0 flex flex-col sm:flex-row items-center justify-between p-4 sm:p-10 md:p-32">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="bg-white rounded-full h-24 w-24 flex items-center justify-center">
                <img
                  src="https://png.pngtree.com/png-clipart/20230419/original/pngtree-graduate-woman-line-icon-png-image_9067258.png"
                  alt=""
                  className="h-20"
                />
              </div>
              <h1 className="text-gray-800 text-lg font-semibold ml-6">
                Let&apos;s Start with Academy LMS
              </h1>
            </div>
            <div className="flex space-x-4">
              <button className="text-orange-500 border-2 border-orange-500 hover:bg-orange-500 hover:text-white py-3 px-7 text-sm font-semibold rounded-full hover:border-orange-500 transition">
                I &apos;m A Student
              </button>
              <button className="bg-orange-500 text-white py-3 px-7 text-sm font-semibold rounded-full hover:border-orange-500 hover:border-2 hover:bg-transparent hover:text-orange-500 transition">
                Become An Instructor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

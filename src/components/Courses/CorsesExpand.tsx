"use client";
import React, { useState } from "react";
import Navbar from "../LandingPagesUi/Navbar";
import Footer from "../LandingPagesUi/Footer";

const CoursePage = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [expandedLessonId, setExpandedLessonId] = useState(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleLessonToggle = (lessonId: any) => {
    setExpandedLessonId((prevLessonId) =>
      prevLessonId === lessonId ? null : lessonId
    );
  };

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What Does Royalty Free Mean?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    },
    {
      question: "How Do I Subscribe?",
      answer:
        "Cras facilisis faucibus odio arcu duis dui, adipiscing facilisis...",
    },
    {
      question: "Can I Cancel Anytime?",
      answer:
        "Urna, donec turpis egestas volutpat. Quisque nec non amet quis...",
    },
    {
      question: "What Payment Methods Are Accepted?",
      answer:
        "Varius tellus justo odio parturient mauris curabitur lorem in...",
    },
  ];

  const renderTabContent = () => {
    if (activeTab === "Overview") {
      return (
        <div>
          <p>
            LearnPress is a comprehensive WordPress LMS Plugin for WordPress.
            This is one of the best WordPress LMS Plugins which can be used to
            easily create & sell courses online. You can create a course
            curriculum with lessons & quizzes included which is managed with an
            easy-to-use interface for users. Having this WordPress LMS Plugin,
            now you have a chance to quickly and easily create education, online
            school, online-course websites with no coding knowledge required.
          </p>
          <p className="mt-2">
            LearnPress is free and always will be, but it is still a premium
            high-quality WordPress Plugin that definitely helps you with making
            money from your WordPress Based LMS. Just try and see how amazing it
            is. LearnPress WordPress Online Course plugin is lightweight and
            super powerful with lots of Add-Ons to empower its core system. How
            to use WPML Add-on for LearnPress?
          </p>
        </div>
      );
    } else if (activeTab === "Curriculum") {
      const lessons = [
        {
          id: 1,
          title: "Lesson 1: Introduction to LearnPress",
          duration: "12:30",
          content: "Content for Lesson 1",
        },
        {
          id: 2,
          title: "Lesson 2: Setting Up Your First Course",
          duration: "10:05",
          content: "Content for Lesson 2",
        },
        {
          id: 3,
          title: "Lesson 3: Creating Quizzes",
          duration: "2:25",
          content: "Content for Lesson 3",
        },
        // Add more lessons here
      ];

      return (
        <div>
          <h2 className="text-xl font-bold">Curriculum</h2>
          <div className="mt-4">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="border rounded-lg p-4 mb-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => handleLessonToggle(lesson.id)}
                >
                  <h3 className="font-semibold">{lesson.title}</h3>
                  <span className="ml-2 text-gray-500">{lesson.duration}</span>
                </div>
                {expandedLessonId === lesson.id && (
                  <div className="mt-2">
                    <p>{lesson.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    } else if (activeTab === "Instructor") {
      return (
        <div>
          <h2 className="text-xl font-bold">ThimPress</h2>
          <p>
            LearnPress is a comprehensive WordPress LMS Plugin for WordPress.
            This is one of the best WordPress LMS Plugins which can be used to
            easily create & sell courses online.
          </p>
          <div className="flex items-center mt-2">
            <span className="font-bold text-gray-800 mr-4">
              👨‍🎓 156 Students
            </span>
            <span className="font-bold text-gray-800">📘 20 Lessons</span>
          </div>
          <p className="mt-2">
            LearnPress is a comprehensive WordPress LMS Plugin for WordPress.
            This is one of the best WordPress LMS Plugins which can be used to
            easily create & sell courses online.
          </p>
          <div className="mt-4">
            <p className="font-bold">Follow:</p>
            <div className="flex space-x-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/facebook-icon.png"
                  alt="Facebook"
                  className="w-6 h-6"
                />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/pinterest-icon.png"
                  alt="Pinterest"
                  className="w-6 h-6"
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/twitter-icon.png"
                  alt="Twitter"
                  className="w-6 h-6"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/instagram-icon.png"
                  alt="Instagram"
                  className="w-6 h-6"
                />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/youtube-icon.png"
                  alt="YouTube"
                  className="w-6 h-6"
                />
              </a>
            </div>
          </div>
        </div>
      );
    } else if (activeTab === "FAQs") {
      return (
        <div>
          <div className="max-w-5xl mx-auto pt-4 mb-12 px-4">
            <div className="">
              {faqs.map((faq, index) => (
                <div className="mb-4" key={index}>
                  <div
                    className={`flex justify-between items-center px-6 py-4 rounded-lg cursor-pointer ${
                      openIndex === index
                        ? "bg-gray-200 text-orange-500"
                        : "bg-gray-100 text-gray-700"
                    }`}
                    onClick={() => handleClick(index)}
                  >
                    <span className="text-sm font-semibold">
                      {faq.question}
                    </span>
                    <span className="text-base font-bold">
                      {openIndex === index ? "-" : "+"}
                    </span>
                  </div>
                  {openIndex === index && (
                    <div className="px-6 py-4 text-sm bg-white border-b">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    } else if (activeTab === "Reviews") {
      return (
        <div>
          {" "}
          <h2 className="text-xl font-bold">Student Reviews</h2>{" "}
          <div className="mt-4">
            {" "}
            <div className="border rounded-lg p-4 mb-4">
              {" "}
              <p className="font-semibold">Jane Doe</p>{" "}
              <p className="text-gray-500">⭐⭐⭐⭐⭐</p>{" "}
              <p className="mt-2">
                {" "}
                This course was very informative and the instructor was great! I
                learned a lot about using LearnPress to create my own courses.{" "}
              </p>{" "}
            </div>{" "}
            <div className="border rounded-lg p-4 mb-4">
              {" "}
              <p className="font-semibold">John Smith</p>{" "}
              <p className="text-gray-500">⭐⭐⭐⭐</p>{" "}
              <p className="mt-2">
                {" "}
                The course covered all the basics and the examples were very
                helpful. Highly recommend!{" "}
              </p>{" "}
            </div>{" "}
            {/* Add more reviews here */}{" "}
          </div>{" "}
        </div>
      );
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex py-24 flex-col md:flex-row p-4">
        <div className="md:w-2/3 p-4">
          <h1 className="text-3xl font-bold">
            The Ultimate Guide To The Best WordPress LMS Plugin
          </h1>
          <p className="text-gray-500">by Determined-Poitras</p>
          <div className="flex items-center space-x-4 mt-2">
            <span>2 Weeks</span>
            <span>156 Students</span>
            <span>All levels</span>
            <span>20 Lessons</span>
            <span>3 Quizzes</span>
          </div>
          <div className="mt-4">
            <div className="flex space-x-4 border-b">
              <button
                className={`py-2 px-4 ${
                  activeTab === "Overview"
                    ? "border-b-2 border-orange-500 font-semibold text-orange-400 bg-gray-100"
                    : ""
                }`}
                onClick={() => setActiveTab("Overview")}
              >
                Overview
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "Curriculum"
                    ? "border-b-2 border-orange-500 font-semibold text-orange-400 bg-gray-100"
                    : ""
                }`}
                onClick={() => setActiveTab("Curriculum")}
              >
                Curriculum
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "Instructor"
                    ? "border-b-2 border-orange-500 font-semibold text-orange-400 bg-gray-100"
                    : ""
                }`}
                onClick={() => setActiveTab("Instructor")}
              >
                Instructor
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "FAQs"
                    ? "border-b-2 border-orange-500 font-semibold text-orange-400 bg-gray-100"
                    : ""
                }`}
                onClick={() => setActiveTab("FAQs")}
              >
                FAQs
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "Reviews"
                    ? "border-b-2 border-orange-500 font-semibold text-orange-400 bg-gray-100"
                    : ""
                }`}
                onClick={() => setActiveTab("Reviews")}
              >
                Reviews
              </button>
            </div>
            <div className="mt-4">{renderTabContent()}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CoursePage;

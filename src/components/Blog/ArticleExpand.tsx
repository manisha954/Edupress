"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../LandingPage.tsx/Navbar";
import Footer from "../LandingPage.tsx/Footer";

const BlogPost = () => {
  const searchParams = useSearchParams();
  const article = searchParams ? searchParams.get("article") : null;

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4 flex flex-col md:flex-row">
        <div className="md:w-3/4">
          {article ? (
            (() => {
              const articleData = JSON.parse(decodeURIComponent(article));
              return (
                <div>
                  <h1 className="text-3xl font-semibold mb-4">{articleData.title}</h1>
                  <div className="text-gray-600 mb-4">{articleData.date}</div>
                  <img
                    className="w-full h-auto mb-4"
                    src={articleData.image}
                    alt={articleData.title}
                  />
                  <p className="text-gray-700 mb-4">{articleData.feature}</p>
                  {/* Add more details about the article here */}
                </div>
              );
            })()
          ) : (
            <div>
              <header className="text-center my-8">
                <h1 className="text-4xl font-bold">
                  Best LearnPress WordPress Theme Collection For 2023
                </h1>
                <div className="flex justify-center items-center space-x-4 mt-4">
                  <span className="text-gray-600">Determined-poitras</span>
                  <span className="text-gray-600">|</span>
                  <span className="text-gray-600">Jan 24, 2023</span>
                  <span className="text-gray-600">|</span>
                  <span className="text-gray-600">20 Comments</span>
                </div>
              </header>
              <main className="flex flex-col md:flex-row">
                <div className="md:w-3/4">
                  <img
                    src="/path/to/illustration.png"
                    alt="EDUMA illustration"
                    className="w-full h-auto"
                  />
                  <div className="mt-8">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                      nisl eros, pulvinar facilisis justo mollis, auctor consequat urna.
                      Morbi a bibendum metus. Donec scelerisque sollicitudin enim eu
                      venenatis.
                    </p>
                    <p className="mt-4">
                      Duis tincidunt vehicula mauris, nec fringilla nunc pharetra et.
                      Pellentesque ultrices pellentesque dapibus. Nulla venenatis turpis
                      ac libero feugiat, sit amet auctor arcu venenatis.
                    </p>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-bold mb-2">Tags</h3>
                    <div className="flex flex-wrap">
                      <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        Free courses
                      </span>
                      <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        Marketing
                      </span>
                      <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        Idea
                      </span>
                      <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        LMS
                      </span>
                      <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        LearnPress
                      </span>
                      <span className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        Instructor
                      </span>
                    </div>
                  </div>
                  <div className="mt-8">
                    <h3 className="text-lg font-bold mb-2">Share</h3>
                    <div className="flex space-x-4">
                      <a href="#" className="text-blue-500">
                        <i className="fab fa-facebook"></i> Facebook
                      </a>
                      <a href="#" className="text-red-500">
                        <i className="fab fa-pinterest"></i> Pinterest
                      </a>
                      <a href="#" className="text-blue-400">
                        <i className="fab fa-twitter"></i> X
                      </a>
                      <a href="#" className="text-pink-500">
                        <i className="fab fa-instagram"></i> Instagram
                      </a>
                      <a href="#" className="text-red-600">
                        <i className="fab fa-youtube"></i> YouTube
                      </a>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-between">
                    <a href="#" className="text-blue-500">
                      &larr; Prev Articles
                    </a>
                    <span className="text-gray-600">
                      Best LearnPress WordPress Theme Collection For 2023
                    </span>
                  </div>
                </div>
              </main>
            </div>
          )}
        </div>
        <aside className="md:w-1/4 md:pl-8 mt-8 md:mt-0">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Category</h2>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Commercial</span>
                <span>15</span>
              </li>
              <li className="flex justify-between">
                <span>Office</span>
                <span>15</span>
              </li>
              <li className="flex justify-between">
                <span>Shop</span>
                <span>15</span>
              </li>
              <li className="flex justify-between">
                <span>Educate</span>
                <span>15</span>
              </li>
              <li className="flex justify-between">
                <span>Academy</span>
                <span>15</span>
              </li>
              <li className="flex justify-between">
                <span>Single family home</span>
                <span>15</span>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Recent Posts</h2>
            <ul className="space-y-4">
              <li className="flex items-center space-x-4">
                <img
                  src="/path/to/image1.png"
                  alt="Post 1"
                  className="w-16 h-16 object-cover"
                />
                <span>Best LearnPress WordPress Theme Collection For 2023</span>
              </li>
              <li className="flex items-center space-x-4">
                <img
                  src="/path/to/image2.png"
                  alt="Post 2"
                  className="w-16 h-16 object-cover"
                />
                <span className="text-orange-500">
                  Best LearnPress WordPress Theme Collection For 2023
                </span>
              </li>
              <li className="flex items-center space-x-4">
                <img
                  src="/path/to/image3.png"
                  alt="Post 3"
                  className="w-16 h-16 object-cover"
                />
                <span>Best LearnPress WordPress Theme Collection For 2023</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPost;

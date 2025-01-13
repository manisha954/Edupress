"use client";
import Link from "next/link";
import React, { useState } from "react";

import { IoGrid, IoSearch } from "react-icons/io5";
import { FaList, FaPinterestP, FaYoutube } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { SiVexxhost } from "react-icons/si";
import Footer from "../LandingPagesUi/Footer";
import Navbar from "../LandingPagesUi/Navbar";

interface Comment {
  name: string;
  date: string;
  text: string;
  image: string;
}

interface Article {
  title: string;
  date: string;
  feature: string;
  image: string;
  comments: Comment[];
}

const articles: Article[] = [
  {
    title: "Best LearnPress WordPress Theme Collection for 2023",
    date: "Jan 24, 2023",
    feature:
      "Looking for an amazing and well-functional LearnPress WordPress Theme?...",
    image: "/images/study.jpeg",
    comments: [
      {
        name: "Laura Hipster",
        date: "October 03, 2022",
        text: "Great article!",
        image: "/images/commentor.jpg",
      },
      {
        name: "John Doe",
        date: "October 04, 2022",
        text: "Very informative.",
        image: "/images/commentor.jpg",
      },
      {
        name: "Jane Smith",
        date: "October 05, 2022",
        text: "Thanks for sharing!",
        image: "/images/commentor.jpg",
      },
    ],
  },
  {
    title: "Create An LMS Website With LearnPress",
    date: "Jan 24, 2023",
    feature:
      "Looking for an amazing and well-functional LearnPress WordPress THeme?...",
    image: "/images/LMS.jpg",
    comments: [
      {
        name: "Laura Hipster",
        date: "October 03, 2022",
        text: "Helpful tips!",
        image: "/images/commentor.jpg",
      },
      {
        name: "John Doe",
        date: "October 04, 2022",
        text: "I learned a lot.",
        image: "/images/commentor.jpg",
      },
      {
        name: "Jane Smith",
        date: "October 05, 2022",
        text: "Awesome content!",
        image: "/images/commentor.jpg",
      },
    ],
  },
  {
    title: "Design A Website With ThimPress",
    date: "Jan 24, 2023",
    feature:
      "Looking for an amazing and well-functional LearnPress WordPress THeme?...",
    image: "/images/thim.jpeg",
    comments: [
      {
        name: "Laura Hipster",
        date: "October 03, 2022",
        text: "Great design tips!",
        image: "/images/commentor.jpg",
      },
      {
        name: "John Doe",
        date: "October 04, 2022",
        text: "Very useful.",
        image: "/images/commentor.jpg",
      },
      {
        name: "Jane Smith",
        date: "October 05, 2022",
        text: "Loved it!",
        image: "/images/commentor.jpg",
      },
    ],
  },
  {
    title: "Best LearnPress WordPress Theme Collection for 2023",
    date: "Jan 24, 2023",
    feature:
      "Looking for an amazing and well-functional LearnPress WordPress THeme?...",
    image: "/images/study.jpeg",
    comments: [
      {
        name: "Laura Hipster",
        date: "October 03, 2022",
        text: "Excellent themes!",
        image: "/images/commentor.jpg",
      },
      {
        name: "John Doe",
        date: "October 04, 2022",
        text: "Very helpful.",
        image: "/images/commentor.jpg",
      },
      {
        name: "Jane Smith",
        date: "October 05, 2022",
        text: "Thanks for the info!",
        image: "/images/commentor.jpg",
      },
    ],
  },
  {
    title: "Another Great Article",
    date: "Feb 10, 2023",
    feature: "Discover the best practices for creating a WordPress site...",
    image: "/images/LMS.jpg",
    comments: [
      {
        name: "Laura Hipster",
        date: "October 03, 2022",
        text: "Great read!",
        image: "/images/commentor.jpg",
      },
      {
        name: "John Doe",
        date: "October 04, 2022",
        text: "Very insightful.",
        image: "/images/commentor.jpg",
      },
      {
        name: "Jane Smith",
        date: "October 05, 2022",
        text: "Appreciate the tips!",
        image: "/images/commentor.jpg",
      },
      {
        name: "John Doe",
        date: "October 04, 2022",
        text: "Very insightful.",
        image: "/images/commentor.jpg",
      },
      {
        name: "John Doe",
        date: "October 04, 2022",
        text: "Very insightful.",
        image: "/images/commentor.jpg",
      },
    ],
  },
  // ...more articles...
];

const ArticleCard = ({
  article,
  isGridView,
  onClick,
}: {
  article: Article;
  isGridView: boolean;
  onClick: () => void;
}) => {
  if (!article) return null;

  const truncateFeature = (feature: string) => {
    const words = feature.split(" ");
    if (words.length > 10) {
      return words.slice(0, 10).join(" ") + "...";
    }
    return feature;
  };

  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl overflow-hidden border border-gray-300 hover:shadow-xl transform transition-transform duration-300 hover:-translate-y-3 cursor-pointer flex ${
        isGridView ? "flex-col" : "flex-row"
      }`}
    >
      <img
        className={`${isGridView ? "w-full h-auto" : "w-96 h-auto"}`}
        src={article.image}
        alt={article.title}
      />
      <div className={`px-6 py-4 ${isGridView ? "w-full" : "w-1/2"}`}>
        <div className="font-bold text-base mb-4">{article.title}</div>
        <div className="text-gray-700 mb-3">{article.date}</div>
        <div className="text-gray-700 text-sm mb-3">
          {truncateFeature(article.feature)}
        </div>
      </div>
    </div>
  );
};

const AllArticle = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isGridView, setIsGridView] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory
        ? article.title.toLowerCase().includes(selectedCategory.toLowerCase())
        : true)
  );

  const categories = ["Development", "WordPress", "Marketing", "Design"];
  const tags = [
    "Free Course",
    "Marketing",
    "Idea",
    "LMS",
    "WordPress",
    "Design",
  ];
  const recentPosts = articles
    .filter((article) =>
      selectedCategory
        ? selectedCategory === "All"
          ? true
          : article.title.toLowerCase().includes(selectedCategory.toLowerCase())
        : article.title.toLowerCase().includes("course")
    )
    .slice(0, 5);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handleReplyClick = (index: number, event: React.MouseEvent) => {
    event.preventDefault();
    setReplyingTo(replyingTo === index ? null : index);
  };

  return (
    <div>
      <Navbar />
      <div className="px-4 md:px-20 pt-24 pb-20 flex flex-col md:flex-row">
        <div className="w-full md:w-3/4">
          {selectedArticle ? (
            <div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="bg-gray-400 text-white hover:bg-gray-500 px-4 py-2 text-xs font-semibold rounded-md mb-4"
              >
                &larr; Back
              </button>
              <h1 className="text-3xl font-semibold mb-4">
                {selectedArticle.title}
              </h1>
              <div className="text-gray-600 space-x-10 text-sm font-medium mb-4 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 mr-1 text-orange-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
                  />
                </svg>
                {selectedArticle.date}
                <span className="ml-2 flex text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4 text-orange-500 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                    />
                  </svg>
                  {selectedArticle.comments.length} Comments
                </span>
              </div>
              <img
                className="w-full h-auto rounded-2xl mb-4"
                src={selectedArticle.image}
                alt={selectedArticle.title}
              />
              <p className="text-gray-700 text-sm mb-4">
                {selectedArticle.feature}
              </p>
              <div className="mt-8 flex">
                <h2 className="text-base text-center items-center justify-center font-medium mr-6 text-gray-600 ">
                  Tags:
                </h2>
                <ul className="flex  gap-2">
                  {tags.map((tag, index) => (
                    <li
                      key={index}
                      className={`cursor-pointer text-sm px-4 py-1.5 rounded-md border-2 text-gray-700`}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 flex">
                <h3 className="text-base text-center items-center justify-center font-medium mr-6 text-gray-600 ">
                  Share:
                </h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-600  ">
                    <FaFacebookF className="size-4" />
                  </a>
                  <a href="#" className="text-orange-500  font-semibold">
                    <FaPinterestP className="size-4" />
                  </a>
                  <a href="#" className="text-gray-600  ">
                    <SiVexxhost className="size-4" />
                  </a>
                  <a href="#" className="text-gray-600  ">
                    <RiInstagramFill className="size-4" />
                  </a>
                  <a href="#" className="text-gray-600  ">
                    <FaYoutube className="size-4" />
                  </a>
                </div>
              </div>
              <div className="mt-8">
                <h3 className="text-lg font-bold mb-2">Comments</h3>
                <h3 className="border-b-2  text-gray-600 pb-4 mb-4">
                  {" "}
                  {selectedArticle.comments.length} comments
                </h3>
                <ul className="space-y-4 ">
                  {selectedArticle.comments.map((comment, index) => (
                    <li key={index} className=" p-4 border-b-2">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <img
                            src={comment.image}
                            alt={comment.name}
                            className="w-10  rounded-full mr-2"
                          />
                          <span className="font-bold text-base">
                            {comment.name}
                          </span>
                        </div>
                        <span className="text-gray-600 text-sm">
                          {comment.date}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm">{comment.text}</p>
                      <a
                        href="#"
                        className=" text-sm font-semibold   text-blue-500"
                        onClick={(event) => handleReplyClick(index, event)}
                      >
                        Reply
                      </a>
                      {replyingTo === index && (
                        <div className="mt-2">
                          <textarea
                            className="w-full p-2 text-xs border border-gray-300 rounded-md"
                            placeholder="Write your reply..."
                          ></textarea>
                          <button className="mt-2 bg-orange-500 text-xs hover:bg-transparent hover:border-2 hover:text-orange-500 hover:border-orange-500 font-semibold text-white px-4 py-2 rounded-md">
                            Submit
                          </button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Comment Section */}
              <div className="4 w-full px-4">
                <h2 className="text-2xl  font-semibold mb-4">
                  Leave a Comment
                </h2>
                <p className="mb-6 text-gray-600 text-base">
                  Your email address will not be published. Required fields are
                  marked *
                </p>
                <form className="flex flex-col space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name*"
                      className="px-4 py-2 text-sm border active:border-orange-500 border-gray-300 rounded-lg"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email*"
                      className="px-4 py-2 text-sm border active:border-orange-500 border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <textarea
                    name="comment"
                    placeholder="Comment"
                    className="px-4 py-2 border text-sm active:border-orange-500 border-gray-300 rounded-lg"
                    required
                  ></textarea>
                  <div className="flex items-center">
                    <input type="checkbox" id="saveInfo" className="mr-2" />
                    <label htmlFor="saveInfo" className="text-sm text-gray-600">
                      Save my name, email in this browser for the next time I
                      comment.
                    </label>
                  </div>
                  <input
                    type="submit"
                    value="Posts Comment"
                    className="px-2 py-3 w-40 text-sm font-semibold  hover:text-orange-500 hover:bg-transparent hover:border-orange-500 border-2 active:border-orange-500 border-gray-300 rounded-full bg-orange-500 text-white cursor-pointer"
                  />
                </form>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between mb-6">
                <div>
                  <h1 className="md:text-3xl text-2xl font-semibold mb-2">
                    All Articles
                  </h1>
                  <p className="text-gray-600 text-sm mb-6">
                    Explore all our articles
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative flex items-center">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="px-2 border-b-2 border-gray-700 w-60  text-sm pr-10"
                    />
                    <IoSearch className="absolute right-2 text-gray-500" />
                  </div>
                  <IoGrid
                    className={`cursor-pointer ${
                      isGridView ? "text-orange-500" : "text-gray-700"
                    }`}
                    onClick={() => setIsGridView(true)}
                  />
                  <FaList
                    className={`cursor-pointer ${
                      !isGridView ? "text-orange-500" : "text-gray-700"
                    }`}
                    onClick={() => setIsGridView(false)}
                  />
                </div>
              </div>
              <div
                className={`grid ${
                  isGridView ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"
                } gap-8`}
              >
                {filteredArticles.map((article, index) => (
                  <ArticleCard
                    key={index}
                    article={article}
                    isGridView={isGridView}
                    onClick={() => setSelectedArticle(article)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="w-full md:w-1/4 pl-0 md:pl-8 mt-8 md:mt-0">
          <div className="sticky top-24">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <ul>
              {categories.map((category, index) => (
                <li
                  key={index}
                  className={`mb-4 text-sm cursor-pointer flex items-center ${
                    category === selectedCategory
                      ? "text-gray-600 font-bold"
                      : "text-gray-700"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={category === selectedCategory}
                    onChange={() => handleCategoryChange(category)}
                  />
                  {category}
                </li>
              ))}
              <li
                className={`cursor-pointer text-sm flex items-center ${
                  selectedCategory === null
                    ? "text-gray-600 font-bold"
                    : "text-gray-700"
                }`}
              >
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedCategory === null}
                  onChange={() => handleCategoryChange(null)}
                />
                All
              </li>
            </ul>

            <h2 className="text-lg font-semibold mb-4 mt-8">Recent Posts</h2>
            <ul>
              {recentPosts.map((post, index) => (
                <li key={index} className="mb-4 text-sm">
                  <a
                    onClick={() => setSelectedArticle(post)}
                    className="hover:underline cursor-pointer"
                  >
                    {post.title}
                  </a>
                </li>
              ))}
            </ul>

            <h2 className="text-lg font-semibold mb-4 mt-8">Tags</h2>
            <ul className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <li
                  key={index}
                  className={`cursor-pointer text-sm px-4 py-1.5 rounded-md border-2 text-gray-700`}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllArticle;

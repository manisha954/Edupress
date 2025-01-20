/** @format */

"use client";
import React, { useEffect, useState } from "react";
import { FaDownload, FaVideo, FaKey, FaTasks } from "react-icons/fa";
import { BsPlayCircle } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";

export default function ArticleDetail({ article }: { article: any }) {
  console.table("article got in article detail", article);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  // const [totalChapter, setTotalChapter] = useState<number | null>(null);

  // Extract articleId from article
  const articleId = article?.articleId;

  // const chapterId = article?.articleChapter?.chapterId;
  // console.log("chapterId", chapterId);

  // console.log("article ID:", articleId);

  // Use react-query to fetch chapter details
  // const { data: chapterDetail } = useQuery({
  //   queryKey: ["article-chapters", articleId],
  //   queryFn: async () => (articleId),
  // });

  // useEffect(() => {
  //   if (chapterDetail?.success) {
  //     setTotalChapter(chapterDetail?.success);
  //     console.log("Total Chapters Count:", chapterDetail.success);
  //   } else if (chapterDetail?.error) {
  //     console.error("Error fetching chapter details:", chapterDetail.error);
  //     setTotalChapter(null);
  //   }
  // }, [chapterDetail]);

  // console.log("article count", totalChapter);
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  return (
    <div className="px-4 md:px-20 pt-24 pb-20 flex flex-col md:flex-row">
      <div className="w-full md:w-3/4">
        <h1 className="text-3xl font-semibold mb-4">{article?.articleTitle}</h1>
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
          {article?.date}
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
            {/* {article.comments.length} Comments */}
          </span>
        </div>
        <img
          className="w-full h-auto rounded-2xl mb-4"
          src={article?.articleImage}
          alt={article?.articleTitle}
        />
        <p className="text-gray-700 text-sm mb-4">
          {article?.articleDescription}
        </p>
        <div className="mt-8 flex">
          <h2 className="text-base text-center items-center justify-center font-medium mr-6 text-gray-600 ">
            Tags:
          </h2>
          <ul className="flex  gap-2">
            <li
              className={`cursor-pointer text-sm px-4 py-1.5 rounded-md border-2 text-gray-700`}
            >
              {article?.articleTags}
            </li>
          </ul>
        </div>
        <div className="mt-8 mb-12 flex">
          <h3 className="text-base text-center items-center justify-center font-medium mr-6 text-gray-600 ">
            Share:
          </h3>
          <div className="flex space-x-4">
            <a href="#" className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692V10.82h3.128V8.413c0-3.1 1.893-4.787 4.658-4.787 1.325 0 2.463.099 2.795.143v3.24h-1.917c-1.505 0-1.797.715-1.797 1.763v2.31h3.59l-.467 3.886h-3.123V24h6.117C23.407 24 24 23.407 24 22.675V1.325C24 .593 23.407 0 22.675 0z" />
              </svg>
            </a>
            <a href="#" className="text-orange-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M12 0C5.372 0 0 5.372 0 12c0 5.013 3.015 9.254 7.25 11.073-.101-.947-.191-2.403.038-3.444.21-.998 1.353-6.355 1.353-6.355s-.344-.689-.344-1.705c0-1.6.929-2.794 2.084-2.794.983 0 1.459.738 1.459 1.623 0 .99-.628 2.475-.951 3.851-.271 1.134.57 2.058 1.693 2.058 2.032 0 3.601-2.142 3.601-5.228 0-2.73-1.962-4.637-4.767-4.637-3.252 0-5.163 2.44-5.163 4.96 0 .99.379 2.054.852 2.631a.345.345 0 0 1 .08.329c-.091.361-.299 1.134-.34 1.292-.051.211-.161.256-.37.154-1.383-.644-2.245-2.661-2.245-4.287 0-3.496 2.542-6.706 7.327-6.706 3.846 0 6.83 2.741 6.83 6.406 0 3.813-2.418 6.891-5.771 6.891-1.125 0-2.182-.581-2.543-1.267l-.692 2.637c-.25.975-.93 2.195-1.388 2.941A11.957 11.957 0 0 0 12 24c6.628 0 12-5.372 12-12S18.628 0 12 0z" />
              </svg>
            </a>
            <a href="#" className="text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>
            </a>
            <a href="#" className="text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M7.75 2C4.44 2 2 4.44 2 7.75v8.5C2 19.56 4.44 22 7.75 22h8.5c3.31 0 5.75-2.44 5.75-5.75v-8.5C22 4.44 19.56 2 16.25 2h-8.5zM12 7.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm6.5-.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
              </svg>
            </a>
            <a href="#" className="text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M23.498 6.186a2.99 2.99 0 0 0-2.105-2.118C19.22 3.568 12 3.568 12 3.568s-7.22 0-9.393.5A2.99 2.99 0 0 0 .502 6.186 31.51 31.51 0 0 0 0 12a31.51 31.51 0 0 0 .502 5.814c.249 1.052 1.059 1.872 2.105 2.118C4.78 20.432 12 20.432 12 20.432s7.22 0 9.393-.5a2.99 2.99 0 0 0 2.105-2.118A31.51 31.51 0 0 0 24 12a31.51 31.51 0 0 0-.502-5.814zM9.75 15.568V8.432l6.25 3.568-6.25 3.568z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-bold mb-2">Comments</h3>
          <h3 className="border-b-2  text-gray-600 pb-4 mb-4">
            {" "}
            {/* {article.comments.length} comments */}
          </h3>
          <ul className="space-y-4 ">
            {/* {article.comments.map((comment, index) => (
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
              ))} */}
          </ul>
        </div>

        {/* Comment Section */}
        <div className="4 w-full px-4">
          <h2 className="text-2xl  font-semibold mb-4">Leave a Comment</h2>
          <p className="mb-6 text-gray-600 text-base">
            Your email address will not be published. Required fields are marked
            *
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
                Save my name, email in this browser for the next time I comment.
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
      <div className="w-full md:w-1/4 pl-0 md:pl-8 mt-8 md:mt-0">
        <div className="sticky top-24">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <ul>
            <li
              className={`mb-4 text-sm cursor-pointer flex items-center ${
                article?.articleCategory === selectedCategory
                  ? "text-gray-600 font-bold"
                  : "text-gray-700"
              }`}
            >
              <input
                type="checkbox"
                className="mr-2"
                checked={article?.articleCategory === selectedCategory}
                onChange={() => handleCategoryChange(article?.articleCategory)}
              />
              {article?.articleCategory}
            </li>

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
          {/* <ul>
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
          </ul> */}

          <h2 className="text-lg font-semibold mb-4 mt-8">Tags</h2>
          <ul className="flex flex-wrap gap-2">
            <li
              className={`cursor-pointer text-sm px-4 py-1.5 rounded-md border-2 text-gray-700`}
            >
              {article?.articleTags}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

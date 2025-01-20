/** @format */

"use client";
// main page side

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getArticleDetails } from "../Dash/WebsiteSetup/Blog/ArticleDetailsAction";

export default function Article() {
  const [articleDetails, setarticleDetails] = useState<any[]>([]);

  const { data: articleDetail } = useQuery({
    queryKey: ["feature"],
    queryFn: async () => getArticleDetails(),
  });

  useEffect(() => {
    if (articleDetail?.success) {
      setarticleDetails(articleDetail?.success);
    } else {
      setarticleDetails([]);
    }
  }, [articleDetail?.success]);

  console.log("article", articleDetail);

  return (
    <div className="px-4 md:px-20 pb-20">
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          <h1 className="md:text-3xl text-2xl font-semibold mb-2">
            Featured articles
          </h1>
          <p className="text-gray-600 text-sm mb-4 md:mb-10">
            Explore our Popular articles
          </p>
        </div>{" "}
        <div className="mb-10 md:mb-0">
          <Link href="/Allarticles" legacyBehavior>
            <a className="border-2 hover:bg-orange-500 hover:text-white border-orange-500 text-gray-700 font-semibold text-sm px-8 py-3 rounded-full mb-4 md:mb-0">
              All articles
            </a>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {articleDetails?.slice(0, 3).map((article: any, index: number) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
}

export const ArticleCard = ({ article }: { article: any }) => {
  return (
    <div className="relative rounded-xl overflow-hidden border border-gray-300 hover:shadow-xl transform transition-transform duration-300 hover:-translate-y-3">
      <img
        className="w-full h-56"
        src={article.articleImage}
        alt={article.articleTitle}
      />
      <div className="px-6 py-4">
        <Link
          href={`/articles/${article.articleTitle}/${article.articleId}`}
          // as={`/articles/${article.articleTitle}`}
        >
          <div className="font-bold text-base mb-4">{article.articleTitle}</div>
        </Link>
        <div>
          {" "}
          <div className=" flex space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4 text-orange-500"
            >
              <path
                fillRule="evenodd"
                d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-gray-700 text-base mb-3">{article.date}</p>
          </div>
          <p className="text-gray-700 text-sm mb-3">
            {article.articleDescription}{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

/** @format */

"use client";

import { getArticleSpecific } from "@/components/Dash/WebsiteSetup/Blog/ArticleDetailsAction";
import ArticleDetail from "@/components/LandingPage/AllArticles";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { useEffect, useState } from "react";

const BlogPost = () => {
  const params = useParams();

  // Ensure params is not null
  if (!params || !params.slug) {
    return <div>Error: Missing or invalid parameters.</div>;
  }

  const slug = params.slug;
  const [articleData, setArticleData] = useState<any>();

  // React Query to fetch article details
  const { data: articleDetailSp } = useQuery({
    queryKey: ["articleDetail", slug[1]],
    queryFn: async () => {
      if (slug[1]) {
        return getArticleSpecific(slug[1]);
      }
      return null; // Return null if slug[1] is not available
    },
    enabled: !!slug[1], // Ensure query runs only if slug[1] is available
  });

  useEffect(() => {
    if (articleDetailSp?.success) {
      setArticleData(articleDetailSp.success);
      console.log("Hello", articleDetailSp.success);
    }
  }, [articleDetailSp?.success]);

  return (
    <div>
      <ArticleDetail article={articleData} />
    </div>
  );
};

export default BlogPost;

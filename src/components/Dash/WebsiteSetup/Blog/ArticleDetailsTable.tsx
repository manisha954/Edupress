/** @format */

"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

import SuccessNotification from "@/components/UI/Notification/SuccessNotification";
import FailedNotification from "@/components/UI/Notification/FailedNotification";
import ConfirmButton from "@/components/UI/Button/ConfirmButton";
import Breadcrumb from "@/components/UI/Breadcrumb";
import PaginationTable from "@/components/UI/Table/PaginationTable";
import useArticleDetailsMutations from "./ArticleDetailsMutation";
import { getArticleDetails } from "./ArticleDetailsAction";
import ArticleForm from "./AddArticleDetails";

export default function ArticleTable() {
  const [articleItems, setarticleItems] = useState<any>([]);
  const [editItem, setEditItem] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openAddArticle, setOpenAddArticle] = useState<boolean>(false);

  const { deleteArticleDetail } = useArticleDetailsMutations();

  const { data: articleDetailsData, error } = useQuery({
    queryKey: [" articleDetails"],
    queryFn: async () => getArticleDetails(),
  });

  console.log(" articleDetails", articleDetailsData);

  useEffect(() => {
    if (articleDetailsData?.success) {
      setarticleItems(articleDetailsData?.success);
    } else {
      setarticleItems([]);
    }
  }, [articleDetailsData]);

  const handleEdit = (articleDetails: any) => {
    setEditItem(articleDetails);
    setOpenAddArticle(true); // Open the form for editing
  };

  const handleDelete = async (articleId: string) => {
    const deletearticle = await deleteArticleDetail(articleId);
    if (deletearticle?.success) {
      setSuccessMessage(deletearticle?.success);
      setarticleItems((prev: any) =>
        prev.filter((item: any) => item.articleId == articleId)
      );
    } else {
      setErrorMessage("Error deleting  articleDetails");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredArticleDetails = articleItems?.filter((articleDetails: any) =>
    articleDetails?.articleTitle
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1); // State to keep track of current page
  const [itemsPerPage, setItemsPerPage] = useState<number>(10); // Default value can be changed
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredArticleDetails.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePaginationClick = (page: number) => {
    setCurrentPage(page);
  };
  const breadcrumbItems = [
    {
      title: "Home",
      link: "/dashboard?component=dashboardAdmin",
    },
    { title: "article Details" },
  ];
  return (
    <div className="bg-white  px-2">
      <div className="  flex md:flex-row flex-col justify-between">
        <div className="my-auto">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <div className="flex justify-end ">
          <button
            className="bg-blue-700 text-xs mb-2 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
            onClick={() => {
              setEditItem(null); // Clear any existing edit data
              setOpenAddArticle(true); // Open the form for adding a new  article
            }}
          >
            New Article
          </button>
        </div>
      </div>
      <div className="bg-white space-y-2">
        <div className="w-full ">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Search party by name, code"
              value={searchQuery}
              onChange={handleSearchChange}
              className="shadow-xs  block w-full rounded-lg border-gray-200 px-3 py-2 ps-9 text-xs focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600 mb-3"
            />
          </div>

          {successMessage && <SuccessNotification message={successMessage} />}
          {errorMessage && <FailedNotification message={errorMessage} />}

          <div className="block md:hidden rounded-lg">
            <div className="flex-1 overflow-auto h-[55vh] space-y-4 p-4">
              {currentItems.map((articleDetails: any) => (
                <div
                  key={articleDetails?.articleId}
                  className="border rounded-lg p-4 mb-4 shadow-md bg-white dark:bg-gray-800"
                >
                  <div className="text-xs mb-2 text-black dark:text-white">
                    <span className="font-bold text-gray-950 dark:text-gray-300">
                      Article Title
                    </span>{" "}
                    <span className="text-gray-900 dark:text-gray-400">
                      {articleDetails?.articleTitle}
                    </span>
                  </div>
                  <div className="text-xs mb-2 text-black dark:text-white">
                    <span className="font-bold text-gray-950 dark:text-gray-300">
                      Article Description
                    </span>{" "}
                    <span className="text-gray-900 dark:text-gray-400">
                      {articleDetails?.articleDescription}
                    </span>
                  </div>
                  <div className="text-xs mb-2 text-black dark:text-white">
                    <span className="font-bold text-gray-950 dark:text-gray-300">
                      Date
                    </span>{" "}
                    <span className="text-gray-900 dark:text-gray-400">
                      {articleDetails?.date}
                    </span>
                  </div>
                  <div className="text-xs mb-2 text-black dark:text-white">
                    <span className="font-bold text-gray-950 dark:text-gray-300">
                      Article Category
                    </span>{" "}
                    <span className="text-gray-900 dark:text-gray-400">
                      {articleDetails?.articleCategory}
                    </span>
                  </div>
                  <div className="text-xs mb-2 text-black dark:text-white">
                    <span className="font-bold text-gray-950 dark:text-gray-300">
                      Article Tags
                    </span>{" "}
                    <span className="text-gray-900 dark:text-gray-400">
                      {articleDetails?.articleTags}
                    </span>
                  </div>
                  <div className=" gap-2 grid grid-cols-2">
                    <button
                      className="text-xs px-2 py-2 border rounded-md bg-violet-500 text-white hover:bg-violet-600 transition"
                      onClick={() => handleEdit(articleDetails)}
                    >
                      Edit
                    </button>
                    <ConfirmButton
                      classNames="text-xs px-2 py-1 border rounded-md bg-red-500 text-white"
                      buttonName="Delete"
                      buttonMessage={"Are you sure you want to delete?"}
                      buttonType="delete"
                      userId={articleDetails?.articleDetailsId}
                      handleConfirm={(value) => handleDelete(value)}
                    />
                    {/* <button
                    className="text-xs px-2 py-1 border rounded-md bg-red-500 text-white hover:bg-red-600 transition"
                    onClick={() => handleDelete(articleDetails?.articleDetailsId)}
                  >
                    Delete
                  </button> */}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex max-h-screen flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="inline-block min-w-full p-1.5 align-middle">
                  <div className="divide-y relative h-[66vh] md:h-[66vh] divide-gray-200 rounded-lg border dark:divide-gray-700 dark:border-gray-700">
                    <table className=" min-w-full divide-y divide-gray-200 ">
                      <thead className="bg-gray-50 dark:bg-gray-700 sticky top-0">
                        <tr className="">
                          <th className="px-6 py-3 text-center text-xs font-semibold uppercase ">
                            Article Title
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-semibold uppercase ">
                            Article Category
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-semibold uppercase ">
                            Article Tags
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-semibold uppercase ">
                            Article Description
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-semibold uppercase ">
                            Date
                          </th>
                          <th className="px-6 py-3 text-center text-xs font-semibold uppercase ">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-500 dark:divide-gray-700">
                        {filteredArticleDetails.map((articleDetails: any) => (
                          <tr
                            className=" hover:bg-gray-100"
                            key={articleDetails?.articleId}
                          >
                            <td className="whitespace-nowrap px-6 py-3 text-center text-xs font-medium">
                              {articleDetails?.articleTitle}
                            </td>
                            <td className="whitespace-nowrap px-6 py-3 text-center text-xs font-medium">
                              {articleDetails?.articleCategory}
                            </td>
                            <td className="whitespace-nowrap px-6 py-3 text-center text-xs font-medium">
                              {articleDetails?.articleTags}
                            </td>
                            <td className="whitespace-nowrap px-6 py-3 text-center text-xs font-medium">
                              {articleDetails?.articleDescription}
                            </td>
                            <td className="whitespace-nowrap px-6 py-3 text-center text-xs font-medium">
                              {articleDetails?.date}
                            </td>
                            <td className="whitespace-nowrap px-6 py-3 text-center text-xs font-medium">
                              <div className="flex text-center space-x-2">
                                <button
                                  className="px-3 py-1 bg-violet-500 text-white rounded hover:bg-violet-600 transition"
                                  onClick={() => handleEdit(articleDetails)}
                                >
                                  Edit
                                </button>
                                <ConfirmButton
                                  classNames="text-xs px-2 py-1 border rounded-md bg-red-500 text-white"
                                  buttonName="Delete"
                                  buttonMessage={
                                    "Are you sure you want to delete?"
                                  }
                                  buttonType="delete"
                                  userId={articleDetails?.articleDetailsId}
                                  handleConfirm={(value) => handleDelete(value)}
                                />
                                {/* <button
                                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                                  onClick={() => handleDelete( articleDetails?. articleDetailsId)}
                                >
                                  Delete
                                </button> */}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {openAddArticle && (
        <ArticleForm
          initialData={editItem}
          onClose={() => setOpenAddArticle(false)} // Close the form when done
        />
      )}
      <div className="mt-2">
        <PaginationTable
          currentPage={currentPage}
          data={filteredArticleDetails}
          handlePaginationClick={handlePaginationClick}
          itemsPerPage={itemsPerPage}
          indexOfLastItem={indexOfLastItem}
        />
      </div>
    </div>
  );
}

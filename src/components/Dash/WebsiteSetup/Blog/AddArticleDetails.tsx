/** @format */

"use client";

import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, useEffect, useRef } from "react";
import { IoLocationOutline } from "react-icons/io5";

import { RxCross2 } from "react-icons/rx";
import TextInput from "@/components/UI/InputField/TextInput";
import PhotoInput from "@/components/UI/InputField/PhotoInput";
import SuccessNotification from "@/components/UI/Notification/SuccessNotification";
import FailedNotification from "@/components/UI/Notification/FailedNotification";

import { imageUrlToFile } from "@/components/UI/Conversion/URLToFile";
import useArticleDetailsMutations from "./ArticleDetailsMutation";

interface FormData {
  articleId: string;
  articleTitle: string;
  articleDescription: string;
  date: string;
  articleCategory: string;
  articleTags: string;
}

const ArticleForm: React.FC<any> = ({
  initialData,
  onClose,
}: {
  initialData: any;
  onClose: () => void;
}) => {
  const router = useRouter();
  const { articleDetail } = useArticleDetailsMutations();
  const [formData, setFormData] = useState<FormData>({
    articleId: "",
    articleTitle: "",
    articleDescription: "",
    date: "",
    articleCategory: "",
    articleTags: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [clearOnSuccess, setClearOnSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formValid, setIsFormValid] = useState(false);
  const [articleImage, setArticleImage] = useState<File | null>(null);

  useEffect(() => {
    if (initialData) {
      // Populate form with initial data when editing
      setFormData({
        articleId: initialData.articleId || "",
        articleTitle: initialData.articleTitle || "",
        articleDescription: initialData.articleDescription || "",
        articleCategory: initialData.articleCategory || "",
        articleTags: initialData.articleTags || "",
        date: initialData.date || "",
      });

      if (initialData.articleImage) {
        imageUrlToFile(initialData.articleImage).then((file) => {
          setArticleImage(file);
        });
      }
    } else {
      resetFormState();
    }
  }, [initialData]);

  const resetFormState = () => {
    setFormData({
      articleId: "",
      articleTitle: "",
      articleDescription: "",
      date: "",
      articleCategory: "",
      articleTags: "",
    });

    setArticleImage(null);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (file: File | null) => {
    setArticleImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (!formData.articleTitle) {
        setErrorMessage("Article title required.");
        setIsLoading(false);
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("articleDetailsData", JSON.stringify(formData));
      if (articleImage) {
        formDataToSend.append("articleImage", articleImage);
      }

      const response = await articleDetail(formDataToSend);

      if (response?.success) {
        setSuccessMessage(response.success);
        resetFormState();
      } else if (response?.error) {
        setErrorMessage(response.error);
        if (response.error === "Invalid session") {
          router.push("/login");
        }
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      setErrorMessage("An error occurred while submitting the data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="w-full max-w-4xl md:max-w-7xl bg-white rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <div className="p-4">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <h2 className="text-lg font-bold text-center">Article Information</h2>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
                Article Title
              </label>
              <input
                type="text"
                id="articleTitle"
                value={formData.articleTitle}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
                Article Category
              </label>
              <input
                type="text"
                id="articleCategory"
                value={formData.articleCategory}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
                Article Tags
              </label>
              <input
                type="text"
                id="articleTags"
                value={formData.articleTags}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
                Date
              </label>
              <input
                id="date"
                value={formData.date}
                type="date"
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              ></input>
            </div>
            <div className="col-span-3">
              <label className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
                Article Description
              </label>
              <textarea
                id="articleDescription"
                value={formData.articleDescription}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                rows={3}
              ></textarea>
            </div>
          </div>
          <div className="mb-4 flex flex-col items-center justify-center">
            <label className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
              Article Image*
            </label>
            <PhotoInput
              values={articleImage}
              clearOnSuccess={clearOnSuccess}
              onFileSelected={(file) => handleFileChange(file)}
              allowedExtensions={["jpg", "jpeg", "png"]}
            />
          </div>
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleSubmit}
              className="w-24 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </div>
        {successMessage && <SuccessNotification message={successMessage} />}
        {errorMessage && <FailedNotification message={errorMessage} />}
      </div>
    </div>
  );
};

export default ArticleForm;

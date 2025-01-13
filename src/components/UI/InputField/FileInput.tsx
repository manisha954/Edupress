/** @format */

import React, { useState, useEffect } from "react";
import { FaTimesCircle } from "react-icons/fa";

interface FileInputProps {
  label?: string;
  values?: File | null;
  allowedExtensions: string[];
  onFileSelected: (file: File) => void;
  clearOnSuccess?: boolean;
}

const FileInput: React.FC<FileInputProps> = ({
  label,
  values,
  onFileSelected,
  allowedExtensions,
  clearOnSuccess,
}) => {
  const [isInputVisible, setInputVisible] = useState(true);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSvgClick = () => {
    setInputVisible(true);
  };

  useEffect(() => {
    if (values instanceof File) {
      setSelectedFile(URL.createObjectURL(values));
    }
    if (clearOnSuccess) {
      setSelectedFile(null);
    }
  }, [values, clearOnSuccess]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    const file = event.target.files?.[0];
    if (file) {
      const extension = file.name.split(".").pop()?.toLowerCase();
      if (!allowedExtensions.includes(extension || "")) {
        setErrorMessage(
          `Invalid file type. Allowed types are: ${allowedExtensions.join(
            ", "
          )}.`
        );
      } else if (file.size > 20 * 1024 * 1024) {
        setErrorMessage(
          "File size exceeds 20 MB. Please choose a smaller file."
        );
      } else {
        setErrorMessage(null);
        setInputVisible(false);
        setSelectedFile(file.name);
        onFileSelected(file);
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setErrorMessage(null);
  };

  return (
    <div className="px-2 w-full">
      <div className="border p-2 w-full">
        {label && (
          <label
            htmlFor="file-input"
            className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
          >
            {label}
          </label>
        )}
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="file-input"
            className="relative flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            {selectedFile ? (
              <>
                <p className="text-gray-700 dark:text-gray-200">
                  {selectedFile}
                </p>
                <FaTimesCircle
                  className="absolute top-2 right-2 cursor-pointer text-red-500 text-lg"
                  onClick={handleRemoveFile}
                />
              </>
            ) : (
              <div
                className="flex flex-col items-center justify-center pt-5 pb-6"
                onClick={handleSvgClick}
              >
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  DOCX file only
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  (Max size 20 MB)
                </p>
              </div>
            )}
            {isInputVisible && (
              <>
                <input
                  id="file-input"
                  type="file"
                  accept=".docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {errorMessage && (
                  <p className="text-xs w-full px-2 text-center text-red-500">
                    {errorMessage}
                  </p>
                )}
              </>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};

export default FileInput;

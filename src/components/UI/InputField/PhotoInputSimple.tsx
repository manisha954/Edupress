/** @format */

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaTimesCircle } from "react-icons/fa";
import Compressor from "compressorjs";

interface PhotoInputProps {
  label?: string;
  values?: File | null;
  allowedExtensions: string[];
  onFileSelected: (file: File) => void;
  clearOnSuccess?: boolean;
}

const PhotoInputSimple: React.FC<PhotoInputProps> = ({
  label,
  values,
  onFileSelected,
  allowedExtensions,
  clearOnSuccess,
}) => {
  const [isInputVisible, setInputVisible] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSvgClick = () => {
    setInputVisible(true);
  };

  useEffect(() => {
    if (values instanceof File) {
      setSelectedPhoto(URL.createObjectURL(values));
    }
    if (clearOnSuccess) {
      setSelectedPhoto(null);
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

        // Compress the image file using Compressor.js
        new Compressor(file, {
          quality: 0.75, // Adjust the quality as needed (0.0 - 1.0)
          success: (compressedFile) => {
            const reader = new FileReader();
            reader.onload = () => {
              setSelectedPhoto(reader.result as string);
              setInputVisible(false);
            };
            reader.readAsDataURL(compressedFile);
            onFileSelected(compressedFile as File); // Pass the compressed file to the parent
          },
          error: (err) => {
            console.error("Compression error:", err.message);
            setErrorMessage("Failed to compress image. Please try again.");
          },
        });
      }
    }
  };

  const handleRemovePhoto = () => {
    setSelectedPhoto(null);
    setErrorMessage(null);
  };

  return (
    <div className="px-2 w-full">
      <div className=" w-full">
        {label && <p className="mb-2 text-xs font-semibold">{label}</p>}
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className="relative flex flex-col items-center justify-center w-32  h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            {selectedPhoto ? (
              <>
                <Image
                  src={selectedPhoto}
                  alt="Uploaded Photo"
                  className="w-16 h-16 object-contain rounded-lg"
                  width={1000}
                  height={1000}
                />
                <FaTimesCircle
                  className="absolute top-2 right-2 cursor-pointer text-red-500 text-lg"
                  onClick={handleRemovePhoto}
                />
              </>
            ) : (
              <div
                className="flex flex-col items-center justify-center pt-2 pb-2"
                onClick={handleSvgClick}>
                <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  (Max size 500kb)
                </p>
              </div>
            )}
            {isInputVisible && (
              <>
                <input
                  id="dropzone-file"
                  type="file"
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

export default PhotoInputSimple;

// Usage Example

// const handleFileSelected = (file: File) => {
//     // Do something with the selected and compressed file, e.g., save it in the state or send it to the server
//     console.log("Selected and Compressed File:", file);
// };

// <PhotoInputSimple
//   onFileSelected={handleFileSelected}
//   allowedExtensions={["jpg", "jpeg", "png", "gif"]}
// />

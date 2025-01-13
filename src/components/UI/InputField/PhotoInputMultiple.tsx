/** @format */

import Image from "next/image";
import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import Compressor from "compressorjs";

interface Props {
  label?: string;
  allowedExtensions: string[];
  onFilesSelected: (files: File[] | null) => void;
  maxPhotos: number;
  classNames?: string;
  values?: File[] | null;
}

const PhotoInputMultiple: React.FC<Props> = ({
  label,
  allowedExtensions,
  onFilesSelected,
  maxPhotos,
  classNames,
  values,
}) => {
  const [multipleProductImages, setMultipleProductImages] = useState<File[]>(
    []
  );
  const [multipleProductImagesString, setMultipleProductImagesString] =
    useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const maxSizeInKB = 20;

  const validateFile = (file: File): string | null => {
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (!allowedExtensions.includes(extension || "")) {
      return "Invalid file type. Allowed types are jpg, jpeg, png";
    }

    if (file.size > maxSizeInKB * 1024 * 1024) {
      return `File size exceeds the limit of ${maxSizeInKB} MB.`;
    }

    if (multipleProductImages.some((image: any) => image.name === file.name)) {
      return `Duplicate files detected: ${file.name}. Please select unique files.`;
    }

    return null;
  };

  useEffect(() => {
    if (values && values.length > 0) {
      setMultipleProductImages(values);
      const validFiles = values.filter((file: any) => file instanceof File);
      const objectURLs = validFiles.map((file: File) =>
        URL.createObjectURL(file)
      );
      setMultipleProductImagesString(objectURLs);
    } else {
      setMultipleProductImagesString([]);
    }
  }, [values]);

  const handleMultipleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files) {
      const selectedImages: File[] = Array.from(e.target.files);
      const validImages: File[] = [];

      selectedImages.forEach((image: any) => {
        const validationError = validateFile(image);
        if (validationError) {
          setError(validationError);
        } else {
          validImages.push(image);
        }
      });

      if (validImages.length > 0) {
        compressImages(validImages).then((compressedImages) => {
          const totalImages = [...multipleProductImages, ...compressedImages];
          if (totalImages.length > maxPhotos) {
            setError(`Maximum ${maxPhotos} photos allowed.`);
          } else {
            setMultipleProductImages(totalImages);
            setMultipleProductImagesString(
              totalImages.map((image: any) => URL.createObjectURL(image))
            );
            onFilesSelected(totalImages);
          }
        });
      }
    }
  };

  const compressImages = (images: File[]): Promise<File[]> => {
    return Promise.all(
      images.map(
        (image) =>
          new Promise<File>((resolve, reject) => {
            new Compressor(image, {
              quality: 0.75,
              success: (compressedImage) => {
                resolve(compressedImage as File);
              },
              error: (err) => {
                console.error("Compression error:", err.message);
                reject(err);
              },
            });
          })
      )
    );
  };

  const handleRemoveMultipleImage = (index: number) => {
    setMultipleProductImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      onFilesSelected(updatedImages); // Update the parent component
      return updatedImages;
    });
    setMultipleProductImagesString((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  return (
    <div className="w-full border p-2">
      <div className=" w-full">
        {label && (
          <label
            htmlFor="productImages"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            {label}
          </label>
        )}

        <div
          className="border rounded-md py-2 px-2 flex justify-center items-center overflow-x-auto"
          style={{ width: "100%" }}>
          <label htmlFor="uploadPhoto" className="cursor-pointer text-blue-500">
            <input
              type="file"
              id="uploadPhoto"
              name="productImages"
              accept="image/*"
              multiple
              onChange={(e) => handleMultipleImageChange(e)}
              className="hidden"
              ref={fileInputRef}
            />
            {multipleProductImages.length === 0 ? (
              <div className="flex flex-col items-center justify-center pt-3">
                <svg
                  className="w-8 h-8  text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16">
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
                  SVG, PNG, JPG
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  (Max size 500kb)
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Maximum {maxPhotos} photos allowed
                </p>
              </div>
            ) : (
              "Add More Photos"
            )}
          </label>
        </div>
        {error && <div className="text-red-500 mt-2 text-xs">{error}</div>}

        {multipleProductImagesString && (
          <div className="flex space-x-2 flex-nowrap w-full mt-3 overflow-x-auto">
            {/* Display selected images as thumbnails */}
            {multipleProductImagesString.map((image: any, index: number) => (
              <div key={index} className="relative w-20">
                <div className=" w-20">
                  <Image
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-md mr-2"
                    width={1000}
                    height={1000}
                  />
                  <button
                    className="absolute top-0 right-0  mr-1 px-1 rounded-full bg-white border border-gray-300 text-gray-500 hover:text-red-500 hover:border-red-500 focus:outline-none"
                    onClick={() => handleRemoveMultipleImage(index)}>
                    <span className=" font-bold text-lg">&times;</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoInputMultiple;

// Usage example

// const handleImagesSelected = (files: File[] | null) => {
//     // Do something with the selected files or handle the file removal
//     console.log("Selected Files:", files);
// };

// <PhotoInputMultiple
//   label="Upload Photos"
//   allowedExtensions={["jpg", "jpeg", "png", "gif"]}
//   onFilesSelected={handleImagesSelected}
//   maxPhotos={5}
// />

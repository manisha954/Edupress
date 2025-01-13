/** @format */

"use client";

import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, useEffect, useRef } from "react";

import PhotoInput from "@/components/UI/InputField/PhotoInput";
import TextInput from "@/components/UI/InputField/TextInput";
import FailedNotification from "@/components/UI/Notification/FailedNotification";
import SuccessNotification from "@/components/UI/Notification/SuccessNotification";
import { imageUrlToFile } from "../../../../util/UrlToImage";
interface FormData {
  footerId: string;
  companyName: string;
  companyMoto: string;
  address: string;
  video: string;
  companySlogan: string;
  description: string;
  email: string;
  location: string;
  phone: string;
  terms: string;
  privacyPolicyLink: string;
}

const AddCompanyDetails: React.FC<any> = ({
  initialData,
  onClose,
}: {
  initialData: any;
  onClose: () => void;
}) => {
  //   const { footerDetail } = useFooterMutations();
  const [formData, setFormData] = useState<FormData>({
    footerId: "",
    companyName: "",
    companyMoto: "",
    address: "",
    video: "",
    companySlogan: "",
    description: "",
    email: "",
    location: "",
    phone: "",
    terms: "",
    privacyPolicyLink: "",
  });

  const [submitStatus, setSubmitStatus] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [clearOnSuccess, setClearOnSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formValid, setIsFormValid] = useState(false);
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [logo, setLogo] = useState<File | null>(null);

  const fileInput = useRef<HTMLInputElement>(null);

  const handleLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setLogo(file);
  };

  useEffect(() => {
    if (initialData) {
      // Populate form with initial data when editing
      setFormData({
        footerId: initialData.footerId || "",
        companyName: initialData.companyName || "",
        companyMoto: initialData.companyMoto || "",
        companySlogan: initialData.companySlogan || "",
        description: initialData.description || "",
        address: initialData.address || "",
        video: initialData.videoLink || "",
        email: initialData.email || "",
        location: initialData.location || "",
        phone: initialData.phone || "",
        terms: initialData.terms || "",
        privacyPolicyLink: initialData.privacyPolicyLink || "",
      });
      setLogo(null); // Reset logo state for fresh upload
      setHeroImage(null); // Reset hero image state for fresh upload
    } else {
      resetFormState();
    }
  }, [initialData]);

  useEffect(() => {
    const loadImages = async () => {
      if (
        initialData?.companyLogo &&
        typeof initialData?.companyLogo === "string"
      ) {
        const file = await imageUrlToFile(initialData?.Logo || "/logo.png");
        setLogo(file);
      }

      if (
        initialData?.heroImage &&
        typeof initialData?.heroImage === "string"
      ) {
        const file = await imageUrlToFile(
          initialData?.heroImage || "/logo.png"
        );
        setHeroImage(file);
      }
    };

    loadImages();
  }, [initialData?.companyLogo, initialData?.heroImage]);

  const resetFormState = () => {
    setFormData({
      footerId: "",
      companyName: "",
      address: "",
      companyMoto: "",
      companySlogan: "",
      description: "",
      email: "",
      video: "",
      location: "",
      phone: "",
      terms: "",
      privacyPolicyLink: "",
    });
    setLogo(null);
    setHeroImage(null);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const router = useRouter();
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleLocationClick = () => {
    console.log("Location icon clicked");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prevData) => ({
            ...prevData,
            location: `${latitude}, ${longitude}`,
          }));
        },
        (error) => {
          let errorMessage = "Error fetching location";
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Location access denied by the user.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage = "Location request timed out.";
              break;
            default:
              errorMessage = "An unknown error occurred.";
              break;
          }
          console.error(errorMessage, error);
          setErrorMessage(errorMessage);
        }
      );
    } else {
      setErrorMessage("Geolocation is not supported by this browser.");
    }
  };

  const handleFileChange = (file: File | null) => {
    setHeroImage(file);
  };

  useEffect(() => {
    if (formData.companyName !== "" && formData.email !== "") {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [formData, logo, heroImage]);

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    setIsLoading(true);
    setErrorMessage(""); // Clear any existing error messages
    setSuccessMessage(""); // Clear any existing success messages

    try {
      // Collect the data
      const dataToSend = {
        footerId: formData.footerId,
        companyName: formData.companyName,
        companyMoto: formData.companyMoto,
        companySlogan: formData.companySlogan,
        description: formData.description,
        address: formData.address,
        video: formData.video,
        email: formData.email,
        phone: formData.phone,
        terms: formData.terms,
        privacyPolicyLink: formData.privacyPolicyLink,
        location: formData.location,
      };

      // Ensure that mandatory fields are filled
      if (!formData.companyName || !formData.email) {
        setErrorMessage("Company name and email are required.");
        return;
      }

      // Convert JSON data into a string to append to FormData
      const footerDetails = JSON.stringify(dataToSend);
      formDataToSend.append("footerData", footerDetails);

      // Append the hero image to the form data if it's provided
      if (heroImage) {
        formDataToSend.append("heroImage", heroImage);
      } else {
        setErrorMessage("Hero image is required.");
        return;
      }

      // Append the company logo if it's provided
      if (logo) {
        formDataToSend.append("companyLogo", logo);
      } else {
        setErrorMessage("Company logo is required.");
        return;
      }

      // Call the footerDetail mutation (assumed to be an API call)
      const data = await footerDetail(formDataToSend);

      // Handle success
      if (data?.success) {
        setSuccessMessage(data.success);
        setClearOnSuccess(true);
        setIsFormValid(false);
        resetFormState();
      }
      //   Handle errors from the API
      else if (data?.error) {
        setErrorMessage(data.error);
        if (data.error === "Invalid session") {
          router.push("/login");
        }
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      // Catch any unexpected errors during the submission process
      console.error("Submission Error:", error);
      setErrorMessage(
        "An error occurred while submitting the data. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (errorMessage || successMessage) {
      const timeout = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000); // Hide the alert after 5 seconds

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [successMessage, errorMessage]);

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
              <RxCrosshair size={24} />
            </button>
          </div>
          <h2 className="text-lg font-bold text-center">Company Information</h2>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
                Company Motto
              </label>
              <input
                type="text"
                id="companyMoto"
                value={formData.companyMoto}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
                Company Slogan
              </label>
              <input
                type="text"
                id="companySlogan"
                value={formData.companySlogan}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
                Video Link
              </label>
              <input
                type="text"
                id="video"
                value={formData.video}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <div className="image-upload ">
              <label className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
                Upload Logo:
              </label>
              <input
                type="file"
                onChange={handleLogoChange}
                name="logo"
                ref={fileInput}
                accept="image/*"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
                Address
              </label>
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <div className="mb-4 relative">
              <TextInput
                name="location"
                type="text"
                classNames="text-sm"
                label="Location"
                placeholder="Location"
                values={formData.location}
                clearOnSuccess={clearOnSuccess}
                onChange={(value) =>
                  setFormData({ ...formData, location: value })
                }
                icon={
                  <IoLocationOutline
                    onClick={handleLocationClick}
                    style={{ cursor: "pointer" }}
                    className="ml-4 absolute"
                  />
                }
              />
            </div>
            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-medium">
                Phone
              </label>
              <input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
            <div className="col-span-3">
              <label className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                rows={3}
              ></textarea>
            </div>
            <div className="col-span-3">
              <label className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
                Terms
              </label>
              <textarea
                id="terms"
                value={formData.terms}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                rows={3}
              ></textarea>
            </div>
            <div className="col-span-3">
              <label className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
                Privacy Policy Link
              </label>
              <input
                type="url"
                id="privacyPolicyLink"
                value={formData.privacyPolicyLink}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="mb-4 flex flex-col items-center justify-center">
            <label className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">
              Hero Image*
            </label>
            <PhotoInput
              values={heroImage}
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
export default AddCompanyDetails;

/** @format */
"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { UserIcon } from "@heroicons/react/20/solid";
import AdminDataProfile from "./AdminProfileData";
import useAdminDetailMutation from "./AdminSettingMutation";
import { useLanguage } from "@/components/UI/Provider/LanguageProvider";
import LoadingComponentSmall from "@/components/UI/Loading/LoadingComponentSmall";
import FailedNotification from "@/components/UI/Notification/FailedNotification";
import SuccessNotification from "@/components/UI/Notification/SuccessNotification";

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
}

export default function ProfileDetails() {
  const { langData } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [clearOnSuccess, setClearOnSuccess] = useState(false);
  const initialData = {
    fullName: "",
    email: "",
    phone: "",
  };

  const session = useSession();
  const { updateDetail } = useAdminDetailMutation();
  const [profileData, setProfileData] = useState<ProfileData>(initialData);
  const { userDetails } = AdminDataProfile();

  useEffect(() => {
    if (userDetails) {
      setProfileData({
        fullName: userDetails.name || "",
        email: userDetails.email,
        phone: userDetails?.phone,
      });
    }
  }, [userDetails]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await updateDetail(JSON.stringify(profileData));
      if (response?.success) {
        setSuccessMessage(response?.success);
        setIsLoading(false);
        setClearOnSuccess(true);
      } else if (response?.error) {
        setErrorMessage(response?.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error updating profile data", error);
      alert(langData.profile.failedToUpdateProfile);
    }
  };
  useEffect(() => {
    if (errorMessage || successMessage) {
      const timeout = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 2000); // Hide the alert after 5 seconds

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [successMessage, errorMessage]);
  return (
    <div>
      <div className="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-neutral-800">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200">
            {langData.profile.profile}
          </h2>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            {langData.profile.manageYourNamePasswordAndAccountSettings}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-12 gap-2 sm:gap-6">
            <div className="sm:col-span-3">
              <label className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                {langData.profile.profilePhoto}
              </label>
            </div>
            <div className="sm:col-span-9">
              <div className="flex items-center gap-5">
                {session?.data?.user?.image ? (
                  <Image
                    alt="Customer Image"
                    src={session?.data?.user?.image}
                    className="w-8 h-8 rounded-full ring-1 ring-gray-300 dark:ring-gray-500"
                    width={1000}
                    height={1000}
                  />
                ) : (
                  <UserIcon className="h-6 w-6 text-gray-700 transition-all ease-in-out hover:scale-110" />
                )}
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="fullName"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                {langData.profile.fullName}
              </label>
            </div>
            <div className="sm:col-span-9">
              <div className="sm:flex">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={profileData?.fullName}
                  onChange={handleInputChange}
                  className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="email"
                className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
              >
                {langData.profile.email}
              </label>
            </div>
            <div className="sm:col-span-9">
              <input
                id="email"
                type="email"
                value={session?.data?.user?.email}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                disabled
              />
            </div>
            <div className="sm:col-span-3">
              <div className="inline-block">
                <label
                  htmlFor="phone"
                  className="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200"
                >
                  {langData.profile.phone}
                </label>
                <span className="text-sm text-gray-400 dark:text-neutral-600">
                  ( {langData.profile.optional})
                </span>
              </div>
            </div>

            <div className="sm:col-span-9">
              <input
                id="phone"
                name="phone"
                type="text"
                value={profileData?.phone}
                onChange={handleInputChange}
                className="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
              />
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-x-2">
            <button
              type="submit"
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700"
            >
              {isLoading ? (
                <LoadingComponentSmall />
              ) : (
                langData.profile.saveChanges
              )}
            </button>
          </div>
          {successMessage && <SuccessNotification message={successMessage} />}
          {errorMessage && <FailedNotification message={errorMessage} />}
        </form>
      </div>
    </div>
  );
}

/** @format */

import React, { Suspense, useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import useAdminDetailMutation from "./AdminSettingMutation";

import BasicSettingData from "@/lib/data/BasicSettingData";
import SubmitButton from "@/components/UI/Button/SubmitButton";

export default function BasicSetting() {
  const { basicSettingData } = BasicSettingData();
  const router = useRouter();
  const [storeSignature, setStoreSignature] = useState<File | null>(null);

  const [settingState, setSettingState] = useState({
    language: "",
    fontSize: "",
    theme: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [clearOnSuccess, setClearOnSuccess] = useState(false);
  const [isSelectPackageVisible, setIsSelectPackageVisible] = useState(false);
  const { updateSetting } = useAdminDetailMutation();

  // Function to handle basic setting save
  const handleBasicSettingChange = async () => {
    try {
      if (settingState) {
        const settingData = JSON.stringify(settingState);

        const data = await updateSetting(settingData);
        if (data?.success) {
          setSuccessMessage(data?.success);
          setIsLoading(false);
          setClearOnSuccess(true);
        } else if (data?.error) {
          setErrorMessage(data?.error);
          if (data?.error === "Invalid session") {
            router.push("/login");
          }

          setIsLoading(false);
        } else {
          setErrorMessage(data?.error || "Failed to add setting");
        }
      } else {
        setErrorMessage("Failed to add setting");
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMessage("Failed to add setting");
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    if (errorMessage || successMessage) {
      setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
        setClearOnSuccess(false);
      }, 5000); // Adjust the time as per your requirement
    }

    return () => {
      // Abort the request when the component unmounts or when a dependency changes
      controller.abort();
    };
  }, [errorMessage, successMessage]);

  // Effect to update form validity based on setting state changes
  useEffect(() => {
    if (settingState) {
      setIsFormValid(true);
    }
  }, [settingState]);
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
  useEffect(() => {
    const fetchData = async () => {
      if (basicSettingData) {
        setSettingState({
          language: basicSettingData?.languageFormat,
          fontSize: basicSettingData?.fontSize,
          theme: basicSettingData?.theme,
        });

        setIsFormValid(true);
      }
    };

    fetchData();
  }, [basicSettingData]);

  const handleFileChange = (file: File) => {
    setStoreSignature(file);
  };

  return (
    <>
      <div className="px-2 pt-3 bg-white">
        <blockquote className="border-s-4 border-blue-500 bg-gray-50 pl-2 dark:border-gray-500 dark:bg-gray-800">
          <p className="text-base font-bold leading-relaxed text-gray-900 dark:text-white">
            Basic Setting
          </p>
        </blockquote>
      </div>
      <div className="h-[90vh] overflow-y-auto">
        <div className="flex flex-col md:flex-row p-5 text-sm md:text-base w-full">
          <div className="w-[100%] md:w-[60%]">
            <div className="text-sm bg-white border border-gray-200 rounded-lg justify-center p-3">
              <table className="w-full p-4 dark:bg-gray-800 dark:border-gray-700">
                <tbody>
                  <tr>
                    <td>
                      <label
                        htmlFor="language"
                        className="block text-sm p-2 font-medium text-gray-900 dark:text-white"
                      >
                        Language
                      </label>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label
                        htmlFor="fontSize"
                        className="block p-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Font Size
                      </label>
                    </td>
                    <td>
                      <select
                        id="fontSize"
                        name="fontSize"
                        value={settingState.fontSize}
                        onChange={(e) =>
                          setSettingState({
                            ...settingState,
                            fontSize: e.target.value,
                          })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      >
                        <option value="">Select Font Size</option>
                        <option value="large">Large</option>
                        <option value="medium">Medium</option>
                        <option value="small">Small</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label
                        htmlFor="theme"
                        className="block p-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Theme
                      </label>
                    </td>
                    <td>
                      <select
                        id="theme"
                        value={settingState.theme}
                        name="theme"
                        onChange={(e) =>
                          setSettingState({
                            ...settingState,
                            theme: e.target.value,
                          })
                        }
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      >
                        <option value="">Select Theme</option>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center my-3 px-5">
          <div className="md:w-1/4 w-full text-center">
            <SubmitButton
              name="Submit"
              classNames="w-full"
              isLoading={isLoading} // Pass the isLoading state
              isFormValid={isFormValid} // Pass the isFormValid state
              onClick={handleBasicSettingChange} // Pass the handleSubmit function
              successMessage={successMessage} // Pass the success message
              errorMessage={errorMessage} // Pass the errorMessage state
            />
          </div>
        </div>
      </div>
    </>
  );
}

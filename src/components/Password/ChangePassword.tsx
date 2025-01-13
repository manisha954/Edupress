/** @format */

"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineLock } from "react-icons/ai";

import { useLanguage } from "../UI/Provider/LanguageProvider";
import { useUserSettings } from "../UI/Provider/UserSettingProvider";
import TextInputPlain from "../UI/InputField/TextInputPlain";
import TextInput from "../UI/InputField/TextInput";
import SubmitButton from "../UI/Button/SubmitButton";
import { changePassword } from "./passwordActions";

interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const ChangePassword = () => {
  const { langData } = useLanguage();
  const { settings } = useUserSettings();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const [userData, setUserData] = useState<ChangePasswordData>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const router = useRouter();

  const handleChangePasswordClick = async () => {
    setIsLoading(true);
    try {
      if (
        userData?.oldPassword &&
        userData?.newPassword &&
        userData?.confirmPassword
      ) {
        if (userData?.newPassword === userData?.confirmPassword) {
          const changeData = {
            userId: settings.userId,

            userNewPassword: userData?.newPassword,
            oldPassword: userData?.oldPassword,
          };

          const response = await changePassword(JSON.stringify(changeData));

          if (response?.success) {
            setSuccessMessage("Password changed successfully.");
            setTimeout(() => {}, 3000);
            setIsLoading(false);
            setUserData({
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            });
            setIsFormValid(false);
          } else if (response?.error) {
            setErrorMessage(response?.error);
            setIsLoading(false);
          }
        } else {
          setErrorMessage("Passwords do not match.");
          setIsLoading(false);
        }
      } else {
        setErrorMessage(
          langData?.errors?.missingFields ||
            "Please fill in all required fields."
        );
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMessage(
        langData?.errors?.unexpectedError || "An unexpected error occurred"
      );
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    router.push("/");
  };
  useEffect(() => {
    const passwordsMatch = userData?.newPassword === userData?.confirmPassword;
    setIsFormValid(passwordsMatch);
    if (!passwordsMatch && userData?.newPassword && userData?.confirmPassword) {
      setErrorMessage("Passwords do not match.");
    } else {
      setErrorMessage(""); // Clear the error message if passwords match
    }
  }, [userData?.newPassword, userData?.confirmPassword]);
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
      <>
        <div className="flex  bg-gray-100 text-sm">
          <div className="flex w-full bg-white flex-col justify-center ">
            <div className="w-full  p-4 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
              <div className="text-center">
                <h1 className="block text-base font-bold text-gray-800 dark:text-white">
                  Change Password
                </h1>
              </div>
              <div className="mt-5">
                <div className="grid gap-y-4">
                  <div>
                    <div className="relative ">
                      <TextInputPlain
                        type={"password"}
                        name="oldPassword"
                        classNames=" text-xs"
                        required={true}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            oldPassword: e,
                          })
                        }
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="16px"
                            height="16px"
                            fill="grey"
                            className="pointer-events-none absolute ml-4"
                          >
                            <path d="M12 0C9.243 0 7 2.243 7 5v4H5c-1.104 0-2 .896-2 2v11c0 1.104.896 2 2 2h14c1.104 0 2-.896 2-2V11c0-1.104-.896-2-2-2h-2V5c0-2.757-2.243-5-5-5zm-1 18.5v2.5h2v-2.5c.598-.347 1-.986 1-1.731 0-1.104-.896-2-2-2s-2 .896-2 2c0 .745.402 1.384 1 1.731zM17 9H7V5c0-2.206 1.794-4 4-4s4 1.794 4 4v4z" />
                          </svg>
                        }
                        placeholder="Enter old Password"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <TextInput
                        type={"password"}
                        name="newPassword"
                        classNames=" text-xs"
                        required={true}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            newPassword: e,
                          })
                        }
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="16px"
                            height="16px"
                            fill="grey"
                            className="pointer-events-none absolute ml-4"
                          >
                            <path d="M12 0C9.243 0 7 2.243 7 5v4H5c-1.104 0-2 .896-2 2v11c0 1.104.896 2 2 2h14c1.104 0 2-.896 2-2V11c0-1.104-.896-2-2-2h-2V5c0-2.757-2.243-5-5-5zm-1 18.5v2.5h2v-2.5c.598-.347 1-.986 1-1.731 0-1.104-.896-2-2-2s-2 .896-2 2c0 .745.402 1.384 1 1.731zM17 9H7V5c0-2.206 1.794-4 4-4s4 1.794 4 4v4z" />
                          </svg>
                        }
                        placeholder="Enter new password"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <TextInput
                        type={"password"}
                        name="confirmPassword"
                        classNames=" text-xs"
                        required={true}
                        onChange={(e) =>
                          setUserData({
                            ...userData,
                            confirmPassword: e,
                          })
                        }
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="16px"
                            height="16px"
                            fill="grey"
                            className="pointer-events-none absolute ml-4"
                          >
                            <path d="M12 0C9.243 0 7 2.243 7 5v4H5c-1.104 0-2 .896-2 2v11c0 1.104.896 2 2 2h14c1.104 0 2-.896 2-2V11c0-1.104-.896-2-2-2h-2V5c0-2.757-2.243-5-5-5zm-1 18.5v2.5h2v-2.5c.598-.347 1-.986 1-1.731 0-1.104-.896-2-2-2s-2 .896-2 2c0 .745.402 1.384 1 1.731zM17 9H7V5c0-2.206 1.794-4 4-4s4 1.794 4 4v4z" />
                          </svg>
                        }
                        placeholder="Re-enter new password"
                      />
                    </div>
                  </div>
                  {/* Show error message if passwords do not match */}
                  {!isFormValid &&
                    userData?.newPassword &&
                    userData?.confirmPassword && (
                      <p className="text-red-500 text-sm mt-2">
                        {errorMessage}
                      </p>
                    )}
                  <SubmitButton
                    name={"Change Password"}
                    classNames="w-full  py-2 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                    isLoading={isLoading} // Pass the isLoading state
                    isFormValid={isFormValid} // Pass the isFormValid state
                    onClick={handleChangePasswordClick} // Pass the handleChangePasswordClick function
                    successMessage={successMessage} // Pass the success message
                    errorMessage={errorMessage} // Pass the errorMessage state
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default ChangePassword;

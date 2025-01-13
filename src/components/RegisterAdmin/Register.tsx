/** @format */

"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { registerUser } from "./registerUser";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import SubmitButton from "../UI/Button/SubmitButton";

const RegistrationAdmin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    companyName: "",
    companyEmail: "",
    companyPhone: "",
    password: "",
  });
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegisterClick = async () => {
    setIsLoading(true);
    if (isFormValid) {
      try {
        const data = await registerUser({
          adminEmail: userData?.companyEmail,
          adminPhone: userData?.companyPhone,
          adminPassword: userData?.password,
          name: userData?.companyName,
        });
        if (data?.error) {
          setErrorMessage(data?.error);
          setIsLoading(false);
        } else if (data?.success) {
          setSuccessMessage(data?.success);
          setTimeout(() => {
            router.push("/login");
          }, 3000);
          setIsLoading(false);
        } else {
          router.push("/login");
          resetForm();
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        setErrorMessage("Failed to register company admin");
      }
    } else {
      setErrorMessage("Please enter valid input");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const MESSAGE_TIMEOUT = 3000;

    if (successMessage || errorMessage) {
      const timeout = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, MESSAGE_TIMEOUT);

      return () => clearTimeout(timeout);
    }
  }, [errorMessage, successMessage]);

  const resetForm = () => {
    setUserData({
      companyName: "",
      companyEmail: "",
      companyPhone: "",
      password: "",
    });
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber: string) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  useEffect(() => {
    if (
      userData?.companyEmail &&
      isValidEmail(userData?.companyEmail) &&
      userData?.password &&
      userData?.companyName &&
      isValidPhoneNumber(userData?.companyPhone)
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [userData]);

  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="md:p-8 p-4 mt-16 w-full max-w-xl gap-10">
        <div className="border p-8 rounded-2xl border-gray-300 md:pl-8">
          <h2 className="md:text-2xl text-xl font-bold mb-6">Register</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Company Name"
                className="w-full px-4 py-2 border rounded-lg border-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={userData?.companyName}
                onChange={(e) =>
                  setUserData({ ...userData, companyName: e.target.value })
                }
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Company Phone"
                className="w-full px-4 py-2 border rounded-lg border-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={userData?.companyPhone}
                onChange={(e) =>
                  setUserData({ ...userData, companyPhone: e.target.value })
                }
              />
              {userData?.companyPhone &&
                !isValidPhoneNumber(userData?.companyPhone) && (
                  <p className="text-red-500 text-sm mt-1">
                    Please enter a valid phone number
                  </p>
                )}
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Company Email"
                className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  userData?.companyEmail &&
                  !isValidEmail(userData?.companyEmail)
                    ? "border-red-500"
                    : "border-gray-400"
                }`}
                value={userData?.companyEmail}
                onChange={(e) =>
                  setUserData({ ...userData, companyEmail: e.target.value })
                }
              />
              {userData?.companyEmail &&
                !isValidEmail(userData?.companyEmail) && (
                  <p className="text-red-500 text-sm mt-1">
                    Please enter a valid email
                  </p>
                )}
            </div>
            <div className="mb-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-2 border rounded-lg border-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={userData?.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                />
                <span
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  )}
                </span>
              </div>
            </div>
            <SubmitButton
              name="Register"
              classNames="w-full bg-orange-500 text-white py-2 rounded-full text-sm font-semibold hover:bg-orange-600"
              isLoading={isLoading}
              isFormValid={true}
              onClick={handleRegisterClick}
              successMessage={successMessage}
              errorMessage={errorMessage}
            />
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <span
                className="text-orange-500 cursor-pointer hover:underline"
                onClick={() => router.push("/login")}
              >
                Login
              </span>
            </p>
          </div>
          {errorMessage && (
            <div
              className="mt-3 flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className=" flex w-full space-x-2 rounded-md bg-red-600 p-2">
                <ExclamationCircleIcon className="h-5 w-5 text-white" />
                <p className="text-sm text-white">{errorMessage}</p>
              </span>
            </div>
          )}
          {successMessage && (
            <div
              className="mt-7 flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className=" flex w-full space-x-2 rounded-md bg-blue-600 p-2">
                <p className="text-sm text-white">{successMessage}</p>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegistrationAdmin;

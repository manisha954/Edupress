/** @format */

"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { IoMdArrowBack } from "react-icons/io";
import Image from "next/image";

import SubmitButton from "../UI/Button/SubmitButton";
import LoadingComponent from "../UI/Loading/LoadingComponent";
import { useLanguage } from "../UI/Provider/LanguageProvider";
import { signIn } from "next-auth/react";

interface SignInData {
  userEmail: string;
  userPassword: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { langData } = useLanguage();
  const [isFormValid, setIsFormValid] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const [userData, setUserData] = useState<SignInData>({
    userEmail: "",
    userPassword: "",
  });
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignInClick = async () => {
    console.log("userData", userData);
    setIsLoading(true);
    try {
      if (userData?.userEmail && userData?.userPassword) {
        const result = await signIn("credentials", {
          login: userData?.userEmail,
          password: userData?.userPassword,
          callbackUrl: "/login",
          redirect: true,
        });

        console.log("result", result);

        if (result?.error) {
          console.log("Login failed:", result.error);
          setErrorMessage(result.error);
          if (result.error === "Not Verified") {
            router.push("/login");
          }
        } else {
          router.push("/dashboard"); // or wherever you want to redirect after success
          setIsAuthenticated(true);
        }
      } else {
        setErrorMessage("Please enter valid email or phone and password");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  const handleGoBack = () => {
    router.push("/");
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");
    if (error) {
      setErrorMessage(error);
    }
  }, []);
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
  // Carousel Component with Automatic Sliding and Clickable Dots
  const Carousel: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideInterval = 3000; // Slide interval set to 3 seconds
    let intervalId: NodeJS.Timeout;

    const slides = [
      {
        title: `Welcome Back to EPS ${"संसार"}`,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
        image: "/logo.png",
      },
      {
        title: `Welcome Back to EPS ${"संसार"}`,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        image: "/images/exam.jpg",
      },
      {
        title: `Welcome Back to EPS ${"संसार"}`,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        image: "/images/exam.jpg",
      },
    ];

    const handleDotClick = (index: number) => {
      clearInterval(intervalId); // Clear the interval on manual dot click
      setCurrentSlide(index);
      restartInterval(); // Restart the interval after clicking
    };

    const restartInterval = () => {
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        setCurrentSlide((prevSlide) =>
          prevSlide === slides.length - 1 ? 0 : prevSlide + 1
        );
      }, slideInterval);
    };

    useEffect(() => {
      restartInterval();
      return () => clearInterval(intervalId);
    }, []);

    return (
      <div className="hidden md:flex w-1/2 bg-blue-50 flex-col justify-center items-center p-10">
        <div className="max-w-md text-center">
          <div className=" h-52 w-auto mb-2">
            <Image
              src={slides[currentSlide].image}
              width={1000}
              height={1000}
              alt={slides[currentSlide].image}
              className=" h-52 w-auto mx-auto"
            />
          </div>
          <h1 className="text-base font-medium mb-4">
            {slides[currentSlide].title}
          </h1>
          <p className=" mb-4 text-sm font-medium">
            {slides[currentSlide].description}
          </p>
          <div className="flex justify-center space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`cursor-pointer ${
                  currentSlide === index
                    ? "w-8 h-3 bg-blue-500 rounded-full"
                    : "w-3 h-3 bg-blue-400 rounded-full"
                }`}
                onClick={() => handleDotClick(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      {!isAuthenticated ? (
        <>
          <div className="flex min-h-screen bg-gray-100">
            <Carousel />
            {/* Right Side - Login Form */}
            <div className="flex md:w-1/2 w-full bg-white p-8 flex-col justify-center items-center">
              <div className="w-full max-w-lg p-4 sm:p-7 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
                <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
                  <div className="flex w-full ">
                    <div className="p-1 my-auto  md:left-0 md:top-0 md:p-3">
                      <button className="" onClick={handleGoBack}>
                        <svg
                          viewBox="0 0 512 512"
                          xmlns="http://www.w3.org/2000/svg"
                          className=" text-xl font-bold text-blue-700 hover:text-blue-500"
                        >
                          <path d="M233.372 379.362l-19.524 19.524c-1.362 1.362-3.073 2.048-4.854 2.048s-3.493-.686-4.854-2.048l-144-144c-2.733-2.733-2.733-7.176 0-9.908l144-144c1.361-1.361 3.073-2.048 4.854-2.048s3.493.686 4.854 2.048l19.524 19.524c2.732 2.733 2.732 7.176 0 9.908L128.792 224H456c3.876 0 7 3.124 7 7v28c0 3.876-3.124 7-7 7H128.792l104.58 104.582c2.733 2.732 2.733 7.175 0 9.908z" />
                        </svg>
                      </button>
                    </div>
                    <div className=" flex space-x-3">
                      <picture>
                        <img
                          src="/images/logo.png"
                          alt="EPS Sansar"
                          className="h-10 w-full"
                        />
                      </picture>
                      {/* <span className="ml-2 my-auto text-xs md:text-sm font-medium">
                        EPS संसार
                      </span> */}
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                    {langData?.login?.signIn}
                  </h1>
                  {/* google */}
                  <div className="">
                    <p className=" text-xl my-2 font-mono mb-4 ">
                      Guest Account
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        signIn("google", {
                          callbackUrl: "/dashboard",
                        })
                      }
                      className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    >
                      <svg
                        className="w-4 h-auto"
                        width="46"
                        height="47"
                        viewBox="0 0 46 47"
                        fill="none"
                      >
                        <path
                          d="M46 24.0287C46 22.09 45.8533 20.68 45.5013 19.2112H23.4694V27.9356H36.4069C36.1429 30.1094 34.7347 33.37 31.5957 35.5731L31.5663 35.8669L38.5191 41.2719L38.9885 41.3306C43.4477 37.2181 46 31.1669 46 24.0287Z"
                          fill="#4285F4"
                        />
                        <path
                          d="M23.4694 47C29.8061 47 35.1161 44.9144 39.0179 41.3012L31.625 35.5437C29.6301 36.9244 26.9898 37.8937 23.4987 37.8937C17.2793 37.8937 12.0281 33.7812 10.1505 28.1412L9.88649 28.1706L2.61097 33.7812L2.52296 34.0456C6.36608 41.7125 14.287 47 23.4694 47Z"
                          fill="#34A853"
                        />
                        <path
                          d="M10.1212 28.1413C9.62245 26.6725 9.32908 25.1156 9.32908 23.5C9.32908 21.8844 9.62245 20.3275 10.0918 18.8588V18.5356L2.75765 12.8369L2.52296 12.9544C0.909439 16.1269 0 19.7106 0 23.5C0 27.2894 0.909439 30.8731 2.49362 34.0456L10.1212 28.1413Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M23.4694 9.07688C27.8699 9.07688 30.8622 10.9863 32.5344 12.5725L39.1645 6.11C35.0867 2.32063 29.8061 0 23.4694 0C14.287 0 6.36607 5.2875 2.49362 12.9544L10.0918 18.8588C11.9987 13.1894 17.25 9.07688 23.4694 9.07688Z"
                          fill="#EB4335"
                        />
                      </svg>
                      {langData?.login?.singupWithGoogle ||
                        "Sign Up with Google"}
                    </button>
                  </div>
                </div>

                <div className="flex items-center my-4">
                  <hr className="flex-grow border-gray-300" />
                  <span className="mx-2 text-gray-500">or</span>
                  <hr className="flex-grow border-gray-300" />
                </div>
                <div className="mt-5">
                  <div className="grid gap-y-4">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm mb-2 dark:text-white"
                      >
                        {langData?.login?.phoneemail}
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          required
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              userEmail: e.target.value,
                            })
                          }
                          aria-describedby="email-error"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center">
                        <label
                          htmlFor="password"
                          className="block text-sm mb-2 dark:text-white"
                        >
                          {langData?.login?.password}
                        </label>
                      </div>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-xs text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                          required
                          onChange={(e) =>
                            setUserData({
                              ...userData,
                              userPassword: e.target.value,
                            })
                          }
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                          <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="focus:outline-none"
                          >
                            {showPassword ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="size-4"
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
                                className="size-4"
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
                          </button>
                        </div>
                      </div>
                    </div>
                    <Link
                      className="text-sm text-blue-600 decoration-2 hover:text-blue-800 font-medium "
                      href="/forgotpassword"
                    >
                      {langData?.login?.forgotPassword}
                    </Link>
                    <SubmitButton
                      name={"Login"}
                      classNames="w-full mt-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-bold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                      isLoading={isLoading} // Pass the isLoading state
                      isFormValid={isFormValid} // Pass the isFormValid state
                      onClick={handleSignInClick} // Pass the handleSubmit function
                      successMessage={successMessage} // Pass the success message
                      errorMessage={errorMessage} // Pass the errorMessage state
                    />
                    {/* 
                    <p className="text-center mt-4 text-gray-900  text-sm">
                      {langData?.login?.newUser}{" "}
                      <Link href="/register">
                        <span className="text-blue-500">
                          {langData?.login?.registerHere}
                        </span>
                      </Link>
                    </p> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <LoadingComponent />
      )}
    </div>
  );
};

export default Login;

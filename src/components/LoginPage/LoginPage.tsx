"use client";
import React, { useState } from "react";
import Navbar from "../LandingPagesUi/Navbar";
import Footer from "../LandingPagesUi/Footer";

export default function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(true);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    setIsRegistering(false);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="md:p-8 p-4 mt-16 w-full max-w-xl  gap-10">
          {isRegistering ? (
            <div className="border p-8 rounded-2xl border-gray-300 md:pl-8">
              <h2 className="md:text-2xl text-xl font-bold mb-6">Register</h2>
              <form onSubmit={handleRegisterSubmit}>
                <div className="mb-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border rounded-lg border-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="mb-4">
                  <input
                    placeholder="Username"
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg border-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full px-4 py-2 border rounded-lg border-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274 1.057-.737 2.057-1.374 2.958M15 12a3 3 0 11-6 0 3 3 0 616 0z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      className="w-full px-4 py-2 border border-gray-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 616 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274 1.057-.737 2.057-1.374 2.958M15 12a3 3 0 11-6 0 3 3 0 616 0z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-2 rounded-full text-sm font-semibold hover:bg-orange-600"
                >
                  Register
                </button>
              </form>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <span
                    className="text-orange-500 cursor-pointer hover:underline"
                    onClick={() => setIsRegistering(false)}
                  >
                    Login
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <div className="border rounded-2xl border-gray-300 p-8 md:pr-8">
              <h2 className="md:text-2xl text-xl font-bold mb-6">Login</h2>
              <form onSubmit={handleLoginSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Email or Username"
                    className="w-full px-4 py-2 border border-gray-400 text-sm bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="mb-4">
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full px-4 py-2 border border-gray-400 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274 1.057-.737 2.057-1.374 2.958M15 12a3 3 0 11-6 0 3 3 0 616 0z"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="mb-4 flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <label className="text-gray-700 text-sm">Remember me</label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white py-2.5 rounded-full text-sm font-semibold md:mt-4 hover:bg-orange-600"
                >
                  Login
                </button>
                <div className="mt-4 text-center">
                  <a
                    href="#"
                    className="text-orange-500 text-sm hover:underline"
                  >
                    Lost your password?
                  </a>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

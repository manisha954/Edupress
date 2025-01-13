"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activePage, setActivePage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handlePageClick = (page: any) => {
    setActivePage(page);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (!event.target.closest(".dropdown")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSearchBar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`px-4 md:px-14 shadow-md fixed w-full z-10 transition-all duration-300 ${
        isScrolled ? "bg-white" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            src="/images/logo.png" // Replace with your logo file path
            alt="EduPress Logo"
            className="h-14 w-auto"
          />
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex">
          <li className="flex items-center">
            <Link href="/HomePage" legacyBehavior>
              <a className="text-orange-500 hover:bg-gray-100 py-3 px-6 text-sm font-semibold">
                Home
              </a>
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="/AllCourses" legacyBehavior>
              <a className="text-gray-800 text-sm hover:bg-gray-100 py-3 px-6 font-semibold hover:text-orange-500">
                Courses
              </a>
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="/Blog" legacyBehavior>
              <a className="text-gray-800 text-sm hover:bg-gray-100 py-3 px-6 font-semibold hover:text-orange-500">
                Blog
              </a>
            </Link>
          </li>
          <li className="relative flex items-center dropdown group">
            <button
              className={`text-sm font-semibold py-3 px-6 flex items-center ${
                isScrolled
                  ? "text-gray-800 hover:bg-gray-100 hover:text-orange-500"
                  : "text-gray-800 "
              }`}
              onClick={handleDropdownToggle}
            >
              Page
              {dropdownOpen ? (
                <svg
                  className="ml-1 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="ml-1 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 10.707a1 1 0 01-1.414 0L10 7.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
            {/* Dropdown */}
            {(dropdownOpen || activePage === "page") && (
              <div className="absolute top-full left-0 text-sm bg-white shadow-md mt-2 group-hover:block">
                <Link href="/ContactPage" legacyBehavior>
                  <a
                    className="block w-32 py-2 px-2 hover:bg-gray-100 text-sm text-gray-800 hover:text-orange-500"
                    onClick={() => handlePageClick("subpage1")}
                  >
                    Contact
                  </a>
                </Link>
                <Link href="/FaqPage" legacyBehavior>
                  <a
                    className="block w-32 py-2 px-2 hover:bg-gray-100 text-sm text-gray-800 hover:text-orange-500"
                    onClick={() => handlePageClick("subpage2")}
                  >
                    FAQs
                  </a>
                </Link>
              </div>
            )}
          </li>
          <li className="flex items-center">
            <Link href="#add-ons" legacyBehavior>
              <a className="text-gray-800 hover:bg-gray-100 py-3 px-6 font-semibold text-sm hover:text-orange-500">
                LearnPress Add-On
              </a>
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="#premium" legacyBehavior>
              <a className="text-gray-800 text-sm hover:bg-gray-100 py-3 px-6 font-semibold hover:text-orange-500">
                Premium Theme
              </a>
            </Link>
          </li>
        </ul>

        {/* Hamburger Menu */}
        <div className="md:hidden flex items-center">
          <button
            className="text-orange-500 border-2 border-orange-500 rounded-full p-2 hover:bg-orange-500 hover:text-white transition"
            onClick={toggleSidebar}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center">
          <Link href="/register" legacyBehavior>
            <a className="text-gray-800 text-sm px-4 font-semibold hover:text-orange-500">
              Login <span>/</span> Register
            </a>
          </Link>

          <button
            className="text-orange-500 border-2 border-orange-500 rounded-full p-2 hover:bg-orange-500 hover:text-white transition"
            onClick={toggleSearchBar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="14.45" y2="14.45" />
            </svg>
          </button>
          {isExpanded && (
            <div className="absolute top-0 left-0 w-full h-24 bg-white flex items-center justify-center transition-all duration-300">
              <input
                type="text"
                className="w-3/5 h-10 border-2 text-sm border-orange-500 rounded-full p-4"
                placeholder="Search..."
              />
              <button className="ml-4 text-orange-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="14.45" y2="14.45" />
                </svg>
              </button>
              <button
                className="absolute right-6 top-4 text-gray-500 hover:text-gray-700"
                onClick={toggleSearchBar}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <img
            src="/images/logo.png" // Replace with your logo file path
            alt="EduPress Logo"
            className="h-14 w-auto"
          />
          <button
            className="text-gray-800 hover:text-gray-600"
            onClick={toggleSidebar}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col p-4">
          <li className="flex items-center">
            <Link href="#home" legacyBehavior>
              <a className="text-orange-500 hover:bg-gray-100 py-3 px-6 text-sm font-semibold w-full">
                Home
              </a>
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="#courses" legacyBehavior>
              <a className="text-gray-800 text-sm hover:bg-gray-100 py-3 px-6 font-semibold hover:text-orange-500 w-full">
                Courses
              </a>
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="#blog" legacyBehavior>
              <a className="text-gray-800 text-sm hover:bg-gray-100 py-3 px-6 font-semibold hover:text-orange-500 w-full">
                Blog
              </a>
            </Link>
          </li>
          <li className="relative flex items-center dropdown group">
            <button
              className={`text-sm font-semibold py-3 px-6 flex items-center w-full ${
                isScrolled
                  ? "text-gray-800 hover:bg-gray-100 hover:text-orange-500"
                  : "text-gray-800 "
              }`}
              onClick={handleDropdownToggle}
            >
              Page
              {dropdownOpen ? (
                <svg
                  className="ml-1 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="ml-1 h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M14.707 10.707a1 1 0 01-1.414 0L10 7.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
            {/* Dropdown */}
            {(dropdownOpen || activePage === "page") && (
              <div className="text-sm bg-white shadow-md mt-2 group-hover:block w-full">
                <Link href="#subpage1" legacyBehavior>
                  <a
                    className="block w-full py-2 px-2 hover:bg-gray-100 text-sm text-gray-800 hover:text-orange-500"
                    onClick={() => handlePageClick("subpage1")}
                  >
                    Subpage 1
                  </a>
                </Link>
                <Link href="#subpage2" legacyBehavior>
                  <a
                    className="block w-full py-2 px-2 hover:bg-gray-100 text-sm text-gray-800 hover:text-orange-500"
                    onClick={() => handlePageClick("subpage2")}
                  >
                    Subpage 2
                  </a>
                </Link>
              </div>
            )}
          </li>
          <li className="flex items-center">
            <Link href="#add-ons" legacyBehavior>
              <a className="text-gray-800 hover:bg-gray-100 py-3 px-6 font-semibold text-sm hover:text-orange-500 w-full">
                LearnPress Add-On
              </a>
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="#premium" legacyBehavior>
              <a className="text-gray-800 text-sm hover:bg-gray-100 py-3 px-6 font-semibold hover:text-orange-500 w-full">
                Premium Theme
              </a>
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="#login" legacyBehavior>
              <a className="text-gray-800 text-sm px-4 font-semibold hover:text-orange-500 w-full">
                Login
              </a>
            </Link>
          </li>
          <li className="flex items-center">
            <Link href="#register" legacyBehavior>
              <a className="text-gray-800 px-4 hover:text-orange-500 text-sm font-semibold w-full">
                Register
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

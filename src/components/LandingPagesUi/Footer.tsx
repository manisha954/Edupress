import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 px-4 md:px-20 py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-16">
          <div className="w-full mb-6 md:mb-0">
            <img src="/images/logo.png" alt="" className="h-16" />
            <p className="mt-4 text-sm text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div className="w-full mb-6 md:mb-0">
            <h3 className="text-base font-semibold text-gray-800">GET HELP</h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-600">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-600">
                  Latest Articles
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-600">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full mb-6 md:mb-0">
            <h3 className="text-lg font-semibold text-gray-800">PROGRAMS</h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-600">
                  Art & Design
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-600">
                  Business
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-600">
                  IT & Software
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-600">
                  Languages
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-orange-600">
                  Programming
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full">
            <h3 className="text-lg font-semibold text-gray-800">CONTACT US</h3>
            <div className="mt-4 space-y-4 text-sm">
              <p className="mt-4 text-gray-600">
                Address: 2321 New Design Str, Lorem Ipsum10 Hudson Yards, USA
              </p>
              <p className="mt-2 text-gray-600">Tel: + (123) 2500-567-8988</p>
              <p className="mt-2 text-gray-600">Mail: supportlms@gmail.com</p>
              <div className="mt-4 flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-orange-600">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-gray-600 hover:text-orange-600">
                  <i className="fab fa-pinterest"></i>
                </a>
                <a href="#" className="text-gray-600 hover:text-orange-600">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-600 hover:text-orange-600">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="text-gray-600 hover:text-orange-600">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="md:mt-14 mt-6 text-sm text-center text-gray-600">
          <p>Copyright © 2024 LearnPress LMS | Powered by ThimPress</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

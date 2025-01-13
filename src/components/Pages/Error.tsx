import React from "react";
import Navbar from "../LandingPagesUi/Navbar";
import Footer from "../LandingPagesUi/Footer";


export default function Error() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen px-4">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Error</h1>
        <p className="text-gray-600 mb-8 text-center">
          Something went wrong. Please try again later.
        </p>
        <img src="/images/error.png" alt="Error" className="w-full md:w-1/2" />
      </div>
      <Footer/>
    </div>
  );
}

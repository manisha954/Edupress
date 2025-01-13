/** @format */

"use client";
import { useState, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";
import { getHeroSectionDetails } from "../Dash/WebsiteSetup/HeroSection/HeroSectionAction";
import Navbar from "../LandingPagesUi/Navbar";



export const Hero = () => {
  const [hero, setHero] = useState<any>("");
  const {
    data: footerData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["footer"],
    queryFn: async () => getHeroSectionDetails(),
  });

  useEffect(() => {
    if (
      footerData?.success &&
      Array.isArray(footerData?.data) &&
      footerData.data.length > 0
    ) {
      setHero(footerData.data[0]); // Assuming the first item in the array is the relevant data
    } else {
      setHero(null);
    }
  }, [footerData]);

  return (
    <div className="relative h-screen">
      <Navbar />
      {hero?.heroImage ? (
        <img
          src={hero.heroImage}
          alt="Hero Image"
          className="h-screen w-full object-cover"
        />
      ) : (
        <div className="h-screen w-full bg-gray-200 flex items-center justify-center">
          {" "}
          <p className="text-gray-800">No image available</p>{" "}
        </div>
      )}
      <div className="absolute px-4 md:px-20 inset-0 flex flex-col justify-center items-start pt-20">
        <h1 className="md:text-5xl text-4xl font-semibold mb-6 max-w-lg text-gray-800">
          {hero?.companyMoto}
        </h1>
        <p className="text-base mb-6 space-y-8 max-w-lg text-gray-800">
          {hero?.companySlogan}
        </p>
        <button className="bg-orange-500 text-white py-3 px-7 text-sm font-semibold rounded-full hover:border-orange-500 hover:border-2 hover:bg-transparent hover:text-orange-500 transition">
          Post Comments
        </button>
      </div>
    </div>
  );
};

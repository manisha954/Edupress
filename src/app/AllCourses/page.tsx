import AllCourses from "@/components/LandingPagesUi/AllCourses";
import Footer from "@/components/LandingPagesUi/Footer";
import Navbar from "@/components/LandingPagesUi/Navbar";
import React from "react";

export default function page() {
  return (
    <div>
      <Navbar />
      <AllCourses />
      <Footer />
    </div>
  );
}

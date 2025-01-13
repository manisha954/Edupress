import Footer from "@/components/LandingPagesUi/Footer";
import Navbar from "@/components/LandingPagesUi/Navbar";
import Login from "@/components/Login/Login";
import React from "react";

export default function page() {
  return (
    <div>
      <Navbar />
      <Login />
      <Footer />
    </div>
  );
}

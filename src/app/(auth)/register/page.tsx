
import Footer from "@/components/LandingPagesUi/Footer";
import Navbar from "@/components/LandingPagesUi/Navbar";
import RegistrationAdmin from "@/components/RegisterAdmin/Register";
import React from "react";

export default function page() {
  return (
    <div>
      <Navbar />
      <RegistrationAdmin />
      <Footer />
    </div>
  );
}

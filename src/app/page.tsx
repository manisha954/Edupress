import CoursePage from "@/components/Courses/CorsesExpand";
import FAQSection from "@/components/Pages/Faq";

import LoginPage from "@/components/LoginPage/LoginPage";
import Error from "@/components/Pages/Error";
import React from "react";
import Contact from "@/components/Pages/Contact";

import BlogPost from "@/components/Blog/BlogPost";
import Login from "@/components/Login/Login";
import RegistrationAdmin from "@/components/RegisterAdmin/Register";
import ProfileDetails from "@/components/Dashboard/Admin/Profile/ProfileDetails";
import CompanyInfoForm from "@/components/Dash/WebsiteSetup/HeroSection/AddHeroSectionDetails";
import WebsiteDetailTable from "@/components/Dash/WebsiteSetup/HeroSection/HeroSectionTable";
import { Hero } from "@/components/LandingPage/Hero";
import Navbar from "@/components/LandingPagesUi/Navbar";
import HeroSection from "@/components/LandingPagesUi/HeroSection";
import AddFeatureCourseForm from "@/components/Dash/WebsiteSetup/FeatureCourses/AddCourseDetails";
import FeaturedCourses from "@/components/LandingPagesUi/FeatureCourses";
import CourseDetailsTable from "@/components/Dash/WebsiteSetup/FeatureCourses/CourseDetailsTable";
import FeaturedCourse from "@/components/LandingPage/FeatureCourse";
import AllCourses from "@/components/LandingPage/AllCourses";
import LMSLandingPage from "@/components/LandingPagesUi/FeatureCourses";
import ArticleForm from "@/components/Dash/WebsiteSetup/Blog/AddArticleDetails";
import ArticleTable from "@/components/Dash/WebsiteSetup/Blog/ArticleDetailsTable";
import Article from "@/components/LandingPage/Article";
import AllArticle from "@/components/LandingPage/AllArticles";

export default function page() {
  return (
    <div>
      {/* <Navbar/> */}
      {/* <HeroSection /> */}
      {/* <LoginPage /> */}

      {/* <CoursePage /> */}
      {/* <LMSLandingPage/> */}
      {/* <FAQSection /> */}
      {/* <Error />  */}
      {/* <Contact /> */}
      {/* <AllArticle /> */}
      {/* <Login /> */}
      {/* <RegistrationAdmin /> */}
      {/* <ProfileDetails /> */}
      {/* <CompanyInfoForm /> */}
      {/* <WebsiteDetailTable /> */}
      {/* <Hero /> */}
      {/* <AddFeatureCourseForm /> */}
      {/* <CourseDetailsTable /> */}
      {/* <FeaturedCourse /> */}
      {/* <AllCourses /> */}
      {/* <ArticleForm /> */}
      {/* <ArticleTable /> */}
      <Article />
      {/* <AllArticle /> */}
    </div>
  );
}

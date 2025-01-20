/** @format */

"use client";

import { getCourseSpecific } from "@/components/Dash/WebsiteSetup/FeatureCourses/CourseDetailsAction";
import AllCourses from "@/components/LandingPage/AllCourses";
// import { getCourseSpecific } from "@/src/components/CoreComponents/Admin/OnlineCourse/CourseServerActions";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { useEffect, useState } from "react";

const CoursesPost = () => {
  const params = useParams();

  // Ensure params is not null
  if (!params || !params.slug) {
    return <div>Error: Missing or invalid parameters.</div>;
  }

  const slug = params.slug;
  const [courseData, setCourseData] = useState<any>();

  // React Query to fetch course details
  const { data: courseDetailSp } = useQuery({
    queryKey: ["courseDetail", slug[1]],
    queryFn: async () => {
      if (slug[1]) {
        return getCourseSpecific(slug[1]);
      }
      return null; // Return null if slug[1] is not available
    },
    enabled: !!slug[1], // Ensure query runs only if slug[1] is available
  });

  useEffect(() => {
    if (courseDetailSp?.success) {
      setCourseData(courseDetailSp.success);
      console.log("Hello", courseDetailSp.success);
    }
  }, [courseDetailSp?.success]);

  return (
    <div>
      <AllCourses course={courseData} />
    </div>
  );
};

export default CoursesPost;

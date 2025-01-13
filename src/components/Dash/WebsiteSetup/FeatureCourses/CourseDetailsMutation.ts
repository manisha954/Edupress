"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCourseDetails, deletecourseDetails } from "./CourseDetailsAction";

export default function useCourseDetailsMutations() {
  const queryClient = useQueryClient();

  const { mutateAsync: courseDetail } = useMutation({
    mutationFn: addCourseDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [" heroSection"] });
    },
  });
  const { mutateAsync: deleteCourseDetail } = useMutation({
    mutationFn: deletecourseDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [" heroSection"] });
    },
  });

  return {
    courseDetail,
    deleteCourseDetail,
  };
}

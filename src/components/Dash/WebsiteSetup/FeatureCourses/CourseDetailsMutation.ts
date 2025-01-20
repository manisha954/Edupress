"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCourseDetails, deleteCourseDetails } from "./CourseDetailsAction";

export default function useCourseDetailsMutations() {
  const queryClient = useQueryClient();

  const { mutateAsync: courseDetail } = useMutation({
    mutationFn: addCourseDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [" courseDetails"] });
    },
  });
  const { mutateAsync: deleteCourseDetail } = useMutation({
    mutationFn: deleteCourseDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [" courseDetails"] });
    },
  });

  return {
    courseDetail,
    deleteCourseDetail,
  };
}

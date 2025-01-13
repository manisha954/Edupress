"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addHeroSection, deleteHeroSectionDetails } from "./HeroSectionAction";

export default function useHeroSectionMutations() {
  const queryClient = useQueryClient();

  const { mutateAsync: heroSectionDetail } = useMutation({
    mutationFn: addHeroSection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [" heroSection"] });
    },
  });
  const { mutateAsync: deleteHeroSection } = useMutation({
    mutationFn: deleteHeroSectionDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [" heroSection"] });
    },
  });

  return {
    heroSectionDetail,
    deleteHeroSection,
  };
}

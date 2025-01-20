"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addArticleDetails,
  deleteArticleDetails,
} from "./ArticleDetailsAction";

export default function useArticleDetailsMutations() {
  const queryClient = useQueryClient();

  const { mutateAsync: articleDetail } = useMutation({
    mutationFn: addArticleDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [" articleDetails"] });
    },
  });
  const { mutateAsync: deleteArticleDetail } = useMutation({
    mutationFn: deleteArticleDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [" articleDetails"] });
    },
  });

  return {
    articleDetail,
    deleteArticleDetail,
  };
}

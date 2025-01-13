/** @format */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCompany } from "./CompanyServerActions";

export default function useCompanyMutations() {
  const queryClient = useQueryClient();

  const { mutateAsync: updateCompanyInfo } = useMutation({
    mutationFn: updateCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companyData"] });
    },
  });

  return {
    updateCompanyInfo,
  };
}

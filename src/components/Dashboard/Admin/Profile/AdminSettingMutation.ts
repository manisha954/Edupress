/** @format */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAdminDetails, updateAdminSetting } from "./AdminSettingActions";

export default function useAdminDetailMutation() {
  const queryClient = useQueryClient();

  const { mutateAsync: updateDetail } = useMutation({
    mutationFn: updateAdminDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ "adminDetail", "userSetting"],
      });
    },
  });
  const { mutateAsync: updateSetting } = useMutation({
    mutationFn: updateAdminSetting,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ "adminDetail", "userSetting"],
      });
    },
  });

  return {
    updateDetail,
    updateSetting,
  };
}

/** @format */
"use client";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getAdminDetails } from "./AdminSettingActions";

const AdminDataProfile = () => {
  // const { stockCountData } = StoreStockCount();
  const { data: adminProfileData } = useQuery({
    queryFn: async () => getAdminDetails(),
    queryKey: ["adminDetail"],
  });
  const [userDetails, setUserDetail] = useState<any>();
  useEffect(() => {
    if (adminProfileData?.success) {
      setUserDetail({
        email: adminProfileData.success.userEmail,
        phone: adminProfileData.success.userPhone,
        name: adminProfileData.success.userName,
      });
    }
  }, [adminProfileData?.success]);

  // Return combined data
  return {
    userDetails,
  };
};

export default AdminDataProfile;

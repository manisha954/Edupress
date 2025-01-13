/** @format */
"use client";

import { getSetting } from "@/components/ServerAction/settingActions";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const BasicSettingData = () => {
  const [basicSettingData, setbasiSettingData] = useState<any>(null);

  const { data: basicSetting } = useQuery({
    queryFn: async () => getSetting(),
    queryKey: ["userSettings"],
  });

  useEffect(() => {
    if (basicSetting?.success) {
      console.log("reaches heree", basicSetting?.success);
      setbasiSettingData({
        userId: basicSetting.success?.userId,

        calanderType: basicSetting.success?.calanderType,
        fontSize: basicSetting.success?.fontSize,
        theme: basicSetting.success?.theme,
        specificId: basicSetting.success?.specificId,
        initialSetup: basicSetting.success.initialSetup,

        language: basicSettingData?.success?.language,
      });
    }
  }, [basicSetting?.success]);

  return {
    basicSettingData,
  };
};

export default BasicSettingData;

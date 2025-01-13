/** @format */

import React, { useEffect, useState } from "react";
import ProfileDetails from "./ProfileDetails";
import BasicSetting from "./BasicSetting";

import { useLanguage } from "@/components/UI/Provider/LanguageProvider";
import Breadcrumb from "@/components/UI/Breadcrumb";
import ChangePassword from "@/components/Password/ChangePassword";

interface TabProps {
  title: string;
  component: React.ReactNode;
}

const Tabs: React.FC<{ tabs: TabProps[] }> = ({ tabs }) => {
  const { langData } = useLanguage();
  const [activeTab, setActiveTab] = useState<number>(0);
  const [hideInvoiceSection, setHideInvoiceSection] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      // Define a threshold for small screens
      const smallScreenThreshold = 600;

      setIsSmallScreen(width < smallScreenThreshold);
      if (width >= smallScreenThreshold) {
        setHideInvoiceSection(false);
      }
    };

    // Initial screen size check
    handleResize();

    // Attach event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className="md:flex">
        <div>
          {isSmallScreen ? (
            <div className="mb-4">
              <select
                className="w-full p-2 border rounded-md"
                value={activeTab}
                onChange={(e) => setActiveTab(Number(e.target.value))}
              >
                {tabs.map((tab, index) => (
                  <option key={index} value={index}>
                    {tab.title}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div
              className={`${
                hideInvoiceSection
                  ? "hidden"
                  : "flex md:space-x-4 md:space-y-0 space-y-1 space-x-0 flex-col md:flex-row md:my-auto justify-between"
              }`}
            >
              <ul className="flex-column md:w-52 space-y-4 font-medium text-gray-500 dark:text-gray-400 ">
                {tabs.map((tab: any, index: number) => (
                  <li key={index}>
                    <button
                      onClick={() => setActiveTab(index)}
                      className={`inline-flex items-center px-4 py-2 rounded-lg ${
                        activeTab === index
                          ? "bg-blue-700 text-white"
                          : "hover:text-gray-900 bg-gray-50 border hover:bg-gray-100"
                      } dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white w-full`}
                    >
                      {tab.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="md:p-6 bg-gray-50 border-s md:ml-4 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
          {tabs[activeTab].component}
        </div>
      </div>
    </div>
  );
};

// Usage example
const ProfileSetting: React.FC = () => {
  const { langData } = useLanguage();

  const tabs: TabProps[] = [
    {
      title: langData?.profile.profile || "Profile",
      component: <ProfileDetails />,
    },
    {
      title: langData?.profile.settings || "Setting",
      component: <BasicSetting />,
    },

    {
      title: langData?.profile.password || "Forgot Password",
      component: <ChangePassword />,
    },
  ];

  const breadcrumbItems = [
    {
      title: langData?.profile.home || "Home",
      link: "/dashboard?component=dashboardAdmin",
    },
    { title: langData?.profile.profile || "Profile" },
  ];

  return (
    <div className="border rounded-md p-4 m-4 shadow-sm">
      <div className="">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="mt-5">
        <Tabs tabs={tabs} />
      </div>
    </div>
  );
};

export default ProfileSetting;

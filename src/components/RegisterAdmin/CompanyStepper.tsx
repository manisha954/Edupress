/** @format */

import { FaMapMarkerAlt } from "react-icons/fa";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCompany } from "./CompanyServerActions";
import useCompanyMutations from "./CompanyMutations";

import TextInput from "../UI/InputField/TextInput";
import PhotoInput from "../UI/InputField/PhotoInput";
import SubmitButton from "../UI/Button/SubmitButton";
import { imageUrlToFile } from "../../../util/UrlToImage";
import SelectOptionsList from "../UI/InputField/SelectOptionsList";
import { countryData } from "../../../util/countryData";

interface CompanyInfoInterface {
  companyData?: any;
}

interface CompanyFormDataCompany {
  companyId: string;
  companyName: string;
  companyPan: string;
  companyOwnerName: string;
  companyCountry: string;
  companyState: string;
  companyDistrict: string;
  companyMunicipality: string;
  companyWard: string;
  companyCity: string;
  companyLandmark: string;
  companyEmail: string;
  companyPhone: string;
  companyLocation: string;
  companyLogo?: File | null;
}

const CompanyStepper: React.FC<CompanyInfoInterface> = ({ companyData }) => {
  // const { companySpecificData } = SpecificCompanyData();
  const [formDataCompany, setFormDataCompany] =
    useState<CompanyFormDataCompany>({
      companyId: "",
      companyName: "",
      companyPan: "",
      companyOwnerName: "",
      companyCountry: "",
      companyState: "",
      companyDistrict: "",
      companyMunicipality: "",
      companyWard: "",
      companyCity: "",
      companyLandmark: "",
      companyEmail: "",
      companyPhone: "",
      companyLocation: "",
      companyLogo: null,
    });
  const [photo, setPhoto] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [clearOnSuccess, setClearOnSuccess] = useState(false);
  const { updateCompanyInfo } = useCompanyMutations();
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string>();

  const handleFileChange = (file: File) => {
    setFormDataCompany({
      ...formDataCompany,
      companyLogo: file,
    });
  };
  const queryClient = useQueryClient();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (companyData) {
  //       const fullAddress = JSON.parse(companyData[0]?.branchAddressFull || "");

  //       const companyLogo = companyData[0]?.branchLogo
  //         ? await imageUrlToFile(companyData[0]?.branchLogo)
  //         : null;

  //       setFormDataCompany({
  //         companyId: companyData[0].id,
  //         companyName: companyData[0]?.branchName,
  //         companyPan: companyData[0]?.branchPan,
  //         companyOwnerName: companyData[0]?.companyName,
  //         companyCountry: fullAddress?.institutionCountry,
  //         companyState: fullAddress?.institutionState,
  //         companyDistrict: fullAddress?.institutionDistrict,
  //         companyMunicipality: fullAddress?.institutionMunicipality || "",
  //         companyWard: fullAddress?.institutionWard || "",
  //         companyCity: fullAddress?.institutionCity || "",
  //         companyLandmark: fullAddress?.institutionLandmark || "",
  //         companyEmail: companyData[0]?.branchEmail || "",
  //         companyPhone: companyData[0].branchPhone || "",
  //         companyMapLocation: fullAddress?.institutionMapLocation || "",
  //         companyDeliveryAddress: companyData[0].companyDeliveryAddress,
  //         companyLogo: companyLogo,
  //       });
  //     } else if (companySpecificData) {
  //       const fullAddress = JSON.parse(
  //         companySpecificData?.branchAddressFull || ""
  //       );

  //       const companyLogo = companySpecificData?.branchLogo
  //         ? await imageUrlToFile(companySpecificData?.branchLogo)
  //         : null;
  //       //console.log("data", companyData);

  //       setFormDataCompany({
  //         companyId: companySpecificData.specificId,
  //         companyName: companySpecificData?.branchName || "",
  //         companyPan: companySpecificData.branchPan || "",
  //         companyOwnerName: companySpecificData.branchOwner || "",
  //         companyCountry: fullAddress?.institutionCountry || "",
  //         companyState: fullAddress?.institutionState || "",
  //         companyDistrict: fullAddress?.institutionDistrict || "",
  //         companyMunicipality: fullAddress?.institutionMunicipality || "",
  //         companyWard: fullAddress?.institutionWard || "",
  //         companyCity: fullAddress?.institutionCity || "",
  //         companyLandmark: fullAddress?.institutionLandmark || "",
  //         companyEmail: companySpecificData?.branchEmail || "",
  //         companyPhone: companySpecificData.branchPhone || "",
  //         companyMapLocation: fullAddress?.institutionMapLocation || "",
  //         companyDeliveryAddress: companySpecificData.branchDeliveryAddress,
  //         companyLogo: companyLogo,
  //       });
  //     }
  //   };
  //   fetchData();
  // }, [companyData, companySpecificData]);
  useEffect(() => {
    if (errorMsg) {
      const timeout = setTimeout(() => {
        setErrorMsg("");
      }, 5000); // Hide the alert after 3 seconds

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [errorMsg, setErrorMsg]);

  const { mutateAsync: getCompayDetails } = useMutation({
    mutationFn: getCompany,
    onSuccess: (data) => {
      queryClient.setQueryData(["companyData"], data);
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCompayDetails();
      const Data = response?.success;
      const companyLogoOne = Data?.companyLogo
        ? await imageUrlToFile(Data?.companyLogo)
        : null;
      if (Data) {
        setFormDataCompany({
          companyId: Data?.companyId,
          companyName: Data?.companyName || "",
          companyPan: Data?.companyPan || "",
          companyOwnerName: Data?.companyOwnerName || "",
          companyCountry: Data?.companyCountry || "",
          companyState: Data?.companyState || " ",
          companyDistrict: Data?.companyDistrict || "",
          companyMunicipality: Data?.companyMunicipality || "",
          companyWard: Data?.companyWard || "",
          companyCity: Data?.companyCity || "",
          companyLandmark: Data?.companyCity || "",
          companyEmail: Data?.companyEmail || "",
          companyPhone: Data?.companyPhone || "",
          companyLogo: companyLogoOne,
          companyLocation:
            Array.isArray(Data?.companyLocation) &&
            Data.companyLocation.length === 0
              ? "Click the icon to get Location"
              : Data?.companyLocation.join(","),
        });
        setPhoto(Data?.companyLogo || "");
      }
      if (response?.error) {
        setErrorMsg(response?.error);
      }
    };
    fetchData();
  }, []);

  // console.log('Top' + imageUrl);
  const uniqueProvinces: string[] = Array.from(
    new Set<string>(
      countryData
        .filter((data: any) => data.Country === formDataCompany?.companyCountry)
        .flatMap((data: any) =>
          data.Additional?.map((additionalData: any) => additionalData.Province)
        )
        .filter(
          (province: any): province is string => typeof province === "string"
        )
    )
  );
  const uniqueDistrict: string[] = Array.from(
    new Set<string>(
      countryData
        .filter((data: any) => data.Country === formDataCompany.companyCountry)
        .flatMap((data: any) =>
          data.Additional?.filter(
            (additionalData: any) =>
              additionalData.Province === formDataCompany.companyState
          ).map((additionalData: any) => additionalData.District)
        )
        .filter(
          (district: any): district is string => typeof district === "string"
        )
    )
  );
  const uniqueMunicipality: string[] = Array.from(
    new Set<string>(
      countryData
        .filter((data: any) => data.Country === formDataCompany.companyCountry)
        .flatMap((data: any) =>
          data.Additional?.filter(
            (additionalData: any) =>
              additionalData.Province === formDataCompany.companyState &&
              additionalData.District === formDataCompany.companyDistrict
          ).map((additionalData: any) => additionalData.Municipality)
        )
        .filter(
          (municipality: any): municipality is string =>
            typeof municipality === "string"
        )
    )
  );

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormDataCompany((prevData) => ({
            ...prevData,
            companyLocation: `${latitude}, ${longitude}`,
          }));
        },
        (error) => {
          console.error("Error fetching location: ", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleCompany = async () => {
    setIsLoading(true);
    try {
      const settingState = {
        companyId: formDataCompany.companyId,
        companyName: formDataCompany.companyName,
        companyPan: formDataCompany.companyPan,
        companyOwnerName: formDataCompany.companyOwnerName,
        companyCountry: formDataCompany.companyCountry,
        companyState: formDataCompany.companyState,
        companyDistrict: formDataCompany.companyDistrict,
        companyMunicipality: formDataCompany.companyMunicipality,
        companyWard: formDataCompany.companyWard,
        companyCity: formDataCompany.companyCity,
        companyLandmark: formDataCompany.companyLandmark,
        companyEmail: formDataCompany.companyEmail,
        companyPhone: formDataCompany.companyPhone,
        companyLocation: formDataCompany.companyLocation,
      };
      console.log("sett", settingState);
      if (settingState) {
        const companyData = JSON.stringify(settingState);
        // console.log("st", formDataCompany);
        const formData = new FormData();
        // console.log("uff", formData);
        if (companyData) {
          formData.append("companyData", companyData);
        }

        if (formDataCompany?.companyLogo != null) {
          let logoToAppend: File | undefined;

          if (formDataCompany?.companyLogo) {
            logoToAppend = formDataCompany.companyLogo;
          }

          if (logoToAppend !== undefined) {
            formData.append("companyLogo", logoToAppend);
          }
        }

        const data = await updateCompanyInfo(formData);
        if (data?.success) {
          setSuccessMessage(data?.success);
          setIsLoading(false);
          setIsFormValid(false);
          setClearOnSuccess(true);
        } else if (data?.error) {
          setErrorMessage(data?.error);
          setIsLoading(false);
          if (data.error === "Invalid session") {
            router.push("/login");
          }

          setIsLoading(false);
        } else {
          setErrorMessage("Try again later");
          setIsLoading(false);
        }
      } else {
        setErrorMessage("Please enter valid input");
        setIsLoading(false);
      }
    } catch (error) {
      setErrorMessage("Failed to add party category");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (formDataCompany.companyName) {
      setIsFormValid(true);
    }
  }, [formDataCompany.companyName]);

  useEffect(() => {
    if (errorMessage || successMessage) {
      const timeout = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 3000); // Hide the alert after 5 seconds

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [successMessage, errorMessage]);
  return (
    <>
      <div className="h-[80vh] overflow-y-auto">
        <div className="px-2 pt-3 bg-white">
          <blockquote className=" border-s-4 border-blue-500 bg-gray-50 pl-2 dark:border-gray-500 dark:bg-gray-800">
            {" "}
            <p className=" text-base font-bold leading-relaxed text-gray-900 dark:text-white ">
              Company Details
            </p>
          </blockquote>
        </div>
        <div className=" ">
          <div className="flex px-5 pt-5 text-sm md:text-base ">
            <div className=" flex w-full flex-wrap   ">
              <div className=" w-[100%] md:w-[60%]">
                <div className=" ml-2 flex flex-wrap gap-3">
                  <div className=" flex-1  basis-[100%] md:basis-[50%]  lg:basis-[50%]">
                    <TextInput
                      type="text"
                      label="  Company Name (*):"
                      placeholder="Enter Full company Name"
                      clearOnSuccess={clearOnSuccess}
                      name="companyOwner"
                      classNames=" text-xs"
                      required
                      values={formDataCompany.companyName}
                      onChange={(value) => {
                        setFormDataCompany({
                          ...formDataCompany,
                          companyName: value,
                        });
                      }}
                    />
                  </div>
                  <div className="flex-1 basis-[100%] md:basis-[50%] lg:basis-[25%]">
                    <TextInput
                      type="text"
                      label="  Company PAN/VAT (*):"
                      placeholder="Enter  company PAN/VAT"
                      clearOnSuccess={clearOnSuccess}
                      name="companyPan"
                      classNames=" text-xs"
                      required
                      values={formDataCompany.companyPan}
                      onChange={(value) => {
                        setFormDataCompany({
                          ...formDataCompany,
                          companyPan: value,
                        });
                      }}
                    />
                  </div>
                  <div className="flex-1 basis-[100%] md:basis-[50%] lg:basis-[25%]">
                    <TextInput
                      type="text"
                      label="  Company Owner Name (*):"
                      placeholder="Enter  company Owner Name"
                      name="companyPan"
                      classNames=" text-xs"
                      clearOnSuccess={clearOnSuccess}
                      required
                      values={formDataCompany.companyOwnerName}
                      onChange={(value) => {
                        setFormDataCompany({
                          ...formDataCompany,
                          companyOwnerName: value,
                        });
                      }}
                    />
                  </div>

                  <div className=" flex-1 basis-[100%] md:basis-[50%]  lg:basis-[25%]">
                    <label
                      className={`block mb-2 text-xs font-medium text-gray-900 dark:text-white`}
                    >
                      Country
                    </label>
                    <select
                      className={`bg-gray-50 border text-xs border-gray-300  text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                      value={formDataCompany?.companyCountry}
                      onChange={(e) => {
                        const newValue = e.target.value;
                        setFormDataCompany({
                          ...formDataCompany,
                          companyCountry: newValue,
                        });
                      }}
                    >
                      <option value={""}> Select Option</option>
                      {Array.from(
                        new Set(countryData.map((data: any) => data.Country))
                      ).map((item: any) => (
                        <option key={item} value={item}>
                          {item.charAt(0).toUpperCase() +
                            item.slice(1).toLowerCase()}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className=" flex-1 basis-[100%] md:basis-[50%]  lg:basis-[25%]">
                    <SelectOptionsList
                      classNames="text-xs"
                      label="State"
                      clearOnSuccess={clearOnSuccess}
                      values={formDataCompany.companyState}
                      items={uniqueProvinces}
                      onSelectOption={(value: any) => {
                        setFormDataCompany({
                          ...formDataCompany,
                          companyState: value,
                        });
                      }}
                    />
                  </div>
                  <div className=" flex-1 basis-[100%] md:basis-[50%]  lg:basis-[25%]">
                    <SelectOptionsList
                      classNames="text-xs"
                      label="District"
                      clearOnSuccess={clearOnSuccess}
                      values={formDataCompany.companyDistrict}
                      items={uniqueDistrict}
                      onSelectOption={(value: any) => {
                        setFormDataCompany({
                          ...formDataCompany,
                          companyDistrict: value,
                        });
                      }}
                    />
                  </div>
                  <div className=" flex-1 basis-[100%] md:basis-[50%]  lg:basis-[25%]">
                    <SelectOptionsList
                      classNames="text-xs"
                      label="Municipality"
                      clearOnSuccess={clearOnSuccess}
                      values={formDataCompany.companyMunicipality}
                      items={uniqueMunicipality}
                      onSelectOption={(value: any) => {
                        setFormDataCompany({
                          ...formDataCompany,
                          companyMunicipality: value,
                        });
                      }}
                    />
                  </div>
                  <div className=" flex-1 basis-[100%] md:basis-[50%]  lg:basis-[25%]">
                    <TextInput
                      type="text"
                      label="  Company Ward:"
                      placeholder="Enter Company Ward"
                      clearOnSuccess={clearOnSuccess}
                      name="companyWard"
                      classNames=" text-xs"
                      required
                      values={formDataCompany.companyWard}
                      onChange={(value) => {
                        setFormDataCompany({
                          ...formDataCompany,
                          companyWard: value,
                        });
                      }}
                    />
                  </div>
                  <div className=" flex-1 basis-[100%] md:basis-[50%]  lg:basis-[25%]">
                    <TextInput
                      type="text"
                      label="  Company City (*):"
                      placeholder="Enter Company City"
                      clearOnSuccess={clearOnSuccess}
                      name="companyCity"
                      classNames=" text-xs"
                      required
                      values={formDataCompany.companyCity}
                      onChange={(value) => {
                        setFormDataCompany({
                          ...formDataCompany,
                          companyCity: value,
                        });
                      }}
                    />
                  </div>
                  <div className=" flex-1 basis-[100%] md:basis-[50%]  lg:basis-[25%]">
                    <TextInput
                      type="text"
                      label="  Landmark:"
                      placeholder="Enter Nearest Landmark"
                      name="landMark"
                      classNames=" text-xs"
                      clearOnSuccess={clearOnSuccess}
                      required
                      values={formDataCompany.companyLandmark}
                      onChange={(value) => {
                        setFormDataCompany({
                          ...formDataCompany,
                          companyLandmark: value,
                        });
                      }}
                    />
                  </div>

                  <div className=" flex-1 basis-[100%] md:basis-[50%]  lg:basis-[25%]">
                    <TextInput
                      type="email"
                      label="  Company Email:"
                      placeholder="company@gmail.com"
                      name="email"
                      classNames=" text-xs"
                      clearOnSuccess={clearOnSuccess}
                      required
                      values={formDataCompany.companyEmail}
                      onChange={(value) => {
                        setFormDataCompany({
                          ...formDataCompany,
                          companyEmail: value,
                        });
                      }}
                    />
                  </div>
                  <div className=" flex-1 basis-[100%] md:basis-[50%]  lg:basis-[25%]">
                    <TextInput
                      type="text"
                      label="  Company Phone:"
                      clearOnSuccess={clearOnSuccess}
                      placeholder="9800000000"
                      name="phoneNumber"
                      classNames=" text-xs"
                      required
                      values={formDataCompany.companyPhone}
                      onChange={(value) => {
                        setFormDataCompany({
                          ...formDataCompany,
                          companyPhone: value,
                        });
                      }}
                    />
                  </div>
                  <div className=" flex-1 basis-[100%] md:basis-[50%]  lg:basis-[25%]">
                    <div className="relative">
                      <TextInput
                        type="text"
                        classNames=" text-xs"
                        label={" Map Location (Click on icon)"}
                        clearOnSuccess={clearOnSuccess}
                        name="companyMapLocation"
                        values={formDataCompany.companyLocation}
                        onChange={(value) => {
                          setFormDataCompany({
                            ...formDataCompany,
                            companyLocation: value,
                          });
                        }}
                      />
                      <svg
                        className="absolute right-3 top-10 -translate-y-1/2 transform cursor-pointer"
                        onClick={handleLocationClick}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512"
                        width="24"
                        height="24"
                        fill="currentColor"
                      >
                        <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  * are required field. Please fill it.
                </p>
              </div>

              <div className="  w-[100%] ml-5 md:w-[25%]">
                <div className="w-full">
                  <p className=" p-2 text-center text-base font-bold">
                    {" "}
                    Upload Logo *
                  </p>

                  <PhotoInput
                    values={formDataCompany.companyLogo}
                    onFileSelected={handleFileChange}
                    allowedExtensions={["jpg", "jpeg", "png", "gif"]}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className=" w-full flex justify-center my-2 px-5">
            <div className=" md:w-1/4 w-full  text-center">
              <SubmitButton
                name={"Save details"}
                isLoading={isLoading}
                classNames=" w-full"
                isFormValid={isFormValid}
                onClick={handleCompany}
                successMessage={successMessage}
                errorMessage={errorMessage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyStepper;

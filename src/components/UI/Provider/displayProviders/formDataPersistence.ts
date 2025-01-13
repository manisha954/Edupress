/** @format */

import { get, set } from "idb-keyval";

// Convert file to base64 string
const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

// Serialize FormData, converting files to base64 strings
export const serializeFormData = async (formData: FormData) => {
  const serializedFormData: { [key: string]: any } = {};
  for (const [key, value] of Array.from(formData.entries())) {
    if (value instanceof File) {
      serializedFormData[key] = await convertFileToBase64(value);
    } else {
      serializedFormData[key] = value;
    }
  }
  return serializedFormData;
};

// Deserialize FormData from serialized data
export const deserializeFormData = (serializedFormData: {
  [key: string]: any;
}): FormData => {
  const formData = new FormData();
  for (const [key, value] of Object.entries(serializedFormData)) {
    if (typeof value === "string" && value.startsWith("data:")) {
      formData.append(key, base64ToFile(value, key));
    } else {
      formData.append(key, value);
    }
  }
  return formData;
};

// Convert base64 string to File
const base64ToFile = (base64: string, fileName: string): File => {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
};

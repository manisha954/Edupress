/** @format */

"use server";

import { supabase } from "../supabaseClient";

const email = "admin@gmail.com"; // Replace with your user's email
const password = "123456";
function getRandomTimestampFilename(file: string) {
  const extension = file.split(".").pop();
  const fileNme = file.split(".")[0];
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000000); // Generates a random number between 0 and 999999
  return `${timestamp}_${randomNum}_${fileNme}.${extension}`;
}
// Replace with your user's password
export const uploadFile = async (file: File, bucketName: string) => {
  const { data: signInData, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (authError) {
    console.error("Failed to authenticate:", authError.message);
    return { status: 500, error: "Failed to authenticate" };
  }

  console.log("Anonymous authentication successful. User:");
  const { data: buckets, error: connectionError } =
    await supabase.storage.listBuckets();
  if (connectionError) {
    console.error("Failed to connect to Supabase:", connectionError.message);
    console.log("Errors:", buckets);
  }
  console.log("Supabase connection established. Buckets:", buckets);

  const filePath = getRandomTimestampFilename(file.name); // Use original file name
  let { error } = await supabase.storage
    .from(bucketName)
    .upload(`${filePath}`, file);

  if (error) {
    console.error(`Error uploading ${file.name}:`, error.message);
    throw new Error(`Failed to upload ${file.name}`);
  } else {
    console.log(`${file.name} uploaded Candidate created`);
  }

  // Get the public URL of the uploaded file

  const { data } = supabase.storage
    .from(bucketName)
    .getPublicUrl(`${filePath}`);

  return data.publicUrl;
};

export const deleteFile = async (fileUrl: string) => {
  if (fileUrl) {
    const urlParts = fileUrl.split("/");
    const bucket = urlParts[urlParts.length - 2];
    const filePath = urlParts[urlParts.length - 1];

    // Delete the file from the bucket
    const { error: deleteError } = await supabase.storage
      .from(bucket)
      .remove([filePath]);

    if (deleteError) {
      throw deleteError;
    }
  }
};

export const uploadAttachement = async (formDataToSubmit: FormData) => {
  try {
    if (formDataToSubmit) {
      const registeredDocument = formDataToSubmit.get("uploadedDocument");

      let documentPaths = "";

      // Upload registered documents if provided
      if (registeredDocument instanceof File) {
        const documentPath = await uploadFile(
          registeredDocument,
          "elearning/chats"
        );
        console.log("Document uploaded to:", documentPath);
        if (documentPath.toString() !== "") {
          documentPaths = documentPath.toString();
        }
      }
      if (documentPaths !== "") {
        return { success: documentPaths };
      } else {
        return { error: "File" };
      }
    }
  } catch (error) {
    console.error("Error in createGroup:", error);
    return { error: "Internal Server Error" };
  }
};

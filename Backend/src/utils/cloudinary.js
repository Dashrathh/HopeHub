import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


/**
 * @param {LocalFile | LocalFile[]} localFilePaths - Single file path or array of file paths.
 * @returns {Promise<string | string[] | null>} - Secure URL(s) of the uploaded file(s).
 */
export const uploadOnCloudinary = async (localFilePath) => {
  if (
    !localFilePaths ||
    (Array.isArray(localFilePaths) && localFilePaths.length === 0)
  )
    return null;

  const filePaths = Array.isArray(localFilePaths)
    ? localFilePaths
    : [localFilePaths];

  console.log("Cloudinary config:", cloudinary.config());

  try {
    const uploadPromises = filePaths.map(async (filePath) => {
      const normalizedPath = filePath.path.replace(/\\/g, "/");

      const response = await cloudinary.uploader.upload(normalizedPath, {
        resource_type: "auto",
      });

      fs.unlinkSync(normalizedPath);

      return response.secure_url;
    });

    const uploadedUrls = await Promise.all(uploadPromises);

    return uploadedUrls.length === 1 ? uploadedUrls[0] : uploadedUrls;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);

    filePaths.forEach((file) => {
      try {
        fs.unlinkSync(file.path);
      } catch (e) {
        console.error("Error deleting file:", e);
      }
    });

    return null;
  }
};
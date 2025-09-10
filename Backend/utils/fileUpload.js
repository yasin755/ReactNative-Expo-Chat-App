import { bucket } from "../firebase.js";
import { Readable } from "stream";
import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getImageUrl1 = async ({ buffer, originalname, mimetype }) => {
  console.log("Uploading file to Firebase Storage...");
  const fileName = `${Date.now()}-${originalname}`;
  const file = bucket.file(fileName);

  const stream = Readable.from(buffer);

  const streamUpload = stream.pipe(
    file.createWriteStream({
      metadata: {
        contentType: mimetype,
      },
    })
  );

  await new Promise((resolve, reject) => {
    streamUpload.on("finish", () => resolve());
    streamUpload.on("error", reject);
  });

  await file.makePublic();
  console.log("bucket name:", bucket.name);
  console.log("file name:", fileName);

  return `https://storage.googleapis.com/${bucket.name}/${fileName}`;
};

export const getImageUrl = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "chatapp", // optional: Cloudinary folder
        resource_type: "auto", // auto-detects file type (image/video)
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return reject(error);
        }
        resolve(result.secure_url);
      }
    );

    stream.end(fileBuffer); // send buffer to Cloudinary
  });
};

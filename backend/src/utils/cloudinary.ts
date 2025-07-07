import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer, { StorageEngine } from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const folder: string = "pancaadnyanasuwitra";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async () => ({
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 800, height: 800, crop: "limit" }],
  }),
}) as unknown as StorageEngine;

const upload = multer({ storage });

export { cloudinary, upload, folder };

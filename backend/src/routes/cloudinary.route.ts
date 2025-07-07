import express from "express";
import userMiddleware from "../middleware/user.middleware";
import { upload } from "../utils/cloudinary";
import CloudinaryController from "../controllers/cloudinary.controller";

const cloudinaryRoute = express.Router();

cloudinaryRoute.post(
  "/api/upload",
  userMiddleware,
  upload.single("image") as any,
  CloudinaryController.upload,
);

cloudinaryRoute.delete(
  "/api/upload/:public_id",
  userMiddleware,
  CloudinaryController.destroy,
);

export default cloudinaryRoute;

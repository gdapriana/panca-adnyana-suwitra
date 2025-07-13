import express from "express";
import publicRoute from "../routes/public.route";
import errorMiddleware from "../middleware/error.middleware";
import adminRoute from "../routes/admin.route";
import superAdminRoute from "../routes/superadmin.route";
import userRoute from "../routes/user.route";
import cors from "cors";
import cloudinaryRoute from "../routes/cloudinary.route";

const web = express();
web.use(
  express.json({
    limit: "50mb",
  }),
);
web.use(cors());
web.use(publicRoute);
web.use(userRoute);
web.use(adminRoute);
web.use(cloudinaryRoute);
web.use(superAdminRoute);
web.use(errorMiddleware);

export default web;

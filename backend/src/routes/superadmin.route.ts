import express from "express";
import superAdminMiddleware from "../middleware/superadmin.middleware";
import userMiddleware from "../middleware/user.middleware";
import SttController from "../controllers/stt.controller";
import BlogController from "../controllers/blog.controller";
import adminRoute from "./admin.route";
import EventController from "../controllers/event.controller";
import adminMiddleware from "../middleware/admin.middleware";

const superAdminRoute = express.Router();

// create stt
superAdminRoute.post(
  "/api/create-stt",
  userMiddleware,
  superAdminMiddleware,
  SttController.create,
);

// update stt
// delete stt
// create blog
adminRoute.post(
  "/api/mainsttblog",
  userMiddleware,
  superAdminMiddleware,
  BlogController.create,
);
// update blog
adminRoute.patch(
  "/api/mainsttblog/:slug",
  userMiddleware,
  superAdminMiddleware,
  BlogController.update,
);
// delete blog
adminRoute.delete(
  "/api/mainsttblog/:slug",
  userMiddleware,
  superAdminMiddleware,
  BlogController.delete,
);
// create event
adminRoute.post(
  "/api/mainsttevent",
  userMiddleware,
  superAdminMiddleware,
  EventController.create,
);
// update event
adminRoute.patch(
  "/api/mainsttevent/:slug",
  userMiddleware,
  superAdminMiddleware,
  EventController.create,
);
// delete event
adminRoute.delete(
  "/api/mainsttevent/:slug",
  userMiddleware,
  superAdminMiddleware,
  EventController.create,
);

export default superAdminRoute;

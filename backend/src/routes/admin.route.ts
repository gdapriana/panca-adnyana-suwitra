import express from "express";
import adminMiddleware from "../middleware/admin.middleware";
import BlogController from "../controllers/blog.controller";
import userMiddleware from "../middleware/user.middleware";
import EventController from "../controllers/event.controller";
import MembershipController from "../controllers/membership.controller";
import JoinRequestController from "../controllers/join-request.controller";
import SttController from "../controllers/stt.controller";

const adminRoute = express.Router();

// create blog
adminRoute.post(
  "/api/sttblog",
  userMiddleware,
  adminMiddleware,
  BlogController.create,
);
// update blog
adminRoute.patch(
  "/api/sttblog/:slug",
  userMiddleware,
  adminMiddleware,
  BlogController.update,
);
// delete blog
adminRoute.delete(
  "/api/sttblog/:slug",
  userMiddleware,
  adminMiddleware,
  BlogController.delete,
);
// create event
adminRoute.post(
  "/api/sttevent",
  userMiddleware,
  adminMiddleware,
  EventController.create,
);
// update event
adminRoute.patch(
  "/api/sttevent/:slug",
  userMiddleware,
  adminMiddleware,
  EventController.update,
);
// delete event
adminRoute.delete(
  "/api/sttevent/:slug",
  userMiddleware,
  adminMiddleware,
  EventController.delete,
);
// acc join req
adminRoute.patch(
  "/api/accjoin/:request_id",
  userMiddleware,
  adminMiddleware,
  JoinRequestController.acc,
);
// remove member
adminRoute.delete(
  "/api/membership/:username",
  userMiddleware,
  adminMiddleware,
  MembershipController.delete,
);

// get join req
adminRoute.get(
  "/api/accjoin",
  userMiddleware,
  adminMiddleware,
  JoinRequestController.gets,
);

// delete join req
adminRoute.delete(
  "/api/accjoin/:id",
  userMiddleware,
  adminMiddleware,
  JoinRequestController.delete,
);

//update STT
adminRoute.patch(
  "/api/stt/:slug",
  userMiddleware,
  adminMiddleware,
  SttController.update,
);

// delete membership
adminRoute.delete(
  "/api/membership/:username",
  userMiddleware,
  adminMiddleware,
  MembershipController.delete,
)

export default adminRoute;

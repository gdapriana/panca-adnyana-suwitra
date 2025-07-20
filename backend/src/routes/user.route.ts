import express from "express";
import userMiddleware from "../middleware/user.middleware";
import userController from "../controllers/user.controller";
import joinRequestController from "../controllers/join-request.controller";
import BlogController from "../controllers/blog.controller";
const userRoute = express.Router();

userRoute.post(
  "/api/join/:stt_slug",
  userMiddleware,
  joinRequestController.create,
);
userRoute.patch("/api/update", userMiddleware, userController.update);
userRoute.delete("/api/logout", userMiddleware, userController.logout);
userRoute.get("/api/me", userMiddleware, userController.me);

userRoute.post(
  "/api/blogs/:slug/comment",
  userMiddleware,
  BlogController.comment,
);

userRoute.delete(
  "/api/blogs/comment/:id",
  userMiddleware,
  BlogController.uncomment,
);

export default userRoute;

import express from "express";
import userMiddleware from "../middleware/user.middleware";
import userController from "../controllers/user.controller";

const userRoute = express.Router();

userRoute.delete("/api/logout", userMiddleware, userController.logout);
userRoute.get("/api/me", userMiddleware, userController.me);

export default userRoute;

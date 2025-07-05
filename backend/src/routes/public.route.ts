import express from "express";
import UserController from "../controllers/user.controller";
import BlogController from "../controllers/blog.controller";
import SttController from "../controllers/stt.controller";
import EventController from "../controllers/event.controller";
import BlogCategoryController from "../controllers/blogcategory.controller";

const publicRoute = express.Router();
publicRoute.post("/api/register", UserController.register);
publicRoute.post("/api/login", UserController.login);
publicRoute.get("/api/blogs", BlogController.gets);
publicRoute.get("/api/blogs/:slug", BlogController.get);
publicRoute.get("/api/stt", SttController.gets);
publicRoute.get("/api/stt/:slug", SttController.get);

publicRoute.get("/api/events", EventController.gets);
publicRoute.get("/api/events/:slug", EventController.get);

publicRoute.get("/api/blogcategories", BlogCategoryController.gets);

export default publicRoute;

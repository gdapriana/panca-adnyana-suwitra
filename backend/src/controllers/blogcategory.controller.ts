import { NextFunction, Request, Response } from "express";
import BlogCategorySerive from "../services/blogcategory.service";

class BlogCategoryController {
  static async gets(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await BlogCategorySerive.gets();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}

export default BlogCategoryController;

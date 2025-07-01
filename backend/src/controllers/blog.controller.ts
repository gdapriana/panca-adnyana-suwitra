import { Request, Response, NextFunction } from "express";
import BlogService from "../services/blog.service";
import { UserRequest } from "../types/user.types";

class BlogController {
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const response = await BlogService.get(slug);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
  static async gets(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await BlogService.gets();
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const stt_slug = req.user?.stt_membership!.stt_slug as string;
      if (!stt_slug) {
        res.status(401).json({ errors: "should membership" });
      }
      const response = await BlogService.create(body, stt_slug);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const { slug } = req.params;
      const stt_slug = req.user?.stt_membership!.stt_slug as string;
      if (!stt_slug) {
        res.status(401).json({ errors: "should membership" });
      }
      const response = await BlogService.update(body, slug, stt_slug);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const stt_slug = req.user?.stt_membership!.stt_slug as string;
      if (!stt_slug) {
        res.status(401).json({ errors: "should membership" });
      }
      const response = await BlogService.delete(slug, stt_slug);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}

export default BlogController;

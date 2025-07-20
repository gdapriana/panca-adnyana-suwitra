import { Request, Response, NextFunction } from "express";
import BlogService from "../services/blog.service";
import { UserRequest } from "../types/user.types";
import EventService from "../services/event.service";
import { QueryEvent } from "../types/event.types";

class EventController {
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const response = await EventService.get(slug);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
  static async gets(req: Request, res: Response, next: NextFunction) {
    try {
      const query: QueryEvent = req.query;
      const response = await EventService.gets(query);
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
      const response = await EventService.create(body, stt_slug);
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
      const response = await EventService.update(body, slug, stt_slug);
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
        res.status(401).json({ errors: "harus menjadi anggota" });
      }
      const response = await EventService.delete(slug, stt_slug);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}

export default EventController;

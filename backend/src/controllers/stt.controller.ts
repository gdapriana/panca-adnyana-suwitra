import { Request, Response, NextFunction } from "express";
import SttService from "../services/stt.service";
import { CreateSTT } from "../types/stt.types";

class SttController {
  static async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const response = await SttService.get(slug);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async gets(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await SttService.gets();
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const response = await SttService.create(body as CreateSTT);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const { slug } = req.params;
      const response = await SttService.update(body, slug);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}

export default SttController;

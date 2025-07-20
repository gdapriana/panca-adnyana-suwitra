import { Request, Response, NextFunction } from "express";
import { UserRequest } from "../types/user.types";
import ResponseError from "../error/response.error";
import GalleryService from "../services/gallery.service";

class GalleryController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const { slug } = req.params;
      const body = req.body;
      if (!req.user?.stt_membership)
        throw new ResponseError(403, "harus menjadi member");

      const response = await GalleryService.create(
        slug,
        req.user.stt_membership.stt_slug,
        body,
      );
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!req.user?.stt_membership)
        throw new ResponseError(403, "harus menjadi member");

      const response = await GalleryService.delete(
        id,
        req.user.stt_membership.stt_slug,
      );
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}

export default GalleryController;

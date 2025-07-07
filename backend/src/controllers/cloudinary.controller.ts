import { NextFunction, Request, Response } from "express";
import CloudinaryService from "../services/cloudinary.service";
import ResponseError from "../error/response.error";

class CloudinaryController {
  static async upload(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) throw new ResponseError(400, "no file uploaded");
      const file = req.file as Express.Multer.File & {
        path: string;
        filename: string;
      };
      res.status(200).json({
        data: {
          imageUrl: file.path,
          publicId: file.filename,
        },
      });
    } catch (e) {
      next(e);
    }
  }
  static async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const { public_id } = req.params;
      const response = await CloudinaryService.destroy(public_id);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }

  static async bulkUpload(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }
  static async bulkDelete(req: Request, res: Response, next: NextFunction) {
    try {
    } catch (e) {
      next(e);
    }
  }
}

export default CloudinaryController;

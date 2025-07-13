import { UserRequest } from "../types/user.types";
import { NextFunction, Response } from "express";
import JoinRequestService from "../services/join-request.service";
import ResponseError from "../error/response.error";

class JoinRequestController {
  static async gets(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const from_stt = req.user?.stt_membership!.stt_slug as string;
      if (!from_stt) throw new ResponseError(404, "not alowed");
      const response = await JoinRequestService.gets(from_stt);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const { stt_slug } = req.params;
      const username = req.user!.username as string;
      const response = await JoinRequestService.create(username, stt_slug);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async acc(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const { request_id } = req.params;
      const admin_stt = req.user?.stt_membership!.stt_slug as string;
      if (!admin_stt) throw new ResponseError(404, "not alowed");
      const response = await JoinRequestService.acc(request_id, admin_stt);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const response = await JoinRequestService.delete(id, req);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}

export default JoinRequestController;

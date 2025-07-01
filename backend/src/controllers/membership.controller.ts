import { Response, NextFunction } from "express";
import { UserRequest } from "../types/user.types";
import MembershipService from "../services/membership.service";
import ResponseError from "../error/response.error";

class MembershipController {
  static async create(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const { username } = req.params;
      const permission = req.user?.role;
      if (!permission) throw new ResponseError(401, "not alowed");
      if (permission !== "ADMIN") throw new ResponseError(401, "not alowed");
      const adminMembership = req.user?.stt_membership;
      if (!adminMembership) throw new ResponseError(401, "not alowed");
      const response = await MembershipService.create(
        username,
        req.user?.stt_membership!.stt_slug as string,
      );
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async delete(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const { username } = req.params;
      const permission = req.user?.role;
      if (permission !== "ADMIN") throw new ResponseError(401, "not alowed");
      const adminMembership = req.user?.stt_membership;
      if (!adminMembership) throw new ResponseError(401, "not alowed");
      const admin_stt = req.user?.stt_membership!.stt_slug as string;
      const response = await MembershipService.delete(username, admin_stt);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}

export default MembershipController;

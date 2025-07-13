import { Request, Response, NextFunction } from "express";
import UserService from "../services/user.service";
import { UserRequest } from "../types/user.types";

class UserController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, username, password, email } = req.body;
      const response = await UserService.register(
        username,
        password,
        name,
        email,
      );
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const response = await UserService.login(username, password);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async logout(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = await UserService.logout(req.user!.username as string);
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const username = req.user?.username;
      const body = req.body;
      const response = await UserService.update(username, body);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }

  static async me(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const response = req.user;
      res.status(200).json({
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}

export default UserController;

import { Response, NextFunction } from "express";
import { UserRequest } from "../types/user.types";

const superAdminMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  if (req.user && req.user.role === "SUPERADMIN") {
    next();
    return;
  }

  res
    .status(401)
    .json({
      errors: "unauthorized",
    })
    .end();
};

export default superAdminMiddleware;

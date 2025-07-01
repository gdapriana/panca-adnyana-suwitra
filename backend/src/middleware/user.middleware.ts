import { Response, NextFunction } from "express";
import prismaClient from "../application/database";
import { UserRequest } from "../types/user.types";

const userMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const token: string | undefined = req.get("X-API-TOKEN");

  if (token) {
    const user = await prismaClient.user.findFirst({
      where: {
        token: token,
      },
      include: {
        stt_membership: true,
      },
    });

    if (user) {
      req.user = user;
      next();
      return;
    }
  }

  console.log("HELLOOOOOO");

  res
    .status(401)
    .json({
      errors: "Unauthorized",
    })
    .end();
};

export default userMiddleware;

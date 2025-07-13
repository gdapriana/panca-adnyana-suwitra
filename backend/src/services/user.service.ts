import Validation from "../validation/validation";
import UserValidation from "../validation/user.validation";
import prismaClient from "../application/database";
import ResponseError from "../error/response.error";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UpdateUser } from "../types/user.types";

class UserService {
  static async login(username: string, password: string) {
    const validatedRequest = Validation.validate(UserValidation.LOGIN, {
      username,
      password,
    });

    const check = await prismaClient.user.findUnique({
      where: {
        username: validatedRequest.username,
      },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });
    if (!check) throw new ResponseError(402, "invalid username or password");
    const isPasswordValid = await bcrypt.compare(
      validatedRequest.password,
      check.password,
    );
    if (!isPasswordValid) {
      throw new ResponseError(401, "invalid username or password");
    }
    const token = jwt.sign(
      { id: check.id, username: check.username },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "10h",
      },
    );
    await prismaClient.user.update({
      where: {
        username: validatedRequest.username,
      },
      data: {
        token,
      },
    });
    return {
      user: { usename: check.username, id: check.id },
      token,
    };
  }
  static async register(
    username: string,
    password: string,
    name: string,
    email: string,
  ) {
    const validatedRequest = Validation.validate(UserValidation.REGISTER, {
      username,
      password,
      name,
      email,
    });

    const check = await prismaClient.user.findUnique({
      where: {
        username: validatedRequest.username,
      },
    });

    if (check) throw new ResponseError(402, "username already taken");

    const hashedPassword = await bcrypt.hash(validatedRequest.password, 10);

    const user = await prismaClient.user.create({
      data: {
        username: validatedRequest.username,
        password: hashedPassword,
        name: validatedRequest.name,
        email: validatedRequest.email,
      },
      select: {
        username: true,
      },
    });

    return user;
  }

  static async update(username: string | undefined, body: UpdateUser) {
    const validatedRequest = Validation.validate(UserValidation.UPDATE, body);
    const user = await prismaClient.user.findUnique({
      where: {
        username,
      },
      select: {
        username: true,
      },
    });

    if (!user) throw new ResponseError(404, "pengguna tidak ditemukan");

    const updatedUser = await prismaClient.user.update({
      where: {
        username,
      },
      data: validatedRequest,
      select: {
        username: true,
      },
    });

    return updatedUser;
  }

  static async logout(username: string) {
    const user = await prismaClient.user.update({
      where: {
        username,
      },
      data: {
        token: null,
      },
      select: {
        username: true,
      },
    });
    return user;
  }
}

export default UserService;

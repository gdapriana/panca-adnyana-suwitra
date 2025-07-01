import { z } from "zod";

class UserValidation {
  static readonly LOGIN = z.object({
    username: z.string(),
    password: z.string(),
  });

  static readonly REGISTER = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(8),
    name: z.string().min(3),
    email: z.string().email().min(1),
  });
}

export default UserValidation;

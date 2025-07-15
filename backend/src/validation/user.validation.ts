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

  static readonly UPDATE = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    address: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    whatsapp_url: z.string().nullable().optional(),
    instagram_url: z.string().nullable().optional(),
    facebook_url: z.string().nullable().optional(),
    profile_img_url: z.string().url().nullable().optional(),
    profile_img_public_id: z.string().nullable().optional(),
  });
}

export default UserValidation;

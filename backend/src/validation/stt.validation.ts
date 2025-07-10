import { z } from "zod";

class STTValidation {
  static readonly CREATE = z.object({
    name: z.string(),
    logo_url: z.string().url().optional().nullable(),
    logo_public_id: z.string().url().optional().nullable(),
    background_url: z.string().url().optional().nullable(),
    background_public_id: z.string().url().optional().nullable(),
    description: z.string().optional().nullable(),
    email: z.string().optional().nullable(),
    instagram_url: z.string().optional().nullable(),
    whatsapp_url: z.string().optional().nullable(),
    facebook_url: z.string().optional().nullable(),
  });
  static readonly UPDATE = z.object({
    name: z.string().optional(),
    logo_url: z.string().url().optional().nullable(),
    logo_public_id: z.string().optional().nullable(),
    background_url: z.string().url().optional().nullable(),
    background_public_id: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    email: z.string().optional().nullable(),
    instagram_url: z.string().optional().nullable(),
    whatsapp_url: z.string().optional().nullable(),
    facebook_url: z.string().optional().nullable(),
  });
}

export default STTValidation;

import { z } from "zod";

class CreateBlogValidation {
  static readonly CREATE = z.object({
    name: z.string(),
    cover_url: z.string().url().optional().nullable(),
    description: z.string().optional().nullable(),
    body: z.string().optional().nullable(),
    category_slug: z.string(),
  });

  static readonly UPDATE = z.object({
    name: z.string().optional(),
    cover_url: z.string().url().optional().nullable(),
    description: z.string().optional().nullable(),
    body: z.string().optional().nullable(),
    category_slug: z.string().optional(),
  });
}

export default CreateBlogValidation;

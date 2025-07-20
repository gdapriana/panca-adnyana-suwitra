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

  static readonly QUERY = z.object({
    name: z.string().optional(),
    order: z.enum(["latest", "name"]).optional(),
    take: z
      .string()
      .refine(
        (val) => {
          const num = Number(val);
          return !isNaN(num) && num > 0;
        },
        {
          message: "Harus berupa angka positif lebih dari 0",
        },
      )
      .optional(),
  });

  static readonly COMMENT = z.object({
    message: z.string().min(1).max(200),
  });
}

export default CreateBlogValidation;

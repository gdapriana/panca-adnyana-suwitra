import { z } from "zod";

class CreateEventValidation {
  static readonly CREATE = z.object({
    name: z.string(),
    start_date: z.coerce.date(),
    end_date: z.coerce.date(),
    description: z.string().optional().nullable(),
  });
  static readonly UPDATE = z.object({
    name: z.string().optional(),
    start_date: z.coerce.date().optional(),
    end_date: z.coerce.date().optional(),
    description: z.string().optional().nullable(),
  });

  static readonly QUERY = z.object({
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
}

export default CreateEventValidation;

import { z } from "zod";

class CreateEventValidation {
  static readonly CREATE = z.object({
    name: z.string(),
    start_date: z.coerce.date().optional().nullable(),
    end_date: z.coerce.date().optional().nullable(),
    description: z.string().optional().nullable(),
  });
  static readonly UPDATE = z.object({
    name: z.string().optional(),
    start_date: z.coerce.date().optional().nullable(),
    end_date: z.coerce.date().optional().nullable(),
    description: z.string().optional().nullable(),
  });
}

export default CreateEventValidation;

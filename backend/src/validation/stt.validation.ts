import { z } from "zod";

class CreateSTTValidation {
  static readonly CREATE = z.object({
    name: z.string(),
    logo_url: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    email: z.string().optional().nullable(),
  });
}

export default CreateSTTValidation;

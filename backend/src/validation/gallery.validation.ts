import { z } from "zod";

class GalleryValidation {
  static readonly CREATE = z.object({
    url: z.string().url().optional().nullable(),
    public_id: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
  });
}

export default GalleryValidation;

import prismaClient from "../application/database";
import ResponseError from "../error/response.error";
import { CreateGallery } from "../types/gallery.types";
import GalleryValidation from "../validation/gallery.validation";
import Validation from "../validation/validation";
import CloudinaryService from "./cloudinary.service";

class GalleryService {
  static async create(slug: string, user_stt: string, body: CreateGallery) {
    const validatedBody: CreateGallery = Validation.validate(
      GalleryValidation.CREATE,
      body,
    );
    const checkSlug = await prismaClient.stt.findUnique({
      where: {
        slug,
      },
      select: {
        slug: true,
      },
    });
    if (!checkSlug) throw new ResponseError(404, "stt tidak ditemukan");
    if (checkSlug.slug !== user_stt)
      throw new ResponseError(403, "tidak diizinkan");

    const gallery = await prismaClient.gallery.create({
      data: {
        public_id: validatedBody.public_id,
        stt_slug: slug,
        url: validatedBody.url,
      },
      select: {
        id: true,
      },
    });

    return gallery;
  }
  static async delete(id: string, stt_slug: string) {
    const checkId = await prismaClient.gallery.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        public_id: true,
        stt_slug: true,
      },
    });

    if (!checkId) throw new ResponseError(404, "galeri tidak ditemukan");
    if (checkId.stt_slug !== stt_slug)
      throw new ResponseError(403, "tidak diizinkan");
    if (checkId.public_id) {
      await CloudinaryService.destroy(checkId.public_id);
    }
    const deletedGallery = await prismaClient.gallery.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });
    return deletedGallery;
  }
}

export default GalleryService;

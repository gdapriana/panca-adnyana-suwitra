import prismaClient from "../application/database";
import ResponseError from "../error/response.error";
import { CreateSTT, UpdateSTT } from "../types/stt.types";
import Validation from "../validation/validation";
import slugify from "slugify";
import STTValidation from "../validation/stt.validation";
import { SelectSTTAdmin } from "../utils/service.util";

class SttService {
  static async get(slug: string) {
    const stt = await prismaClient.stt.findUnique({
      where: {
        slug: slug,
      },
      include: {
        leader: SelectSTTAdmin,
        secretary: SelectSTTAdmin,
        treasurer: SelectSTTAdmin,
        vice: SelectSTTAdmin,
        stt_membership: {
          select: {
            username: true,
            role: true,
            join_date: true,
            user: {
              select: {
                name: true,
                email: true,
                instagram_url: true,
                facebook_url: true,
                whatsapp_url: true,
                profile_img_url: true,
              },
            },
          },
        },
        _count: true,
        events: {
          select: {
            name: true,
            slug: true,
            start_date: true,
            end_date: true,
            description: true,
          },
        },
        blogs: {
          select: {
            name: true,
            slug: true,
            cover_url: true,
            description: true,
            category: {
              select: {
                name: true,
                slug: true,
              },
            },
            stt: {
              select: {
                logo_url: true,
                name: true,
                slug: true,
              },
            },
            blog_comments: {
              select: {
                body: true,
                user: {
                  select: {
                    name: true,
                    username: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!stt) throw new ResponseError(404, "item not found");

    return stt;
  }
  static async gets() {
    const stt = await prismaClient.stt.findMany({
      include: {
        leader: SelectSTTAdmin,
        secretary: SelectSTTAdmin,
        treasurer: SelectSTTAdmin,
        vice: SelectSTTAdmin,
        stt_membership: {
          select: {
            role: true,
            username: true,
            user: {
              select: {
                name: true,
                email: true,
                instagram_url: true,
                facebook_url: true,
                whatsapp_url: true,
                profile_img_url: true,
              },
            },
          },
        },
        _count: true,
      },
    });

    return stt;
  }
  static async create(body: CreateSTT) {
    const validatedRequest: CreateSTT = Validation.validate(
      STTValidation.CREATE,
      body,
    );
    const slug = slugify(validatedRequest.name, { lower: true });
    const check = await prismaClient.stt.findUnique({
      where: {
        slug,
      },
    });
    if (check) throw new ResponseError(409, "item already exists");
    const stt = await prismaClient.stt.create({
      data: {
        ...validatedRequest,
        slug,
      },
      select: {
        name: true,
      },
    });
    return stt;
  }

  static async update(body: UpdateSTT, slug: string) {
    const checkSTT = await prismaClient.stt.findUnique({
      where: {
        slug,
      },
      select: {
        slug: true,
      },
    });
    if (!checkSTT) throw new ResponseError(404, "stt tidak ditemukan");
    const validatedRequest: UpdateSTT = Validation.validate(
      STTValidation.UPDATE,
      body,
    );

    let newSlug: string | undefined = undefined;
    if (validatedRequest.name) {
      const tempSlug = slugify(validatedRequest.name, { lower: true });
      const checkAvilable = await prismaClient.stt.findUnique({
        where: {
          slug: tempSlug,
        },
        select: { slug: true },
      });
      if (tempSlug) throw new ResponseError(401, "stt sudah ada");
      newSlug = tempSlug;
    }

    const stt = await prismaClient.stt.update({
      where: {
        slug,
      },
      data: {
        ...validatedRequest,
        slug: newSlug,
      },
      select: {
        name: true,
      },
    });
    return stt;
  }
}

export default SttService;

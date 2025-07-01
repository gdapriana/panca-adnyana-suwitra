import prismaClient from "../application/database";
import ResponseError from "../error/response.error";
import { CreateSTT } from "../types/stt.types";
import Validation from "../validation/validation";
import slugify from "slugify";
import CreateSTTValidation from "../validation/stt.validation";
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
      CreateSTTValidation.CREATE,
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
}

export default SttService;

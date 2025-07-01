import { CreateBlog, UpdateBlog } from "../types/blog.types";
import Validation from "../validation/validation";
import BlogValidation from "../validation/blog.validation";
import prismaClient from "../application/database";
import slugify from "slugify";
import ResponseError from "../error/response.error";

class BlogService {
  static async get(slug: string) {
    const blog = await prismaClient.blog.findUnique({
      where: {
        slug: slug,
      },
      include: {
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
    });

    if (!blog) throw new ResponseError(404, "item not found");
    return blog;
  }
  static async gets() {
    const blog = await prismaClient.blog.findMany({
      include: {
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
        _count: true,
      },
    });
    return blog;
  }
  static async create(body: CreateBlog, stt_slug: string) {
    const validateBody = Validation.validate(BlogValidation.CREATE, body);
    const slug = slugify(validateBody.name, { lower: true });
    const newSlug = `${slug}-${Math.random().toString(36).substring(2, 15)}`;
    const check = await prismaClient.blog.findUnique({
      where: {
        slug: newSlug,
      },
    });
    const checkCategory = await prismaClient.blog_category.findUnique({
      where: {
        slug: validateBody.category_slug,
      },
    });
    if (!checkCategory) throw new ResponseError(404, "category not found");
    if (check) throw new ResponseError(409, "item already exists");
    const blog = await prismaClient.blog.create({
      data: {
        ...validateBody,
        slug: newSlug,
        category_slug: validateBody.category_slug,
        stt_slug,
      },
      select: {
        name: true,
      },
    });
    return blog;
  }
  static async update(body: UpdateBlog, slug: string, stt_slug: string) {
    const validateBody = Validation.validate(BlogValidation.UPDATE, body);

    const checkBlog = await prismaClient.blog.findUnique({
      where: {
        slug,
      },
      select: {
        slug: true,
        stt_slug: true,
      },
    });

    if (!checkBlog) throw new ResponseError(404, "item not found");
    if (stt_slug !== checkBlog.stt_slug)
      throw new ResponseError(401, "not alowed");

    let newSlug = undefined;
    if (validateBody.name) {
      const tempSlug = slugify(validateBody.name, { lower: true });
      const tempFullSlug = `${tempSlug}-${Math.random().toString(36).substring(2, 15)}`;
      const checkTempSlug = await prismaClient.blog.findUnique({
        where: {
          slug: tempFullSlug,
        },
        select: {
          slug: true,
        },
      });
      if (checkTempSlug) throw new ResponseError(409, "item already exists");
      newSlug = tempFullSlug;
    }
    if (validateBody.category_slug) {
      const checkCategory = await prismaClient.blog_category.findUnique({
        where: {
          slug: validateBody.category_slug,
        },
      });
      if (!checkCategory) throw new ResponseError(404, "category not found");
    }
    const updatedBlog = await prismaClient.blog.update({
      where: {
        slug,
      },
      data: {
        ...validateBody,
        slug: newSlug,
      },
      select: {
        name: true,
      },
    });
    return updatedBlog;
  }
  static async delete(slug: string, stt_slug: string) {
    const checkBlog = await prismaClient.blog.findUnique({
      where: {
        slug,
      },
      select: {
        slug: true,
        stt_slug: true,
      },
    });
    if (!checkBlog) throw new ResponseError(404, "item not found");
    if (stt_slug !== checkBlog.stt_slug)
      throw new ResponseError(401, "not alowed");
    const blog = await prismaClient.blog.delete({
      where: {
        slug,
      },
      select: {
        name: true,
      },
    });
    return blog;
  }
}

export default BlogService;

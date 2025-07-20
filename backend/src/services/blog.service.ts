import {
  BlogQuery,
  CommentBlog,
  CreateBlog,
  UpdateBlog,
} from "../types/blog.types";
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
            id: true,
            created_at: true,
            body: true,
            username: true,
            user: {
              select: {
                name: true,
                profile_img_url: true,
                username: true,
                stt_membership: {
                  select: {
                    stt: {
                      select: {
                        name: true,
                      },
                    },
                    role: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!blog) throw new ResponseError(404, "item not found");
    return blog;
  }
  static async gets(query: BlogQuery) {
    const validateQuery: BlogQuery = Validation.validate(
      BlogValidation.QUERY,
      query,
    );
    const blog = await prismaClient.blog.findMany({
      where: {
        name: validateQuery.name || undefined,
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

        _count: true,
      },
      orderBy: {
        created_at: validateQuery.order === "latest" ? "asc" : undefined,
        name: validateQuery.order === "name" ? "asc" : undefined,
      },
      take: Number(validateQuery.take) || undefined,
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

  static async comment(slug: string, body: CommentBlog, username: string) {
    const validatedBody = Validation.validate(BlogValidation.COMMENT, body);
    const checkBlog = await prismaClient.blog.findUnique({
      where: { slug },
      select: { slug: true },
    });
    if (!checkBlog) throw new ResponseError(404, "blog tidak ditemukan");
    const comment = await prismaClient.blog_comment.create({
      data: {
        body: validatedBody.message,
        blog_slug: slug,
        username,
      },
      select: {
        id: true,
      },
    });

    return comment;
  }

  static async uncomment(id: string, username: string) {
    const checkId = await prismaClient.blog_comment.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
      },
    });
    if (!checkId) throw new ResponseError(404, "komen tidak ditemukan");
    if (checkId.username !== username)
      throw new ResponseError(403, "tidak diizinkan");

    const deletedComment = await prismaClient.blog_comment.delete({
      where: {
        id,
      },
      select: {
        id: true,
      },
    });

    return deletedComment;
  }
}

export default BlogService;

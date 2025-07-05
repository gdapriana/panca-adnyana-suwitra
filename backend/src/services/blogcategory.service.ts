import { PrismaClient } from "@prisma/client";
import prismaClient from "../application/database";

class BlogCategorySerive {
  static async gets() {
    const categories = await prismaClient.blog_category.findMany({
      select: {
        name: true,
        slug: true,
      },
    });
    return categories;
  }
}

export default BlogCategorySerive;

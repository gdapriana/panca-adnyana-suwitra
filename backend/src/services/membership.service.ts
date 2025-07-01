import prismaClient from "../application/database";
import ResponseError from "../error/response.error";

class MembershipService {
  static async create(username: string, stt_slug: string) {
    const checkUsername = await prismaClient.user.findUnique({
      where: {
        username,
      },
      select: {
        username: true,
      },
    });
    if (!checkUsername) throw new ResponseError(404, "username not found");
    const checkStt = await prismaClient.stt.findUnique({
      where: {
        slug: stt_slug,
      },
      select: {
        slug: true,
      },
    });
    if (!checkStt) throw new ResponseError(404, "stt not found");
    const membership = await prismaClient.stt_membership.create({
      data: {
        username,
        stt_slug,
      },
      select: {
        username: true,
        stt_slug: true,
      },
    });
    return membership;
  }

  static async delete(username: string, admin_stt: string) {
    const checkUsername = await prismaClient.user.findUnique({
      where: {
        username,
      },
      select: {
        username: true,
        stt_membership: {
          select: {
            stt_slug: true,
          },
        },
      },
    });
    if (!checkUsername) throw new ResponseError(404, "username not found");
    if (!checkUsername.stt_membership)
      throw new ResponseError(404, "username not found");
    if (admin_stt !== checkUsername.stt_membership.stt_slug)
      throw new ResponseError(401, "not alowed");
    const membership = await prismaClient.stt_membership.delete({
      where: {
        username,
      },
      select: {
        username: true,
      },
    });
    return membership;
  }
}

export default MembershipService;

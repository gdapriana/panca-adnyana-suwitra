import prismaClient from "../application/database";
import ResponseError from "../error/response.error";

class JoinRequestService {
    static async gets(from_stt: string) {
        const checkStt = await prismaClient.stt.findUnique({
            where: {
                slug: from_stt
            },
            select: {
                slug: true,
            }
        })

        if (!checkStt) throw new ResponseError(404, "stt not found")
        const joinRequests = await prismaClient.join_request.findMany({
            where: {
                stt_slug: from_stt
            },
            select: {
                id: true,
                username: true,
                stt_slug: true,
                is_acc: true,
                acc_date: true,
                created_at: true,
                stt: {
                    select: {
                        name: true,
                    }
                },
                user: {
                    select: {
                        name: true
                    }
                }
            }
        })
        return joinRequests;
    }
    static async create(username: string, stt_slug: string) {
        const userCheck = await prismaClient.user.findUnique({
            where: {
                username
            },
            select: {
                username: true,
                stt_membership: true
            }
        })

        if (!userCheck) throw new ResponseError(404, "user not found")

        const sttCheck = await prismaClient.stt.findUnique({
            where: {
                slug: stt_slug
            },
            select: {
                slug: true,
                is_main: true
            }
        })
        if (!sttCheck) throw new ResponseError(404, "stt not found")

        const joinCheck = await prismaClient.join_request.findFirst({
            where: {
                AND: [
                    {username: username},
                    {stt_slug: stt_slug},
                ]
            }
        })

        if (joinCheck) throw new ResponseError(401, "already join request")

        if (sttCheck.is_main) throw new ResponseError(401, "not alowed")
        if (userCheck.stt_membership) throw new ResponseError(401, "already member")
        const joinRequest = await prismaClient.join_request.create({
            data: {
                username,
                stt_slug
            },
            select: {
                username: true,
                stt_slug: true
            }
        })
        return joinRequest;
    }
    static async acc(req_id: string, admin_stt: string) {
        const joinRequest = await prismaClient.join_request.findUnique({
            where: {
                id: req_id
            },
            select: {
                id: true,
                username: true,
                stt_slug: true,
                is_acc: true,
                user: {
                    select: {
                        stt_membership: {
                            select: {
                                stt_slug: true
                            }
                        }
                    }
                }
            }
        })
        if (!joinRequest) throw new ResponseError(404, "not found")
        if (joinRequest.stt_slug !== admin_stt) throw new ResponseError(401, "not alowed")
        if (joinRequest.user.stt_membership) throw new ResponseError(401, 'already member')
        if (joinRequest.is_acc) throw new ResponseError(401, "already acc")
        const acc = await prismaClient.join_request.update({
            where: {
                id: req_id
            },
            data: {
                is_acc: true,
                acc_date: new Date()
            },
            select: {
                id: true,
            }
        })

        await prismaClient.stt_membership.create({
            data: {
                username: joinRequest.username,
                stt_slug: joinRequest.stt_slug
            }
        })

        return acc
    }
}

export default JoinRequestService;
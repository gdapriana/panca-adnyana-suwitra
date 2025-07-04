import prismaClient from "../application/database";
import ResponseError from "../error/response.error";
import {User} from "@prisma/client";
import {UserRequest} from "../types/user.types";

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
                },
            },
            orderBy: {
                created_at: 'desc'
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

        if (!userCheck) throw new ResponseError(404, "user tidak ditemukan")

        const sttCheck = await prismaClient.stt.findUnique({
            where: {
                slug: stt_slug
            },
            select: {
                slug: true,
                is_main: true
            }
        })
        if (!sttCheck) throw new ResponseError(404, "stt tidak ditemukan")

        const joinCheck = await prismaClient.join_request.findFirst({
            where: {
                AND: [
                    {username: username},
                    {stt_slug: stt_slug},
                ]
            }
        })

        if (joinCheck) throw new ResponseError(401, "sudah melakukan permintaan")

        if (sttCheck.is_main) throw new ResponseError(401, "tidak dapat izin")
        if (userCheck.stt_membership) throw new ResponseError(401, "sudah menjadi anggota")
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
        if (!joinRequest) throw new ResponseError(404, "request tidak ditemukan")
        if (joinRequest.stt_slug !== admin_stt) throw new ResponseError(401, "tidak diizinkan")
        if (joinRequest.user.stt_membership) throw new ResponseError(401, 'sudah menjadi anggota')
        if (joinRequest.is_acc) throw new ResponseError(401, "sudah disetujui")
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
    static async delete(id: string, req: UserRequest) {
        const joinRequest = await prismaClient.join_request.findUnique({
            where: {
                id: id
            },
            select: {
                id: true,
                stt_slug: true
            }
        })
        if (req.user!.role !== 'ADMIN') throw new ResponseError(401, "tidak diizinkan")
        if (!joinRequest) throw new ResponseError(404, "request tidak ditemukan")
        if (req.user?.stt_membership!.stt_slug !== joinRequest.stt_slug) throw new ResponseError(401, "tidak diizinkan")
        const deleteJoinRequest = await prismaClient.join_request.delete({
            where: {
                id: id
            },
            select: {
                id: true,
            }
        })
        return deleteJoinRequest
    }
}

export default JoinRequestService;
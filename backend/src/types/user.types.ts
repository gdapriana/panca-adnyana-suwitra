import { User, Stt_membership } from "@prisma/client";
import { Request } from "express";

interface UserWithMembership extends User {
  stt_membership?: Stt_membership | null;
}

export interface UserRequest extends Request {
  user?: UserWithMembership;
}

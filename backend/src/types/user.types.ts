import { User, Stt_membership, Stt } from "@prisma/client";
import { Request } from "express";

export interface UpdateUser {
  email?: string;
  name?: string;
  description?: string;
  address?:string;
  whatsapp_url?: string;
  instagram_url?: string;
  facebook_url?: string;
  profile_img_url?: string;
  profile_img_public_id?: string;
}

interface MembershipWithStt extends Stt_membership {
  stt?: Stt | null;
}

interface UserWithMembership extends User {
  stt_membership?: MembershipWithStt | null;
}

export interface UserRequest extends Request {
  user?: UserWithMembership;
}

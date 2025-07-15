import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

export interface Navigation {
	name: string;
	href: string;
	children?: Navigation[];
	icon?: LucideIcon | IconType;
}

export type Role = "USER" | "ADMIN" | "SUPERADMIN";
export type MemberRole = "MEMBER" | "LEADER" | "VICE" | "TREASURES" | "SECRETARY";

export interface User {
	id: string;
	created_at: Date;
	updated_at: Date;

	username: string;
	email: string;
	password: string;
	description?: string;
	address?: string;
	token?: string;
	name?: string;
	whatsapp_url?: string;
	instagram_url?: string;
	facebook_url?: string;
	profile_img_url?: string;
	profile_img_public_id?: string;

	role: Role;

	stt_membership?: SttMembership;
	leadStt: Stt[];
	viceStt: Stt[];
	treasurerStt: Stt[];
	secretaryStt: Stt[];
	blog_comments: BlogComment[];
	Join_request: JoinRequest[];

	_count?: {
		leadStt: number;
		viceStt: number;
		treasurerStt: number;
		secretaryStt: number;
		blog_comments: number;
		Join_request: number;
	};
}

export interface Stt {
	id: string;
	created_at: Date;
	updated_at: Date;

	name: string;
	slug: string;
	leader_username?: string;
	vice_username?: string;
	treasurer_username?: string;
	secretary_username?: string;
	logo_url?: string;
	logo_public_id?: string;
	background_url?: string;
	background_public_id?: string;
	description?: string;
	email?: string;
	instagram_url?: string;
	whatsapp_url?: string;
	facebook_url?: string;
	is_main: boolean;

	stt_membership: SttMembership[];
	events: Event[];
	blogs: Blog[];
	gallery: Gallery[];
	leader?: User;
	vice?: User;
	treasurer?: User;
	secretary?: User;
	Join_request: JoinRequest[];

	_count?: {
		stt_membership: number;
		events: number;
		blogs: number;
		gallery: number;
		Join_request: number;
	};
}

export interface Blog {
	id: string;
	created_at: Date;
	updated_at: Date;

	name: string;
	slug: string;
	category_slug?: string;
	cover_url?: string;
	cover_public_id?: string;
	description?: string;
	body?: string;
	stt_slug?: string;

	category?: BlogCategory;
	stt?: Stt;
	blog_comments: BlogComment[];

	_count?: {
		blog_comments: number;
	};
}

export interface BlogComment {
	id: string;
	created_at: Date;
	updated_at: Date;

	blog_slug: string;
	username: string;
	body?: string;

	blog: Blog;
	user: User;
}

export interface BlogCategory {
	id: string;
	created_at: Date;
	updated_at: Date;

	name: string;
	slug: string;

	blogs: Blog[];

	_count?: {
		blogs: number;
	};
}

export interface SttMembership {
	id: string;
	created_at: Date;
	updated_at: Date;

	stt_slug: string;
	username: string;
	join_date: Date;
	end_date?: Date;

	stt?: Stt;
	user: User;
	is_active: boolean;
	role: MemberRole;
}

export interface Event {
	id: string;
	created_at: Date;
	updated_at: Date;

	slug: string;
	name: string;
	start_date?: Date;
	end_date?: Date;
	description?: string;

	stt_slug: string;
	stt: Stt;
}

export interface JoinRequest {
	id: string;
	created_at: Date;
	updated_at: Date;

	username: string;
	stt_slug: string;
	request_date: Date;
	acc_date?: Date;
	is_acc: boolean;

	user: User;
	stt: Stt;
}

export interface Gallery {
	id: string;
	created_at: Date;
	updated_at: Date;

	url?: string;
	public_id?: string;
	description?: string;

	stt_slug?: string;
	Stt?: Stt;
}

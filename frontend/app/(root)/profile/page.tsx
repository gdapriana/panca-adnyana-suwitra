"use client";

import CustomLoading from "@/app/_components/loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuthContext } from "@/context/auth-context";
import { ImageOff, MapPin } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { BsEnvelope, BsFacebook, BsGear, BsInstagram, BsMailbox, BsWhatsapp } from "react-icons/bs";
import slugify from "slugify";

export default function ProfilePage() {
	const { authenticated, loading, user } = useAuthContext();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	if (loading || isLoading) return <CustomLoading />;
	if (!authenticated) return redirect("/login");

	return (
		<main className="flex justify-center py-4 px-4 items-center">
			<div className="w-full max-w-6xl flex justify-center flex-col items-stretch">
				<div className="flex py-[5rem] mt-10 justify-center items-center flex-col gap-4 md:flex-row md:items-start">
					<Avatar className="w-[150px] h-[150px]">
						<AvatarImage className="object-cover" src={user?.profile_img_url} />
						<AvatarFallback>
							<ImageOff />
						</AvatarFallback>
					</Avatar>
					<div className="flex md:w-auto w-full gap-1 justify-center items-center flex-col md:justify-start md:items-start">
						<div className="flex flex-wrap justify-center items-center gap-1">
							<Badge>@{user?.username}</Badge>
							{user?.stt_membership && (
								<Badge asChild>
									<Link href={`/stt/${user.stt_membership.stt_slug}`}>
										{user.stt_membership.role} di STT {user.stt_membership.stt?.name}
									</Link>
								</Badge>
							)}
						</div>
						<h1 className="font-bold text-2xl text-center md:text-start">{user?.name}</h1>
						{user?.address && (
							<Tooltip>
								<TooltipTrigger>
									<p className="flex text-muted-foreground justify-center items-center gap-1">
										<MapPin width={20} /> {user.address}
									</p>
								</TooltipTrigger>
								<TooltipContent>Alamat</TooltipContent>
							</Tooltip>
						)}
						{user?.description && (
							<Tooltip>
								<TooltipTrigger>
									<p className="mt-2 md:ms-1 max-w-2xl text-center md:text-start">{user.description}</p>
								</TooltipTrigger>
								<TooltipContent>Alamat</TooltipContent>
							</Tooltip>
						)}
						<div className="flex flex-wrap gap-2 mt-4 w-full justify-center items-center">
							{user?.instagram_url && (
								<Button asChild variant="secondary" className="flex-1">
									<Link href={`https://instagram.com/${user.instagram_url}`}>
										<BsInstagram />@{user.instagram_url}
									</Link>
								</Button>
							)}
							{user?.facebook_url && (
								<Button asChild variant="secondary" className="flex-1">
									<Link href={`https://facebook.com/${slugify(user.facebook_url, { lower: true, replacement: "." })}`}>
										<BsFacebook />
										{user.facebook_url}
									</Link>
								</Button>
							)}
							{user?.whatsapp_url && (
								<Button asChild variant="secondary" className="flex-1">
									<Link href={`https://wa.me/${user.whatsapp_url}`}>
										<BsWhatsapp />+{user.whatsapp_url}
									</Link>
								</Button>
							)}
							{user?.email && (
								<Button asChild variant="secondary" className="flex-1">
									<Link href={`mailto:${user.email}`}>
										<BsEnvelope />
										{user.email}
									</Link>
								</Button>
							)}
							<Button asChild variant="outline" className="flex-1">
								<Link href="/profile/edit">
									<BsGear />
									Edit profil
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

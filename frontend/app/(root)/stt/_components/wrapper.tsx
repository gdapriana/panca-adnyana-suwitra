"use client";
import { Stt } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight, ImageOff, Users } from "lucide-react";
import ReqDialog from "@/app/(root)/stt/_components/req-dialog";
import { useAuthContext } from "@/context/auth-context";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Wrapper({ stt }: { stt: Stt[] }) {
	const { user } = useAuthContext();
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-8 gap-x-4">
			{stt.map((item: Stt, index: number) => {
				return (
					<article
						key={index}
						className={cn("flex flex-col relative justify-start items-stretch p-4 border rounded-xl", item.is_main && "hidden")}
					>
						{user?.stt_membership?.stt_slug === item.slug && (
							<Badge className="absolute top-[-3%] left-1/2 right-1/2 translate-x-[-50%]">STT Anda</Badge>
						)}
						<div className="flex gap-4 justify-center items-center">
							<Avatar className="w-16 h-16">
								<AvatarImage src={item.logo_url} className="object-cover" />
								<AvatarFallback className="text-muted-foreground">
									<ImageOff width={16} />
								</AvatarFallback>
							</Avatar>
							<div className="flex-1 flex flex-col justify-center items-start">
								<h3 className="text-xl font-bold">{item.name}</h3>
								<span className="text-muted-foreground">{item.email ? item.email : "tidak ada email"}</span>
							</div>
						</div>
						<hr className="my-4" />
						<p>{item.description}</p>
						<hr className="my-4" />
						<div className="flex mb-8 gap-2 justify-center flex-wrap items-stretch">
							<Button size="sm" variant="secondary">
								<Users />
								{item._count?.stt_membership} anggota
							</Button>
							<Button size="sm" variant="secondary">
								<Users />
								{item._count?.blogs} blog
							</Button>
							<Button size="sm" variant="secondary">
								<Users />
								{item._count?.blogs} event
							</Button>
						</div>
						<div className="flex gap-2 mt-auto flex-col md:flex-row">
							{!user?.stt_membership && <ReqDialog stt={item} />}
							<Button className="flex-1" asChild>
								<Link href={`/stt/${item.slug}`}>
									Detail <ChevronRight />
								</Link>
							</Button>
						</div>
					</article>
				);
			})}
		</div>
	);
}

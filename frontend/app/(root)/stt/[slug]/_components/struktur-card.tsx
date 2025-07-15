import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { BsEnvelope, BsFacebook, BsInstagram, BsMailbox, BsWhatsapp } from "react-icons/bs";

export function StrukturCard({ as, user }: { as: string; user: User | undefined }) {
	return (
		<Card className="w-full max-w-sm gap-0">
			<CardHeader>
				<CardTitle className="flex justify-center items-center gap-1">{as}</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<div className="flex mt-4 flex-col justify-center items-center gap-2">
					<Avatar className="w-16 h-16">
						<AvatarImage src={user?.profile_img_url} className="object-cover" />
						<AvatarFallback>{user?.username.charAt(0)}</AvatarFallback>
					</Avatar>
					<p className="font-bold mt-4 text-center">
						{user?.name || <span className="text-muted-foreground font-normal">Belum diisi</span>}
					</p>
					<Badge variant="secondary">{user?.username}</Badge>
				</div>
				<div className="flex gap-1 justify-center items-center flex-wrap">
					{user?.whatsapp_url && (
						<Button size="icon" asChild>
							<Link href={user.whatsapp_url}>
								<BsWhatsapp />
							</Link>
						</Button>
					)}
					{user?.instagram_url && (
						<Button size="icon" asChild>
							<Link href={user.instagram_url}>
								<BsInstagram />
							</Link>
						</Button>
					)}
					{user?.facebook_url && (
						<Button size="icon" asChild>
							<Link href={user.facebook_url}>
								<BsFacebook />
							</Link>
						</Button>
					)}
					{user?.email && (
						<Button size="icon" asChild>
							<Link href={`mailto:${user.email}`}>
								<BsEnvelope />
							</Link>
						</Button>
					)}
				</div>
			</CardContent>
			<CardFooter></CardFooter>
		</Card>
	);
}

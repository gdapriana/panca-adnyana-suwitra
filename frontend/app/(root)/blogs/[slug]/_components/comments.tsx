"use client";

import AddCommentDialog from "@/app/(root)/blogs/[slug]/_components/add-comment-dialog";
import AlertDeleteComment from "@/app/(root)/blogs/[slug]/_components/delete-comment-allert";
import CustomLoading from "@/app/_components/loading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/auth-context";
import { BlogComment } from "@/lib/types";
import { ImageOff, MessageCircleOff } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { BsExclamationOctagon, BsTrash } from "react-icons/bs";

export default function Comments({ comments, slug }: { comments: BlogComment[]; slug: string }) {
	const { authenticated, loading, user } = useAuthContext();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	if (loading || isLoading) return <CustomLoading />;

	return (
		<div className="w-full flex flex-col gap-4 justify-start items-stretch">
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-bold">Komentar</h2>
				<AddCommentDialog
					username={user?.username}
					token={user?.token}
					authenticated={authenticated}
					slug={slug}
					setIsLoading={setIsLoading}
				/>
			</div>
			<div className="flex justify-start gap-4 items-stretch flex-col">
				{comments.length === 0 && (
					<div className="w-full aspect-[16/6] md:aspect-[16/2] gap-2 flex text-muted-foreground justify-center items-center">
						<MessageCircleOff /> Belum terdapat komentar
					</div>
				)}
				{comments.length > 0 &&
					comments.map((comment: BlogComment, index: number) => {
						return (
							<article
								className="grid hover:bg-secondary/50 rounded-2xl p-3 gap-3 grid-cols-[auto_1fr] grid-rows-[auto_auto_auto]"
								key={index}
							>
								<div className="flex justify-center items-start">
									<Avatar className="w-12 h-12 ">
										<AvatarImage src={comment.user.profile_img_url} />
										<AvatarFallback className="text-muted-foreground">
											<ImageOff width={12} />
										</AvatarFallback>
									</Avatar>
								</div>
								<div className="flex justify-center items-start flex-col">
									<p className="font-bold">{comment.user.name}</p>
									<span className="text-muted-foreground text-sm">
										@{comment.user.username}{" "}
										{comment.user.stt_membership ? `dari ${comment.user.stt_membership.stt?.name}` : "blum bergabung stt"} ,
										{moment(comment.created_at).fromNow()}
									</span>
								</div>
								<div className="flex justify-end items-start">
									<div className="w-1/2 h-1/2 border-l border-b rounded-bl-md"></div>
								</div>
								<div className="">{comment.body}</div>
								<div className=""></div>
								<div className="flex justify-start gap-2 items-center">
									<Button size="icon" variant="secondary">
										<BsExclamationOctagon />
									</Button>
									{authenticated && comment.username === user?.username && (
										<AlertDeleteComment id={comment.id} setLoading={setIsLoading} token={user.token} />
									)}
								</div>
							</article>
						);
					})}
			</div>
		</div>
	);
}

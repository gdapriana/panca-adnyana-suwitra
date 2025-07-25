import Comments from "@/app/(root)/blogs/[slug]/_components/comments";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Blog } from "@/lib/types";
import { Building2, ImageOff, Layers } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

export default async function BlogPage({ params }: { params: { slug: string } }) {
	const { slug } = await params;

	const blog: Blog = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`)
		.then((data) => data.json())
		.then((data) => data.data);

	return (
		<main className="flex justify-center py-4 px-4 items-center">
			<div className="w-full max-w-6xl gap-8 flex justify-center flex-col items-stretch">
				<div className="flex flex-col md:flex-row justify-start items-stretch md:justify-center md:items-center">
					<div className="md:w-4/6 flex flex-col justify-start items-stretch gap-4">
						{/* COVER */}
						{blog.cover_url ? (
							<Image src={blog.cover_url} alt={blog.name} width={1920} height={1080} className="rounded-2xl" />
						) : (
							<div className="w-full aspect-video bg-secondary/50 flex justify-center items-center">
								<ImageOff className="text-muted-foreground" />
							</div>
						)}
						{/* COVER END */}

						{/* CONTENT HEADER */}
						<div className="flex flex-col gap-1 justify-start items-start">
							<span className="text-sm text-muted-foreground">Diupload pada {moment(blog.created_at).format("DD MMM YYYY")}</span>
							<h1 className="font-bold text-2xl">{blog.name}</h1>
							<p className="text-muted-foreground text-base">{blog.description}</p>

							<div className="flex gap-2 justify-end items-center py-4 my-2 border-y w-full">
								<Tooltip>
									<TooltipTrigger asChild>
										<Button size="sm" variant="secondary">
											<Layers />
											{blog.category?.name}
										</Button>
									</TooltipTrigger>
									<TooltipContent>Kategori</TooltipContent>
								</Tooltip>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button size="sm" variant="secondary" asChild>
											<Link href={`/stt/${blog.stt_slug}`}>
												<Building2 />
												{blog.stt?.name}
											</Link>
										</Button>
									</TooltipTrigger>
									<TooltipContent>STT</TooltipContent>
								</Tooltip>
							</div>
						</div>
						{/* CONTENT HEADER END */}

						{/* BODY */}
						<div className="prose prose-base" dangerouslySetInnerHTML={{ __html: blog.body || "" }}></div>
						{/* BODY END */}
					</div>

					<div className="hidden md:w-2/6 md:flex"></div>
				</div>
				<Comments slug={slug} comments={blog.blog_comments} />
			</div>
		</main>
	);
}

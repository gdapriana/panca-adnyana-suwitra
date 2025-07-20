import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Blog } from "@/lib/types";
import { ArrowRight, Clock, ImageOff } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

export default function BlogSection({ blogs }: { blogs: Blog[] }) {
	return (
		<main className="flex justify-center py-12 px-4 items-center">
			<div className="w-full gap-8 max-w-6xl flex justify-center flex-col items-stretch md:flex-row md:items-start">
				<div className="flex md:w-1/3 flex-col justify-start items-start gap-1">
					<Badge variant="outline">Blog & Berita</Badge>
					<h1 className="text-lg font-bold">Blog & Berita terbaru dari Setiap STT</h1>
					<p className="text-muted-foreground">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et natus error perferendis laudantium quae quas inventore
					</p>
					<Button asChild className="mt-4">
						<Link href="/blogs">
							Lihat semua blog <ArrowRight />
						</Link>
					</Button>
				</div>
				<div className="grid grid-cols-1 gap-2 md:w-2/3 sm:grid-cols-2 md:grid-cols-3">
					{blogs.map((blog: Blog, index: number) => {
						return (
							<Link
								href={`/blogs/${blog.slug}`}
								key={index}
								className="flex relative border rounded-xl overflow-hidden flex-col justify-start items-stretch"
							>
								{blog.cover_url ? (
									<Image src={blog.cover_url} alt="cover" width={1920} height={1080} className="w-full aspect-video" />
								) : (
									<div className="w-full aspect-video bg-secondary/50 text-muted-foreground flex justify-center items-center">
										<ImageOff />
									</div>
								)}
								<div className="p-4 flex-1 flex gap-1 flex-col justify-start items-stretch">
									<Badge className="absolute top-0 right-0 m-2" variant="secondary">
										<Clock />
										{moment(blog.created_at).fromNow()}
									</Badge>
									<h2 className="font-bold line-clamp-1">{blog.name}</h2>
									<p className="text-sm mb-2 text-muted-foreground line-clamp-2">{blog.description}</p>
									<div className="flex mt-auto gap-2 justify-end items-center flex-wrap">
										<Tooltip>
											<TooltipTrigger asChild>
												<Badge variant="outline" className="flex-1">
													{blog.stt?.name}
												</Badge>
											</TooltipTrigger>
											<TooltipContent>Stt</TooltipContent>
										</Tooltip>
										<Tooltip>
											<TooltipTrigger asChild>
												<Badge variant="outline" className="flex-1">
													{blog.category?.name}
												</Badge>
											</TooltipTrigger>
											<TooltipContent>Kategori</TooltipContent>
										</Tooltip>
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</main>
	);
}

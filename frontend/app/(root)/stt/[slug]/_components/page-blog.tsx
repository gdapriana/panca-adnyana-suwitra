import { Blog } from "@/lib/types";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Calendar, Clock, ImageOff, Layers2 } from "lucide-react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthContext } from "@/context/auth-context";
import CustomLoading from "@/app/_components/loading";
import { BsArrowRight, BsGear, BsTrash } from "react-icons/bs";
import AlertDeleteBlog from "@/app/(root)/stt/[slug]/_components/alert-delete-blog";
import { useState } from "react";
import Empty from "@/app/_components/empty";
import { TbDatabaseOff } from "react-icons/tb";
import { Badge } from "@/components/ui/badge";

export default function PageBlog({ blogs, stt_slug }: { blogs: Blog[]; stt_slug: string }) {
	const { authenticated, loading, role, user } = useAuthContext();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	if (loading || isLoading) return <CustomLoading />;
	return (
		<main className="flex gap-8 justify-center items-stretch flex-col">
			{blogs.length === 0 && <Empty Icon={TbDatabaseOff} message="Tidak ada blog" />}
			<div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{blogs.map((blog: Blog, index: number) => {
					return (
						<article
							// href={`/blogs/${blog.slug}`}
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

								<div className="flex justify-center items-center gap-2 mt-2">
									{authenticated &&
										(role === "ADMIN" || role === "SUPERADMIN") &&
										user?.stt_membership?.stt_slug === stt_slug && (
											<>
												<Tooltip>
													<TooltipTrigger asChild>
														<AlertDeleteBlog
															role={role}
															name={blog.name}
															setLoading={setIsLoading}
															token={user.token}
															slug={blog.slug}
														/>
													</TooltipTrigger>
													<TooltipContent>Hapus Blog</TooltipContent>
												</Tooltip>
												<Tooltip>
													<TooltipTrigger asChild>
														<Button asChild variant="secondary">
															<Link href={`/blogs/${blog.slug}/edit`}>
																<BsGear />
															</Link>
														</Button>
													</TooltipTrigger>
													<TooltipContent>Edit blog</TooltipContent>
												</Tooltip>
											</>
										)}
								</div>
							</div>
						</article>
					);
				})}
			</div>
		</main>
	);
}

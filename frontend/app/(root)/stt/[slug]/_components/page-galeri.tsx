"use client";
import AlertDeleteGallery from "@/app/(root)/stt/[slug]/_components/alert-delete-gallery";
import ZoomGallery from "@/app/(root)/stt/[slug]/_components/zoom-gallery";
import Empty from "@/app/_components/empty";
import CustomLoading from "@/app/_components/loading";
import { useAuthContext } from "@/context/auth-context";
import { Gallery } from "@/lib/types";
import Image from "next/image";
import { useState } from "react";
import { TbDatabaseOff } from "react-icons/tb";

export default function PageGallery({ gallery }: { gallery: Gallery[] }) {
	const { authenticated, loading, user } = useAuthContext();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	if (loading || isLoading) return <CustomLoading />;
	return (
		<main className="flex flex-col gap-8 justify-center items-stretch px-4 py-8">
			<div className="flex flex-col gap-4 justify-start items-start">
				{gallery.length === 0 && <Empty Icon={TbDatabaseOff} message="Tidak ada galeri" />}

				{gallery.length > 0 && (
					<div className="">
						<div className="columns-1 sm:columns-2 gap-1 md:columns-3 lg:columns-4 [&>img:not(:first-child)]:mt-8">
							{gallery.map((image: Gallery, index: number) => {
								return (
									<div key={index} className="rounded-lg flex relative group overflow-hidden my-1">
										{authenticated &&
											user?.stt_membership &&
											user.stt_membership.stt_slug === image.stt_slug &&
											(user.role === "ADMIN" || user.role === "SUPERADMIN") && (
												<AlertDeleteGallery id={image.id} setLoading={setIsLoading} token={user.token} />
											)}
										<ZoomGallery url={image.url!} />
										<Image
											src={image.url!}
											width={1000}
											height={1000}
											alt="galeri"
											className="group-hover:grayscale-100 z-0 transition-all duration-300"
										/>
									</div>
								);
							})}
						</div>
					</div>
				)}
			</div>
		</main>
	);
}

"use client";
import { Event, Stt } from "@/lib/types";

import Empty from "@/app/_components/empty";
import { TbDatabaseOff } from "react-icons/tb";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { useAuthContext } from "@/context/auth-context";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import moment from "moment";
import AlertDeleteEvent from "@/app/(root)/stt/[slug]/_components/alert-delete-event";
import { useState } from "react";
import CustomLoading from "@/app/_components/loading";

export default function PageEvent({ stt }: { stt: Stt }) {
	const { authenticated, role, user, loading } = useAuthContext();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	if (loading || isLoading) return <CustomLoading />;
	return (
		<main className="flex gap-8 justify-center items-stretch flex-col">
			<div className="flex flex-col gap-4 justify-start items-start">
				{stt.events.length !== 0 ? (
					<Table className="w-full">
						<TableHeader>
							<TableRow>
								<TableCell>Nama</TableCell>
								<TableCell>Deskripsi</TableCell>
								<TableCell>Mulai</TableCell>
								<TableCell>Berakhir</TableCell>
								{authenticated && (role === "ADMIN" || role === "SUPERADMIN") && stt.slug === user?.stt_membership?.stt_slug && (
									<TableCell>Aksi</TableCell>
								)}
							</TableRow>
						</TableHeader>
						<TableBody>
							{stt.events.map((event: Event, index: number) => {
								return (
									<TableRow key={index}>
										<TableCell>{event.name}</TableCell>
										<Tooltip>
											<TooltipTrigger>
												<TableCell className="line-clamp-1">{event.description}</TableCell>
											</TooltipTrigger>
											<TooltipContent>{event.description}</TooltipContent>
										</Tooltip>
										<TableCell>{moment(event.start_date).format("DD MMM YYYY")}</TableCell>
										<TableCell>{moment(event.end_date).format("DD MMM YYYY")}</TableCell>
										{authenticated &&
											(role === "ADMIN" || role === "SUPERADMIN") &&
											stt.slug === user?.stt_membership?.stt_slug && (
												<TableCell>
													<AlertDeleteEvent setLoading={setIsLoading} slug={event.slug} token={user.token} user_role={role} />
												</TableCell>
											)}
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				) : (
					<Empty Icon={TbDatabaseOff} message="tidak ada acara yang sudah berlalu" />
				)}
			</div>
		</main>
	);
}

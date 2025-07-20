"use client";
import PartEvent from "@/app/(root)/_components/part-event";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Event } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function EventSection({ events }: { events: Event[] }) {
	const [groupedEvents, setGroupedEvents] = useState<{ ongoing: Event[]; upcoming: Event[]; past: Event[] }>({
		ongoing: [],
		upcoming: [],
		past: [],
	});

	useEffect(() => {
		const now = new Date();

		const ongoing: Event[] = [];
		const upcoming: Event[] = [];
		const past: Event[] = [];

		if (events) {
			events.forEach((event: Event) => {
				const start = new Date(event.start_date as Date);
				const end = new Date(event.end_date as Date);

				if (now >= start && now <= end) {
					ongoing.push(event);
				} else if (now < start) {
					upcoming.push(event);
				} else {
					past.push(event);
				}
			});
		}

		setGroupedEvents({ ongoing, upcoming, past });
	}, [events]);

	return (
		<main className="flex justify-center py-12 px-4 items-center">
			<div className="w-full max-w-6xl gap-12 flex justify-center flex-col-reverse items-stretch md:flex-row md:justify-center md:items-start">
				<Button asChild className="mt-4 md:hidden">
					<Link href="/event">
						Lihat semua acara atau event <ArrowRight />
					</Link>
				</Button>
				<div className="md:w-1/2">
					<ol className="relative border-s border-gray-200 dark:border-gray-700">
						<PartEvent title="Acara Berlangsung" events={groupedEvents.ongoing} />
						<PartEvent title="Acara Akan Tiba" events={groupedEvents.upcoming} />
						<PartEvent title="Acara Selesai" events={groupedEvents.past} />
					</ol>
				</div>
				<div className="flex md:w-1/2 flex-col md:justify-start justify-center items-center md:items-end gap-1">
					<Badge variant="outline">Acara / Event</Badge>
					<h1 className="text-lg font-bold">Acara atau event terbaru</h1>
					<p className="text-muted-foreground text-center md:text-end">
						Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et natus error perferendis laudantium quae quas inventore
					</p>
					<Button asChild className="mt-4 hidden md:flex">
						<Link href="/event">
							Lihat semua acara atau event <ArrowRight />
						</Link>
					</Button>
				</div>
			</div>
		</main>
	);
}

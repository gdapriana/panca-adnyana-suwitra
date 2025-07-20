import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Event } from "@/lib/types";
import { CalendarOff, Clock } from "lucide-react";
import moment from "moment";
import Link from "next/link";

export default function PartEvent({ title, events }: { title: string; events: Event[] }) {
	return (
		<li className="mb-10 ms-4">
			<div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
			<time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{title}</time>
			<div className="flex flex-col gap-2 justify-start items-stretch">
				{events.length === 0 && (
					<div className="w-full h-[100px] flex text-xs text-muted-foreground justify-center items-center">
						<Button size="sm" variant="link" disabled>
							<CalendarOff /> tidak ada acara
						</Button>
					</div>
				)}
				{events.length > 0 &&
					events.map((event: Event, index: number) => {
						return (
							<div key={index} className="p-4 border rounded-xl gap-1 flex flex-col justify-start items-stretch">
								<Badge variant="outline" className="ms-auto">
									<Clock />
									{moment(event.start_date).format("DD MMM YYYY")} - {moment(event.end_date).format("DD MMM YYYY")}
								</Badge>
								<h3 className="font-bold mt-2">
									{event.name}
									{" | "}
									<span className="text-muted-foreground font-normal">
										Dari STT <Link href={`/stt/${event.stt_slug}`}> {event.stt.name}</Link>
									</span>
								</h3>
								<p className="line-clamp-2 text-muted-foreground mt-1 text-sm">{event.description}</p>
							</div>
						);
					})}
			</div>
		</li>
	);
}

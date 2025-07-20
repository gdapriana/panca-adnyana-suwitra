import BlogSection from "@/app/(root)/_components/blog";
import EventSection from "@/app/(root)/_components/event";
import Hero from "@/app/(root)/_components/hero";
import { Blog, Event } from "@/lib/types";

export default async function Home() {
	const blogs: Blog[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs?order=latest&take=3`)
		.then((data) => data.json())
		.then((data) => data.data);

	const events: Event[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events?take=5`)
		.then((data) => data.json())
		.then((data) => data.data);

	return (
		<>
			<Hero />
			<EventSection events={events} />
			<BlogSection blogs={blogs} />
		</>
	);
}

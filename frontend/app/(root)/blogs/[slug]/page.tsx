import Comments from "@/app/(root)/blogs/[slug]/_components/comments";
import { Blog } from "@/lib/types";

export default async function BlogPage({ params }: { params: { slug: string } }) {
	const { slug } = await params;

	const blog: Blog = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`)
		.then((data) => data.json())
		.then((data) => data.data);

	return (
		<main className="flex justify-center py-4 px-4 items-center">
			<div className="w-full max-w-6xl gap-8 flex justify-center flex-col items-stretch">
				{blog.name}

				<Comments slug={slug} comments={blog.blog_comments} />
			</div>
		</main>
	);
}

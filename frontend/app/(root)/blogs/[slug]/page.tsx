export default async function BlogPage({ params }: { params: { slug: string } }) {
	const { slug } = await params;
	return (
		<main className="flex justify-center py-4 px-4 items-center">
			<div className="w-full max-w-6xl flex justify-center flex-col items-stretch">{slug}</div>
		</main>
	);
}

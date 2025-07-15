"use client";

import { useAuthContext } from "@/context/auth-context";
import CustomLoading from "@/app/_components/loading";
import { redirect } from "next/navigation";
import BlogCreateForm from "@/app/(root)/blogs/create/_components/create-form";

export default function CreateBlogPage() {
	const { authenticated, role, loading, user } = useAuthContext();

	if (loading) return <CustomLoading />;

	if (!authenticated) {
		redirect("/login");
	}

	if (role === "USER") {
		redirect("/blog");
	}

	return (
		<main className="flex justify-center py-4 px-4 items-center">
			<div className="w-full max-w-6xl flex justify-center flex-col items-stretch">
				<BlogCreateForm token={user?.token} user_role={user?.role} user_stt={user?.stt_membership?.stt_slug} />
			</div>
		</main>
	);
}

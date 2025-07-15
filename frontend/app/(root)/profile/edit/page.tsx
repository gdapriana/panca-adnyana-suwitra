"use client";

import ProfileEditForm from "@/app/(root)/profile/edit/_components/edit-form";
import CustomLoading from "@/app/_components/loading";
import { useAuthContext } from "@/context/auth-context";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function EditProfilePage() {
	const { authenticated, loading, user } = useAuthContext();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	if (loading || isLoading) return <CustomLoading />;
	if (!authenticated) {
		return redirect("/login");
	}

	return (
		<main className="flex justify-center py-4 px-4 items-center">
			<div className="w-full max-w-6xl flex justify-center flex-col items-stretch">
				<ProfileEditForm profile={user} setLoading={setIsLoading} token={user?.token} username={user?.username} />
			</div>
		</main>
	);
}

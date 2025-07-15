"use client";

import { useAuthContext } from "@/context/auth-context";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { JoinRequest } from "@/lib/types";
import RequestTable from "@/app/(root)/request/_components/table";
import CustomLoading from "@/app/_components/loading";

export default function RequestPage() {
	const { authenticated, loading, role, user } = useAuthContext();
	const [userRequests, setUserRequests] = useState<JoinRequest[]>([]);
	const [loadingRequests, setLoadingRequests] = useState(true);

	useEffect(() => {
		if (!loading && (!authenticated || role !== "ADMIN")) {
			redirect("/");
		}
	}, [loading, authenticated, role]);

	useEffect(() => {
		const getRequests = async () => {
			const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accjoin`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"X-API-TOKEN": user?.token as string,
				},
			})
				.then((res) => res.json())
				.then((data) => data.data);
			setUserRequests(res);
			setLoadingRequests(false);
		};
		if (authenticated && role === "ADMIN") {
			getRequests().then();
		}
	}, [authenticated, role]);

	if (loading || loadingRequests) {
		return <CustomLoading />;
	}

	return (
		<main className="flex justify-center py-4 px-4 items-center">
			<div className="w-full max-w-6xl flex flex-col justify-center items-center">
				<RequestTable token={user?.token} requests={userRequests} />
			</div>
		</main>
	);
}

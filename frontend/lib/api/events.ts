import { Role } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export const fetchDeleteEvent = async ({
	setLoading,
	token,
	slug,
	user_role,
}: {
	setLoading: Dispatch<SetStateAction<boolean>>;
	token: string | undefined;
	slug: string | undefined;
	user_role: Role | undefined;
}) => {
	try {
		setLoading(true);
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${user_role === "ADMIN" ? "sttevent" : "mainsttevent"}/${slug}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"X-API-TOKEN": token!,
			},
		});

		const data = await res.json();
		if (!res.ok) {
			toast.error(JSON.stringify(data.errors));
			return;
		}
		toast.success("event berhasil dihapus");
		window.location.reload();
	} catch (e) {
		toast.error(JSON.stringify(e));
	} finally {
		setLoading(false);
	}
};

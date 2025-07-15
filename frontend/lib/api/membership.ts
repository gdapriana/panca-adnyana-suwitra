import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export const fetchDeleteMembership = async ({
	setLoading,
	token,
	username,
}: {
	setLoading: Dispatch<SetStateAction<boolean>>;
	token: string | undefined;
	username: string;
}) => {
	try {
		setLoading(true);
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/membership/${username}`, {
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
		toast.success("anggota berhasil dihapus");
		window.location.reload();
	} catch (e) {
		toast.error(JSON.stringify(e));
	} finally {
		setLoading(false);
	}
};

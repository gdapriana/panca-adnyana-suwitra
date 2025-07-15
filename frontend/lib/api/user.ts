import { destroy, upload } from "@/lib/api/cloudinary";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export const fetchPatchUser = async ({
	username,
	userProps,
	token,
	setLoading,
}: {
	username: string | undefined;
	userProps: {
		name: string | undefined;
		email: string | undefined;
		address: string | undefined;
		description: string | undefined;
		whatsapp_url: string | undefined;
		instagram_url: string | undefined;
		facebook_url: string | undefined;
		profile_img_url: string | undefined;
		profile_img_public_id: string | undefined;
		profile_img_file: File | undefined;
	};
	token: string | undefined;
	setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
	let cloudResponse: { url: string; public_id: string } | undefined = undefined;
	try {
		setLoading(true);

		if (userProps.profile_img_file) {
			cloudResponse = await upload({
				setLoading,
				selectedFile: userProps.profile_img_file,
				token: token!,
			});
		}

		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/update`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				"X-API-TOKEN": token!,
			},
			body: JSON.stringify({
				name: userProps.name || undefined,
				email: userProps.email || undefined,
				address: userProps.address || undefined,
				description: userProps.description || undefined,
				whatsapp_url: userProps.whatsapp_url || undefined,
				instagram_url: userProps.instagram_url || undefined,
				facebook_url: userProps.facebook_url || undefined,
				profile_img_url: cloudResponse?.url || userProps.profile_img_url || undefined,
				profile_img_public_id: cloudResponse?.public_id || userProps.profile_img_public_id || undefined,
			}),
		});

		const data = await res.json();
		if (!res.ok) {
			toast.error(JSON.stringify(data.errors));
		}
		if (userProps.profile_img_public_id) {
			await destroy({
				token: token!,
				public_id: userProps.profile_img_public_id,
				setLoading,
			});
		}
		toast.success(`berhasil memperbaharui profil`);
		window.location.replace("/profile");
	} catch (e) {
		if (cloudResponse) {
			await destroy({
				token: token!,
				public_id: cloudResponse.public_id,
				setLoading,
			});
		}
		toast.error("terjadi kesalahan saat mengirim permintaan");
	} finally {
		setLoading(false);
	}
};

import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export const fetchPostGallery = async ({
	slug,
	galleryProps,
	token,
	setLoading,
}: {
	slug: string;
	galleryProps: { publicId: string | undefined; imageUrl: string | undefined };
	token: string | undefined;
	setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
	try {
		setLoading(true);

		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stt/${slug}/gallery`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-API-TOKEN": token!,
			},
			body: JSON.stringify({
				url: galleryProps.imageUrl,
				public_id: galleryProps.publicId,
			}),
		});
		const data = await res.json();
		if (!res.ok) {
			toast.error(JSON.stringify(data.errors));
			throw new Error("failed");
		}
	} catch (e) {
		toast.error(JSON.stringify(e));
	} finally {
		setLoading(false);
	}
};

export const fetchDeleteGallery = async ({
	id,
	token,
	setLoading,
}: {
	id: string;
	token: string | undefined;
	setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
	try {
		setLoading(true);
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gallery/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"X-API-TOKEN": token!,
			},
		});
		const data = await res.json();
		if (!res.ok) {
			toast.error(JSON.stringify(data.errors));
			throw new Error("failed");
		}
	} catch (e) {
		toast.error(JSON.stringify(e));
	} finally {
		setLoading(false);
	}
};

import { BlogCategory } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export const fetchCategories = async ({
	setLoading,
	setAvailableBlogCategories,
}: {
	setLoading: Dispatch<SetStateAction<boolean>>;
	setAvailableBlogCategories: Dispatch<SetStateAction<BlogCategory[] | undefined>>;
}) => {
	try {
		setLoading(true);
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogcategories`);
		const data = await response.json();
		if (!response.ok) {
			toast.error(data.errors);
			return;
		}
		setAvailableBlogCategories(data.data);
	} catch (e) {
		toast(JSON.stringify(e));
	} finally {
		setLoading(false);
	}
};

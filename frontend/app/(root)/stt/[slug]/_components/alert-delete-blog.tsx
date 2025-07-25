import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { fetchDeleteBlog } from "@/lib/api/blogs";
import { Role } from "@/lib/types";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { toast } from "sonner";

export default function AlertDeleteBlog({
	setLoading,
	slug,
	token,
	name,
	role,
}: {
	setLoading: Dispatch<SetStateAction<boolean>>;
	slug: string;
	name: string;
	token: string | undefined;
	role: Role | undefined;
}) {
	const [buttonDisabled, setButtonDisabled] = useState(false);

	const handleDelete = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await fetchDeleteBlog({
				setLoading,
				token,
				slug,
				role,
			});
			setButtonDisabled(true);
		} catch (error) {
			toast.error("terjadi kesalahan saat mengirim permintaan.");
		} finally {
			setButtonDisabled(false);
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="destructive" className="cursor-pointer" disabled={buttonDisabled}>
					<BsTrash />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogTitle>Hapus blog</AlertDialogTitle>
				<p className="text-sm text-muted-foreground">
					Apakah Anda yakin ingin menghapus {name}? Tindakan ini tidak dapat dibatalkan.
				</p>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={buttonDisabled}>Batal</AlertDialogCancel>
					<AlertDialogAction disabled={buttonDisabled} className="cursor-pointer" onClick={handleDelete}>
						Hapus
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

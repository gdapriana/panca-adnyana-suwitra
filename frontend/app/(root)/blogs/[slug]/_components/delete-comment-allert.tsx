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
import { fetchDeleteComment } from "@/lib/api/blogs";
import { fetchDeleteMembership } from "@/lib/api/membership";
import { Trash2 } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { toast } from "sonner";

export default function AlertDeleteComment({
	setLoading,
	id,
	token,
}: {
	setLoading: Dispatch<SetStateAction<boolean>>;
	id: string;
	token: string | undefined;
}) {
	const handleDelete = async (e: FormEvent) => {
		e.preventDefault();
		try {
			setLoading(true);
			await fetchDeleteComment({
				setLoading,
				id,
				token,
			});
		} catch (error) {
			toast.error("terjadi kesalahan saat mengirim permintaan.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button size="icon" variant="destructive" className="cursor-pointer">
					<Trash2 />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogTitle>Hapus komentar</AlertDialogTitle>
				<p className="text-sm text-muted-foreground">
					Apakah Anda yakin ingin menghapus komentar? Tindakan ini tidak dapat dibatalkan.
				</p>
				<AlertDialogFooter>
					<AlertDialogCancel>Batal</AlertDialogCancel>
					<AlertDialogAction className="cursor-pointer" onClick={handleDelete}>
						Hapus
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

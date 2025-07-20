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
import { fetchDeleteGallery } from "@/lib/api/gallery";
import { fetchDeleteMembership } from "@/lib/api/membership";
import { Trash2 } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { toast } from "sonner";

export default function AlertDeleteGallery({
	setLoading,
	id,
	token,
}: {
	setLoading: Dispatch<SetStateAction<boolean>>;
	id: string;
	token: string | undefined;
}) {
	const [buttonDisabled, setButtonDisabled] = useState(false);

	const handleDelete = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await fetchDeleteGallery({
				setLoading,
				token,
				id,
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
				<Button variant="destructive" className="absolute m-2 cursor-pointer z-10 opacity-0 right-0 group-hover:opacity-100">
					<Trash2 />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogTitle>Hapus galeri</AlertDialogTitle>
				<p className="text-sm text-muted-foreground">
					Apakah Anda yakin ingin menghapus gambar ini? Tindakan ini tidak dapat dibatalkan.
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

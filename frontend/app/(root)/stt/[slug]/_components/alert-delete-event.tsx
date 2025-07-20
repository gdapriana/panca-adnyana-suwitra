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
import { fetchDeleteEvent } from "@/lib/api/events";
import { Role } from "@/lib/types";
import { Trash2 } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { toast } from "sonner";

export default function AlertDeleteEvent({
	setLoading,
	slug,
	token,
	user_role,
}: {
	setLoading: Dispatch<SetStateAction<boolean>>;
	slug: string;
	user_role: Role | undefined;
	token: string | undefined;
}) {
	const [buttonDisabled, setButtonDisabled] = useState(false);

	const handleDelete = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await fetchDeleteEvent({
				setLoading,
				token,
				slug,
				user_role,
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
				<Button size="icon" variant="destructive" className="cursor-pointer">
					<Trash2 />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogTitle>Hapus event</AlertDialogTitle>
				<p className="text-sm text-muted-foreground">
					Apakah Anda yakin ingin menghapus event? Tindakan ini tidak dapat dibatalkan.
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

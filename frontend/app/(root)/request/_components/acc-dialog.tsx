import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { JoinRequest } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuthContext } from "@/context/auth-context";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function AccDialog({ request, token }: { request: JoinRequest; token: string | undefined }) {
	const { authenticated } = useAuthContext();
	const [buttonDisabled, setButtonDisabled] = useState(false);

	const handleAccept = async () => {
		if (!authenticated) {
			redirect("/login");
		}

		try {
			const req = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accjoin/${request.id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					"X-API-TOKEN": token!,
				},
			});
			const res = await req.json();
			if (!req.ok) {
				toast.error(JSON.stringify(res.errors));
			} else {
				toast.success("berhasil menyetujui pengajuan");
				window.location.reload();
			}
		} catch (error) {
			toast.error("terjadi kesalahan saat mengirim permintaan.");
			setButtonDisabled(false);
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button disabled={request.is_acc || !!request.user.stt_membership} size="sm" className="cursor-pointer">
					Setujui
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogTitle>
					Setujui {request.username} sebagai anggota STT {request.stt.name}?
				</AlertDialogTitle>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={buttonDisabled}>Batal</AlertDialogCancel>
					<AlertDialogAction disabled={buttonDisabled} className="cursor-pointer" onClick={handleAccept}>
						Setujui
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {JoinRequest} from "@/lib/types";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";

export default function AccDialog({ request, token }: { request: JoinRequest, token: string | undefined }) {

  const handleAccept = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/accjoin/${request.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-API-TOKEN": token!,
      },
    })
    .then((res) => res.json())
    .then((data) => data.data);

    if (!res.ok) {
      toast.error(JSON.stringify(res.errors));
    } else {
      toast.success("Berhasil menyetujui pengajuan");
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={request.is_acc} size="sm" className="cursor-pointer">Setujui</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Setujui {request.username} sebagai anggota STT {request.stt.name}?</AlertDialogTitle>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={handleAccept}>Setujui</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { fetchDeleteMembership } from "@/lib/api/membership";
import { Trash2 } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { toast } from "sonner";

export default function AlertDeleteAnggota({
  setLoading,
  username,
  token
}: {
  setLoading: Dispatch<SetStateAction<boolean>>;
  username: string;
  token: string | undefined;
}) {
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await fetchDeleteMembership({
        setLoading,
        token,
        username
      })
      setButtonDisabled(true);
    } catch (error) {
      toast.error("terjadi kesalahan saat mengirim permintaan.");
    } finally {
      setButtonDisabled(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="destructive" className="cursor-pointer">
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Hapus anggota</AlertDialogTitle>
        <p className="text-sm text-muted-foreground">
          Apakah Anda yakin ingin menghapus {username}? Tindakan ini tidak dapat
          dibatalkan.</p>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={buttonDisabled}>Batal</AlertDialogCancel>
          <AlertDialogAction
            disabled={buttonDisabled}
            className="cursor-pointer"
            onClick={handleDelete}
          >
            Hapus
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
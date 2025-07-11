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
import { Trash } from "lucide-react";

export default function DeleteDialog({
  request,
  token,
}: {
  request: JoinRequest;
  token: string | undefined;
}) {
  const { authenticated } = useAuthContext();
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleDelete = async () => {
    if (!authenticated) {
      redirect("/login");
    }

    try {
      setButtonDisabled(true);
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/accjoin/${request.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-API-TOKEN": token!,
          },
        },
      );
      const res = await req.json();
      if (!req.ok) {
        toast.error(JSON.stringify(res.errors));
      } else {
        toast.success("berhasil dihapus");
        window.location.reload();
      }
    } catch (error) {
      toast.error("terjadi kesalahan saat mengirim permintaan.");
      setButtonDisabled(false);
    } finally {
      setButtonDisabled(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={buttonDisabled} size="sm" className="cursor-pointer">
          <Trash />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Hapus permintaan?</AlertDialogTitle>
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
  );
}

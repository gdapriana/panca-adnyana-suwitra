"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { Stt } from "@/lib/types";
import { useAuthContext } from "@/context/auth-context";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function ReqDialog({ stt }: { stt: Stt }) {
  const { authenticated, user } = useAuthContext();
  const [openAlert, setOpenAlert] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const reqHandle = async () => {
    if (!authenticated) {
      redirect("/login");
    }

    try {
      setButtonDisabled(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/join/${stt.slug}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-TOKEN": user?.token!,
          },
        },
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(
          JSON.stringify(data.errors.replace(/['"]+/g, "") || data.message),
        );
        setButtonDisabled(false);
        setOpenAlert(false);
        return;
      }

      toast.success("berhasil mengajukan keanggotaan");
      setButtonDisabled(false);
      setOpenAlert(false);
    } catch (error) {
      toast.error("terjadi kesalahan saat mengirim permintaan.");
      setButtonDisabled(false);
      setOpenAlert(false);
    }
  };
  return (
    <AlertDialog open={openAlert}>
      <AlertDialogTrigger asChild>
        <Button
          onClick={() => setOpenAlert(true)}
          className="cursor-pointer flex-1"
        >
          Gabung
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>
          Anda yakin ingin gabung ke stt {stt.name}?
        </AlertDialogTitle>
        <AlertDialogDescription>{stt.description}</AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={buttonDisabled}
            onClick={() => setOpenAlert(false)}
            className="cursor-pointer"
          >
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer"
            disabled={buttonDisabled}
            onClick={reqHandle}
          >
            Gabung
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

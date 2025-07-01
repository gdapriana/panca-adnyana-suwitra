'use client'

import {
  AlertDialog, AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {Stt} from "@/lib/types";

export default function ReqDialog({ stt }: { stt: Stt }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" className="cursor-pointer">
          Gabung
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Anda yakin ingin gabung ke stt { stt.name }?</AlertDialogTitle>
        <AlertDialogDescription>
          {stt.description}
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            Gabung
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
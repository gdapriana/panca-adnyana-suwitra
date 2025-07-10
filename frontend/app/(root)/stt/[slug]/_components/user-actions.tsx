"use client";

import CustomLoading from "@/app/_components/loading";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/context/auth-context";
import { Stt } from "@/lib/types";
import { Edit2, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { BsGear } from "react-icons/bs";

export default function UserActions({ stt }: { stt: Stt }) {
  const { authenticated, role, loading, user } = useAuthContext();
  if (loading) return <CustomLoading />;
  return (
    <div className="flex flex-wrap gap-2">
      {!authenticated && (
        <Button
          asChild
          size="sm"
          variant="default"
          className="cursor-pointer flex-1"
        >
          <Link href="/login">
            <LogIn />
            Masuk STT
          </Link>
        </Button>
      )}

      {authenticated &&
        (user?.role === "ADMIN" || user?.role === "SUPERADMIN") &&
        user.stt_membership?.stt_slug === stt.slug && (
          <Button
            size="sm"
            variant="default"
            className="cursor-pointer flex-1"
            asChild
          >
            <Link href={`/stt/${stt.slug}/edit`}>
              <BsGear />
              Edit STT
            </Link>
          </Button>
        )}
      {user?.stt_membership && user.stt_membership.stt_slug === stt.slug && (
        <Button
          size="sm"
          variant="destructive"
          className="cursor-pointer flex-1"
        >
          <LogOut />
          Keluar STT
        </Button>
      )}
    </div>
  );
}

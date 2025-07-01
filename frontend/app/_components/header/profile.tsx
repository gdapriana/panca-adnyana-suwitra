"use client";

import { useAuthContext } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {Calendar, Images, ListCheck, LogIn, LogOut, Plus, User2, Users} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/lib/types";

export default function Profile() {
  const { authenticated, role, loading, user, logout } = useAuthContext();

  if (loading) return <Button>Loading</Button>;
  if (!authenticated)
    return (
      <Button asChild>
        <Link href="/login">
          <LogIn /> Masuk
        </Link>
      </Button>
    );
  if (authenticated) return <Dropdown user={user} logout={logout} />;
}

const Dropdown = ({ user, logout }: { user: User | null; logout:() => void }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="bg-secondary cursor-pointer p-1 md:p-2 md:pr-4 gap-2 flex justify-center items-center rounded-full">
          <Avatar>
            <AvatarImage src={user?.profile_img_url} />
            <AvatarFallback className="bg-muted-foreground/20 flex justify-center items-center font-bold text-muted-foreground">
              {user?.username.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-muted-foreground hidden md:inline">
            {user?.username}
          </span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="start">
        <DropdownMenuLabel>Aktifitas</DropdownMenuLabel>

        <DropdownMenuGroup>
          {!user?.stt_membership && (
            <DropdownMenuItem asChild>
              <Link href="/stt" className="cursor-pointer">
                Gabung STT
                <DropdownMenuShortcut>
                  <Users />
                </DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          )}
          {user?.role === "SUPERADMIN" && (
            <DropdownMenuItem asChild>
              <Link href="/stt" className="cursor-pointer">
                Tambah STT
                <DropdownMenuShortcut>
                  <Plus />
                </DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          )}


          {(user?.role === "ADMIN" || user?.role === "SUPERADMIN") && (
            <>
              <DropdownMenuItem asChild>
                <Link href="/stt" className="cursor-pointer">
                  Buat Blog
                  <DropdownMenuShortcut>
                    <Images />
                  </DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/stt" className="cursor-pointer">
                  Buat Event
                  <DropdownMenuShortcut>
                    <Calendar />
                  </DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
            </>
          )}

          {user?.stt_membership && (
            <DropdownMenuItem variant="destructive" asChild>
              <Link href="/stt" className="cursor-pointer">
                Keluar STT
                <DropdownMenuShortcut>
                  <LogOut />
                </DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          )}
          {user?.role === "ADMIN" && (
            <DropdownMenuItem asChild>
              <Link href="/request" className="cursor-pointer">
                Daftar Permintaan Gabung
                <DropdownMenuShortcut>
                  <ListCheck />
                </DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={logout} className="cursor-pointer" variant="destructive">
            Logout
            <DropdownMenuShortcut>
              <LogOut />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

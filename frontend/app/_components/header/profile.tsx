'use client'

import {useAuthContext} from "@/context/auth-context";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {LogIn} from "lucide-react";

export default function Profile() {
  const { authenticated, role, loading, user } = useAuthContext();

  if (loading) return <Button>Loading</Button>
  if (!authenticated) return (
    <Button asChild>
      <Link href="/login"><LogIn /> Masuk</Link>
    </Button>
  )
  if (authenticated) return (
    <Button className="flex justify-center items-center gap-2 bg-primary">
      {user?.username}
    </Button>
  )
}
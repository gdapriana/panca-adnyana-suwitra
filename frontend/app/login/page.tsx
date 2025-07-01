"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, LogIn } from "lucide-react";
import { useAuthContext } from "@/context/auth-context";
import { redirect } from "next/navigation";
import {toast} from "sonner";
import Link from "next/link";

export default function Login() {
  const { authenticated, loading, login } = useAuthContext();
  if (loading) return <div>Loading...</div>;
  if (authenticated) redirect("/");

  const [typePassword, setTypePassword] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      toast.error(JSON.stringify(data.errors));
    } else {
      login(data.data.token);
      redirect("/");
    }
  };

  return (
    <main className="w-full h-dvh flex justify-center items-center bg-background">
      <div className="flex flex-col justify-center items-stretch w-full max-w-md m-4">
        <div className="flex justify-center items-center">
          Belum mempunyai akun? <Button variant="link" asChild><Link href="/register">Daftar</Link></Button>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-start items-stretch gap-4"
        >
          <Label
            htmlFor="username"
            className="flex flex-col justify-start items-stretch gap-2"
          >
            <span>Username</span>
            <Input
              onChange={(e) => setUsername(e.target.value)}
              required
              id="username"
              type="text"
              placeholder="Masukkan username"
            />
          </Label>
          <Label
            htmlFor="password"
            className="flex flex-col justify-start items-stretch gap-2"
          >
            <span>Password</span>
            <div className="flex justify-center items-center gap-2">
              <Input
                onChange={(e) => setPassword(e.target.value)}
                required
                id="password"
                type={typePassword ? "password" : "text"}
                placeholder="Masukkan kata sandi"
                className="flex-1"
              />
              <Button
                type="button"
                onClick={() => setTypePassword(!typePassword)}
                size="icon"
                className="cursor-pointer"
              >
                <Eye />
              </Button>
            </div>
          </Label>
          <Button
            type="submit"
            variant="default"
            size="lg"
            className="cursor-pointer mt-4"
          >
            <LogIn />
            Masuk
          </Button>
        </form>
        <div className=""></div>
      </div>
    </main>
  );
}

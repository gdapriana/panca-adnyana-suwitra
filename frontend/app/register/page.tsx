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

export default function Register() {
  const { authenticated, loading, login } = useAuthContext();
  if (loading) return <div>Loading...</div>;
  if (authenticated) redirect("/");

  const [typePassword, setTypePassword] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confPassword) {
      toast.error("Password tidak sama");
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        name,
        email,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      toast.error(JSON.stringify(data.errors));
    } else {
      toast.success("Berhasil mendaftar");
      redirect("/login");
    }
  };

  return (
    <main className="w-full h-dvh flex justify-center items-center bg-background">
      <div className="flex flex-col justify-center items-stretch w-full max-w-md m-4">
        <div className="flex justify-center items-center">
          Sudah mempunyai akun? <Button variant="link" asChild><Link href="/login">Masuk</Link></Button>
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
            htmlFor="nama"
            className="flex flex-col justify-start items-stretch gap-2"
          >
            <span>Nama</span>
            <Input
              onChange={(e) => setName(e.target.value)}
              required
              id="nama"
              type="text"
              placeholder="Masukkan Nama Lengkap"
            />
          </Label>
          <Label
            htmlFor="email"
            className="flex flex-col justify-start items-stretch gap-2"
          >
            <span>Email</span>
            <Input
              onChange={(e) => setEmail(e.target.value)}
              required
              id="email"
              type="email"
              placeholder="Masukkan Email"
            />
          </Label>
          <div className="flex justify-center items-center gap-4">
            <Label
              htmlFor="password"
              className="flex flex-col flex-1 justify-start items-stretch gap-2"
            >
              <span>Password</span>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                required
                id="password"
                type="password"
                placeholder="Masukkan kata sandi"
                className="flex-1"
              />
            </Label>
            <Label
              htmlFor="confpassword"
              className="flex flex-col flex-1 justify-start items-stretch gap-2"
            >
              <span>Konfirmasi Password</span>
              <Input
                onChange={(e) => setConfPassword(e.target.value)}
                required
                id="confpassword"
                type="password"
                placeholder="Konfirmasi kata sandi"
                className="flex-1"
              />
            </Label>

          </div>
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

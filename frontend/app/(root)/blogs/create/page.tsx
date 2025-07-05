"use client";

import { useAuthContext } from "@/context/auth-context";
import CustomLoading from "@/app/_components/loading";
import { redirect } from "next/navigation";
import BlogCreateForm from "@/app/(root)/blogs/create/_components/form";

export default function CreateBlogPage() {
  const { authenticated, role, loading } = useAuthContext();

  if (loading) return <CustomLoading />;

  if (!authenticated) {
    redirect("/login");
  }

  if (role === "USER") {
    redirect("/blog");
  }

  return (
    <main className="flex justify-center py-4 px-4 items-center">
      <div className="w-full max-w-6xl flex justify-center flex-col items-stretch">
        {/* name category cover description body */}
        <BlogCreateForm />
      </div>
    </main>
  );
}

"use client";

import SttEditForm from "@/app/(root)/stt/[slug]/edit/_components/edit-form";
import CustomLoading from "@/app/_components/loading";
import { useAuthContext } from "@/context/auth-context";
import { fetchSTT } from "@/lib/api/stt";
import { Stt } from "@/lib/types";
import { redirect } from "next/navigation";
import { useEffect, useState, use } from "react";

export default function EditStt({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [stt, setStt] = useState<Stt>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { authenticated, role, loading, user } = useAuthContext();

  useEffect(() => {
    fetchSTT({ slug, setLoading: setIsLoading, setStt });
  }, []);

  if (loading) return <CustomLoading />;
  if (!authenticated) return redirect("/login");
  if (role === "USER") return redirect(`/stt/${slug}`);

  if (isLoading) return <CustomLoading />;

  return (
    <main className="flex justify-center py-4 px-4 items-center">
      <div className="w-full max-w-6xl gap-8 flex justify-center flex-col items-stretch">
        <SttEditForm
          stt={stt}
          setLoading={setIsLoading}
          slug={slug}
          token={user?.token}
          role={role}
        />
      </div>
    </main>
  );
}

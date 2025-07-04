"use client";

import { useSearchParams } from "next/navigation";
import { Stt } from "@/lib/types";
import PageAnggota from "@/app/(root)/stt/[slug]/_components/page-anggota";
import PageEvent from "@/app/(root)/stt/[slug]/_components/page-event";
import PageStruktur from "@/app/(root)/stt/[slug]/_components/page-struktur";

export default function TabContent({ stt }: { stt: Stt }) {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "blog"; // <-- default ke 'blog'

  switch (tab) {
    case "blog":
      return <div className="mt-4">Ini konten Blog</div>;
    case "event":
      return <PageEvent stt={stt} />;
    case "struktur":
      return <PageStruktur stt={stt} />;
    case "anggota":
      return <PageAnggota memberships={stt.stt_membership} />;
    default:
      return <div className="mt-4">Tab tidak ditemukan.</div>;
  }
}

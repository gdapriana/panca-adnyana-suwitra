"use client";

import { useSearchParams } from "next/navigation";
import { Stt } from "@/lib/types";
import PageAnggota from "@/app/(root)/stt/[slug]/_components/page-anggota";
import PageEvent from "@/app/(root)/stt/[slug]/_components/page-event";
import PageStruktur from "@/app/(root)/stt/[slug]/_components/page-struktur";
import PageBlog from "@/app/(root)/stt/[slug]/_components/page-blog";
import PageGallery from "@/app/(root)/stt/[slug]/_components/page-galeri";

export default function TabContent({ stt }: { stt: Stt }) {
	const searchParams = useSearchParams();
	const tab = searchParams.get("tab") || "blog";

	switch (tab) {
		case "blog":
			return <PageBlog stt_slug={stt.slug} blogs={stt.blogs} />;
		case "event":
			return <PageEvent stt={stt} />;
		case "struktur":
			return <PageStruktur stt={stt} />;
		case "anggota":
			return <PageAnggota stt_slug={stt.slug} memberships={stt.stt_membership} />;
		case "galeri":
			return <PageGallery gallery={stt.gallery} />;
		default:
			return <div className="mt-4">Tab tidak ditemukan.</div>;
	}
}

import { notFound } from "next/navigation";
import { Stt } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, Files, Network, Users } from "lucide-react";
import TabContent from "@/app/(root)/stt/[slug]/_components/tab";

export default async function SttPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stt/${slug}`, {
    next: { revalidate: 60 }, // atau cache: 'no-store'
  });

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();
  const stt: Stt | null = data?.data;

  if (!stt) {
    notFound();
  }

  return (
    <main className="flex justify-center py-4 px-4 items-center">
      <div className="w-full max-w-6xl flex justify-center flex-col items-stretch">
        <div className="flex mb-8 gap-1 justify-center items-center overflow-auto">
          <Button className="flex-1" asChild variant="secondary">
            <Link href="?tab=blog">
              <Files /> Blog
            </Link>
          </Button>
          <Button className="flex-1" asChild variant="secondary">
            <Link href="?tab=event">
              <Calendar /> Event
            </Link>
          </Button>
          <Button className="flex-1" asChild variant="secondary">
            <Link href="?tab=struktur">
              <Network /> Struktur Organisasi
            </Link>
          </Button>
          <Button className="flex-1" asChild variant="secondary">
            <Link href="?tab=anggota">
              <Users /> Anggota
            </Link>
          </Button>
        </div>
        <TabContent stt={stt} />
      </div>
    </main>
  );
}

import { notFound } from "next/navigation";
import { Stt } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Calendar, Files, ImageOff, Network, Users } from "lucide-react";
import TabContent from "@/app/(root)/stt/[slug]/_components/tab";
import UserActions from "@/app/(root)/stt/[slug]/_components/user-actions";
import SttInformation from "@/app/(root)/stt/[slug]/_components/information";
import Image from "next/image";

export default async function SttPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stt/${slug}`, {
    next: { revalidate: 5 },
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
      <div className="w-full max-w-6xl gap-8 flex justify-center flex-col items-stretch">
        <div className="flex flex-col justify-start items-stretch">
          <div className="relative rounded-3xl flex justify-center items-center aspect-[16/6] mb-[3rem] md:mb-[4rem] md:aspect-[16/4] bg-secondary">
            {stt.background_url ? (
              <Image
                src={stt.background_url}
                alt="logo"
                width={1920}
                height={1080}
                className="w-full rounded-3xl h-full object-cover"
              />
            ) : (
              <span className="text-muted-foreground">
                <ImageOff />
              </span>
            )}
            <div className="absolute overflow-hidden flex justify-center items-center bottom-[-15%] left-1/2 right-1/2 translate-x-[-50%] w-[80px] md:w-[100px] aspect-square bg-white rounded-full">
              {stt.logo_url ? (
                <Image
                  src={stt.logo_url}
                  alt="logo"
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-muted-foreground">
                  <ImageOff />
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-4 justify-center items-center flex-col">
            <h1 className="font-bold text-xl md:text-3xl text-center">
              STT {stt.name}
            </h1>
            <SttInformation stt={stt} />
            <p className="text-muted-foreground text-center">
              {stt.description}
            </p>
            <UserActions stt={stt} />
          </div>
        </div>
        <div className="flex mb-8 gap-1 justify-center items-center flex-wrap">
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

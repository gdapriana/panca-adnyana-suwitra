import Brand from "@/app/_components/header/brand";
import Profile from "@/app/_components/header/profile";
import Navigation from "@/app/_components/header/navigation";
import { Stt } from "@/lib/types";

export default async function Header() {
  const stt: Stt[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stt`)
    .then((res) => res.json())
    .then((data) => data.data);

  return (
    <header className="flex z-[5] justify-center py-4 px-4 items-center">
      <div className="w-full max-w-6xl flex justify-between items-center">
        <Brand />
        <Navigation stt={stt} />
        <Profile />
      </div>
    </header>
  );
}

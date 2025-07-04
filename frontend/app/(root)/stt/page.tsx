import { Stt } from "@/lib/types";
import Wrapper from "@/app/(root)/stt/_components/wrapper";

export default async function SttPage() {
  const stt: Stt[] = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stt`)
    .then((res) => res.json())
    .then((data) => data.data);
  return (
    <main className="flex justify-center py-4 px-4 items-center">
      <div className="w-full max-w-6xl flex justify-center flex-col items-stretch">
        <Wrapper stt={stt} />
      </div>
    </main>
  );
}

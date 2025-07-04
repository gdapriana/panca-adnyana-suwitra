import {Stt} from "@/lib/types";

export default function PageStruktur({ stt }: { stt: Stt }) {
  return (
    <main className="flex justify-center mt-8 items-center flex-col">
      <div className="w-[200px] h-[100px] flex justify-center items-center border">{stt.leader_username}</div>
      <div className="h-[100px] w-1 bg-primary"></div>
      <div className="w-[200px] h-[100px] flex justify-center items-center border">{stt.vice_username}</div>
      <div className="h-[150px] w-1 bg-primary"></div>
      <div className="flex flex-col md:translate-y-[-50%] md:flex-row justify-center items-center">
        <div className="w-[200px] h-[100px] flex justify-center items-center border">{stt.treasurer_username}</div>
        <div className="md:w-[200px] h-[100px] w-1 md:h-1 bg-primary"></div>
        <div className="w-[200px] h-[100px] flex justify-center items-center border">{stt.secretary_username}</div>
      </div>
    </main>
  )
}
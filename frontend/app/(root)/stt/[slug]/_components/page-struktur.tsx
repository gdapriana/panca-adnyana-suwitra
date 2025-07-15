import { Stt } from "@/lib/types";
import { StrukturCard } from "@/app/(root)/stt/[slug]/_components/struktur-card";

export default function PageStruktur({ stt }: { stt: Stt }) {
	return (
		<main className="flex justify-center mt-8 items-center flex-col">
			<StrukturCard as="Ketua STT" user={stt.leader} />
			<div className="h-[100px] w-1 bg-primary"></div>
			<StrukturCard as="Wakil STT" user={stt.vice} />
			<div className="h-[150px] w-1 bg-primary"></div>
			<div className="flex flex-col md:translate-y-[-50%] md:flex-row justify-center items-center">
				<StrukturCard as="Bendahara STT" user={stt.treasurer} />
				<div className="md:w-[200px] h-[100px] w-1 md:h-1 bg-primary"></div>
				<StrukturCard as="Sekretaris STT" user={stt.secretary} />
			</div>
		</main>
	);
}

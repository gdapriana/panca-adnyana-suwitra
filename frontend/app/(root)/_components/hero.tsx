import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero() {
	return (
		<main className="flex justify-center h-[400px] md:h-[500px] py-4 px-4 items-center">
			<div className="w-full max-w-6xl flex justify-center flex-col items-stretch">
				<div className="flex justify-center items-center flex-col">
					<h1 className="text-center text-2xl md:text-4xl font-bold">PANCA ADNYANA SUWITRA</h1>
					<h3 className="text-center text-muted-foreground">Website resmi seka truna-truni Banjar Lebih Duur Kaja, Gianyar</h3>
					<Button asChild className="mt-8">
						<Link href="#">Telusuri Lebih Lanjut</Link>
					</Button>
				</div>
			</div>
		</main>
	);
}

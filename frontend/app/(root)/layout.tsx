import { ReactNode } from "react";
import Header from "@/app/_components/header/root";
import Footer from "@/app/_components/footer/root";

export default async function Layout({ children }: { children: ReactNode }) {
	return (
		<main className="flex flex-col justify-start items-stretch">
			<Header />
			{children}
			<Footer />
		</main>
	);
}

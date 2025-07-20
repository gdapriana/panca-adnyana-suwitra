import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { contact, navigations, support } from "@/lib/navigations";
import { Navigation } from "@/lib/types";
import Link from "next/link";
import { BsFacebook, BsInstagram } from "react-icons/bs";

export default function Footer() {
	return (
		<footer className="flex mt-8 flex-col justify-center py-8 items-center border-t">
			<div className="w-full max-w-6xl py-8 md:flex-row md:items-start flex justify-center flex-col items-stretch gap-8">
				<div className="flex md:w-[40%] justify-start items-stretch flex-col gap-6">
					<div className="flex gap-3 justify-start items-center">
						<div className="w-[60px] aspect-square rounded-full bg-secondary/50"></div>
						<h1 className="font-bold text-xl">PANCA ADNYANA SUWITRA</h1>
					</div>

					<p className="text-muted-foreground text-sm">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis dignissimos aut consequatur, aperiam voluptatum
						fuga? Nam unde voluptates totam molestiae.
					</p>
				</div>

				<div className="md:w-[20%] flex flex-col justify-start items-stretch">
					<h2 className="font-bold">NAVIGASI</h2>
					<div className="flex flex-col justify-start items-start">
						{navigations.map((navigation: Navigation, index: number) => {
							return (
								<Tooltip key={index}>
									<TooltipTrigger asChild>
										<Button variant="link" asChild className="w-full relative justify-start">
											<Link href={navigation.href} className="p-0 line-clamp-1 has-[>svg]:px-[0]">
												<div className="absolute z-[2] h-full w-[40px] gradient-white right-0 top-0"></div>
												{navigation.icon && <navigation.icon />}
												<span className="line-clamp-1">{navigation.name}</span>
											</Link>
										</Button>
									</TooltipTrigger>
									<TooltipContent>{navigation.name}</TooltipContent>
								</Tooltip>
							);
						})}
					</div>
				</div>
				<div className="md:w-[20%] flex flex-col justify-start items-start">
					<h2 className="font-bold">BANTUAN</h2>
					{support.map((navigation: Navigation, index: number) => {
						return (
							<Tooltip key={index}>
								<TooltipTrigger asChild>
									<Button variant="link" asChild className="w-full relative justify-start">
										<Link href={navigation.href} className="p-0 line-clamp-1 has-[>svg]:px-[0]">
											<div className="absolute z-[2] h-full w-[40px] gradient-white right-0 top-0"></div>
											{navigation.icon && <navigation.icon />}
											<span className="line-clamp-1">{navigation.name}</span>
										</Link>
									</Button>
								</TooltipTrigger>
								<TooltipContent>{navigation.name}</TooltipContent>
							</Tooltip>
						);
					})}
				</div>
				<div className="md:w-[20%] overflow-hidden flex flex-col justify-start items-start">
					<h2 className="font-bold">KONTAK</h2>
					{contact.map((navigation: Navigation, index: number) => {
						return (
							<Tooltip key={index}>
								<TooltipTrigger asChild>
									<Button variant="link" asChild className="w-full relative justify-start">
										<Link href={navigation.href} className="p-0 line-clamp-1 has-[>svg]:px-[0]">
											<div className="absolute z-[2] h-full w-[40px] gradient-white right-0 top-0"></div>
											{navigation.icon && <navigation.icon />}
											<span className="line-clamp-1">{navigation.name}</span>
										</Link>
									</Button>
								</TooltipTrigger>
								<TooltipContent>{navigation.name}</TooltipContent>
							</Tooltip>
						);
					})}
				</div>
			</div>
			<div className="w-full flex justify-center items-center py-4 border-t">
				<div className="w-full max-w-6xl flex flex-col md:flex-row justify-center md:justify-between items-center">
					<p className="text-muted-foreground">Powered by gedeapriana</p>
					<div className="flex justify-center flex-wrap gap-1 items-center">
						<Button asChild variant="secondary" size="icon">
							<Link href="">
								<BsFacebook />
							</Link>
						</Button>
						<Button asChild variant="secondary" size="icon">
							<Link href="">
								<BsInstagram />
							</Link>
						</Button>
						<Button asChild variant="secondary" size="icon">
							<Link href="">
								<BsInstagram />
							</Link>
						</Button>
					</div>
				</div>
			</div>
		</footer>
	);
}

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Eye } from "lucide-react";
import Image from "next/image";

export default function ZoomGallery({ url }: { url: string }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="secondary"
					className="absolute cursor-pointer z-10 opacity-0 left-1/2 top-1/2 translate-y-[-50%] translate-x-[-50%] group-hover:opacity-100"
				>
					<Eye />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle></DialogTitle>
				<div className="max-h-[80dvh] overflow-auto">
					<Image alt="gallery" src={url} width={1000} className="rounded-lg" height={1000} />
				</div>
			</DialogContent>
		</Dialog>
	);
}

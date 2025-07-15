import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

export default function Empty({ Icon, message }: { Icon?: LucideIcon | IconType; message?: string }) {
	return (
		<main className="w-full aspect-[16/3] flex justify-center items-center">
			<div className="flex justify-center items-center gap-2">
				{Icon && <Icon />} {message && <span>{message}</span>}
			</div>
		</main>
	);
}

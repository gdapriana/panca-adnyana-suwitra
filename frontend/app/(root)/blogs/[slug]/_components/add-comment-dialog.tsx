import CustomLoading from "@/app/_components/loading";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useAuthContext } from "@/context/auth-context";
import { fetchPostComment } from "@/lib/api/blogs";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

export default function AddCommentDialog({
	slug,
	authenticated,
	username,
	token,
	setIsLoading,
}: {
	slug: string;
	authenticated: boolean;
	username: string | undefined;
	token: string | undefined;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
}) {
	const [message, setMessage] = useState<string>();

	const handleSubmit = async () => {
		if (!authenticated) return redirect("/login");
		await fetchPostComment({
			setLoading: setIsLoading,
			message,
			slug,
			token: token,
			username: username,
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="icon" className="cursor-pointer">
					<Plus />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Kirim komentar</DialogTitle>
				<Textarea onChange={(e) => setMessage(e.target.value)} placeholder="Masukkan komentar"></Textarea>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="secondary">Batal</Button>
					</DialogClose>
					<Button onClick={handleSubmit}>Kirim</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

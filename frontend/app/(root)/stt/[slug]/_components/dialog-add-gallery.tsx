import ImageDropzone from "@/app/(root)/stt/[slug]/_components/image-dropzone";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { bulkUpload, destroy } from "@/lib/api/cloudinary";
import { fetchPostGallery } from "@/lib/api/gallery";
import { Image } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

export default function DialogAddGallery({
	stt_slug,
	setLoading,
	token,
}: {
	stt_slug: string;
	setLoading: Dispatch<SetStateAction<boolean>>;
	token: string | undefined;
}) {
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

	const handleUpload = async () => {
		const formData = new FormData();
		selectedFiles.forEach((file) => {
			formData.append("images", file);
		});

		const cloudResponses: { imageUrl: string | undefined; publicId: string | undefined }[] = await bulkUpload({
			setLoading,
			formData,
			token,
		});

		try {
			setLoading(true);
			for (const image of cloudResponses) {
				await fetchPostGallery({ galleryProps: image, slug: stt_slug, setLoading, token });
			}
			toast.success("gallery berhasil ditambah");
			window.location.reload();
		} catch (e) {
			toast.error("gagal mengirim permintaan");
			if (cloudResponses) {
				for (const id of cloudResponses) {
					destroy({ token: token!, setLoading, public_id: id.publicId });
				}
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="sm" variant="default" className="cursor-pointer flex-1">
					<Image />
					Tambah Gallery
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Tambah gallery</DialogTitle>
				<ImageDropzone onFilesChange={setSelectedFiles} />
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="secondary">Batal</Button>
					</DialogClose>
					<Button onClick={handleUpload}>Unggah</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

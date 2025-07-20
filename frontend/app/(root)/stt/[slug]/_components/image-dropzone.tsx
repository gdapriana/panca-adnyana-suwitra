"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ImageDropzone({ onFilesChange }: { onFilesChange: (files: File[]) => void }) {
	const [files, setFiles] = useState<File[]>([]);
	const [previews, setPreviews] = useState<string[]>([]);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			setFiles(acceptedFiles);
			onFilesChange(acceptedFiles);

			const previewUrls = acceptedFiles.map((file) => URL.createObjectURL(file));
			setPreviews(previewUrls);
		},
		[onFilesChange],
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: { "image/*": [] },
		multiple: true,
	});

	return (
		<div className="space-y-4">
			<div
				{...getRootProps()}
				className={`border-2 border-dashed p-6 rounded-xl text-center cursor-pointer transition-all ${
					isDragActive ? "bg-muted" : "bg-background"
				}`}
			>
				<input {...getInputProps()} />
				<p className="text-muted-foreground">
					{isDragActive ? "Drop the files here ..." : "Drag & drop some images here, or click to select files"}
				</p>
				<Button variant="outline" className="mt-2">
					Select Images
				</Button>
			</div>

			{previews.length > 0 && (
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
					{previews.map((src, index) => (
						<Card key={index} className="overflow-hidden relative">
							<CardContent className="p-0">
								<Image src={src} alt={`Preview ${index + 1}`} width={300} height={300} className="w-full h-48 object-cover" />
							</CardContent>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}

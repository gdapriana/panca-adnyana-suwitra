import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

export default function BlogImagePreview({
  coverFile,
}: {
  coverFile: {
    coverFile: File | undefined;
    setCoverFile: Dispatch<SetStateAction<File | undefined>>;
  };
}) {
  const [preview, setPreview] = useState<string>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      coverFile.setCoverFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Label
      htmlFor="image"
      className="flex flex-col justify-start items-stretch gap-2"
    >
      Upload gambar
      <Input
        name="image"
        id="image"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      {preview && (
        <Image
          width={1920}
          height={1080}
          src={preview}
          alt="Preview"
          className="w-full aspect-video object-cover rounded shadow"
        />
      )}
    </Label>
  );
}

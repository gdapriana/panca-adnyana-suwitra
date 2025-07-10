import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

export default function InputCover({
  newImageFile,
  defaultImage,
}: {
  newImageFile: {
    file: File | undefined;
    setFile: Dispatch<SetStateAction<File | undefined>>;
  };
  defaultImage: {
    url: string | undefined;
    setUrl: Dispatch<SetStateAction<string | undefined>>;
  };
}) {
  const [coverError, setCoverError] = useState<string>();
  const [filePreview, setFilePreview] = useState<string | undefined>();

  const handdleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      newImageFile.setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col justify-start gap-1 items-stretch">
      <span>Cover</span>
      <div className="flex justify-center items-center gap-2">
        <Input
          defaultValue={defaultImage.url || undefined}
          placeholder="url gambar"
          className="flex-1"
          onChange={(e) => {
            defaultImage.setUrl(e.target.value);
            setCoverError(undefined);
          }}
        />
        atau
        <Input
          placeholder="file gambar"
          type="file"
          className="flex-1 w-auto"
          accept="image/*"
          onChange={handdleFileChange}
        />
      </div>

      {filePreview && (
        <Image
          src={filePreview}
          alt="cover"
          width={1920}
          height={1080}
          className={cn("w-full aspect-video mt-4 object-cover rounded-xl")}
        />
      )}
      {defaultImage.url && !filePreview && (
        <>
          <img
            src={defaultImage.url}
            alt="cover"
            width={1920}
            onError={() => {
              setCoverError("Gambar tidak dapat dimuat. Periksa URL-nya.");
            }}
            height={1080}
            className={cn(
              "w-full aspect-video mt-4 object-cover rounded-xl",
              coverError && "hidden",
            )}
          />
          {coverError && (
            <p className="text-sm text-red-500 mt-1">{coverError}</p>
          )}
        </>
      )}

      {!filePreview && !defaultImage.url && (
        <div className="w-full mt-4 text-muted-foreground aspect-video rounded-xl bg-secondary/50 flex justify-center items-center">
          <ImageOff />
        </div>
      )}
    </div>
  );
}

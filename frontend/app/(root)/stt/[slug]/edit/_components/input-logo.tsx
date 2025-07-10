import { Input } from "@/components/ui/input";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

export default function InputLogo({
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
      <span>Logo</span>
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

      <div className="flex justify-center items-center p-8">
        {filePreview && (
          <>
            <Image
              src={filePreview}
              alt="cover"
              width={1000}
              height={1000}
              className="w-[100px] aspect-square rounded-full object-cover"
            />
            {coverError && (
              <p className="text-sm text-red-500 mt-1">{coverError}</p>
            )}
          </>
        )}
        {defaultImage.url && !filePreview && (
          <img
            src={defaultImage.url}
            alt="cover"
            width={1000}
            height={1000}
            className="w-[100px] aspect-square rounded-full object-cover"
          />
        )}
        {!filePreview && !defaultImage.url && (
          <div className="w-[100px] flex justify-center items-center aspect-square rounded-full bg-secondary/50">
            <span className="text-muted-foreground">
              <ImageOff />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

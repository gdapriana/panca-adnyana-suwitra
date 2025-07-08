import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export const upload = async ({
  setLoading,
  selectedFile,
  token,
  setCoverUrl,
  setCoverUrlId,
}: {
  setLoading: Dispatch<SetStateAction<boolean>>;
  selectedFile: File | null;
  token: string;
  setCoverUrl: Dispatch<SetStateAction<string | undefined>>;
  setCoverUrlId: Dispatch<SetStateAction<string | undefined>>;
}) => {
  try {
    setLoading(true);
    const formData = new FormData();
    selectedFile && formData.append("image", selectedFile);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-TOKEN": token,
      },
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) {
      toast.error(JSON.stringify(data.errors));
      return;
    }
    setCoverUrl(data.data.imageUrl);
    setCoverUrlId(data.data.publicId);
  } catch (e) {
    toast(JSON.stringify(e));
  } finally {
    setLoading(false);
  }
};

export const destroy = async ({
  token,
  public_id,
  setLoading,
}: {
  token: string;
  public_id: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  try {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/upload/${public_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-API-TOKEN": token,
        },
      },
    );
    const data = await res.json();
    if (!res.ok) {
      toast.error(JSON.stringify(data.errors));
      return;
    }
  } catch (e) {
    toast.error(JSON.stringify(e));
  } finally {
    setLoading(false);
  }
};

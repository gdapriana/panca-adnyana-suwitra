import { destroy, upload } from "@/lib/api/cloudinary";
import { BlogCategory } from "@/lib/types";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

export const fetchPostBlog = async ({
  setLoading,
  blogProps,
  token,
  cloudUrl,
  cloudUrlId,
  user_stt,
}: {
  setLoading: Dispatch<SetStateAction<boolean>>;
  blogProps: {
    name: string | undefined;
    category: BlogCategory | undefined;
    coverUrl: string | undefined;
    coverFile: File | undefined;
    description: string | undefined;
    body: string | undefined;
  };
  token: string;
  cloudUrl: {
    cloudUrl: string | undefined;
    setCloudUrl: Dispatch<SetStateAction<string | undefined>>;
  };
  cloudUrlId: {
    cloudUrlId: string | undefined;
    setCloudUrlId: Dispatch<SetStateAction<string | undefined>>;
  };
  user_stt: string;
}) => {
  try {
    setLoading(true);
    if (blogProps.coverFile) {
      await upload({
        setLoading,
        selectedFile: blogProps.coverFile,
        token,
        setCoverUrl: cloudUrl.setCloudUrl,
        setCoverUrlId: cloudUrlId.setCloudUrlId,
      });
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sttblog`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-TOKEN": token,
      },
      body: JSON.stringify({
        name: blogProps.name,
        category_slug: blogProps.category?.slug,
        cover_url: cloudUrl.cloudUrl || blogProps.coverUrl,
        cover_public_id: cloudUrlId,
        description: blogProps.description,
        body: blogProps.body,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      toast.error(JSON.stringify(data.errors));
      return;
    }
    toast.success("blog berhasil dibuat");
    window.location.replace(`/stt/${user_stt}`);
  } catch (e) {
    cloudUrlId.cloudUrlId &&
      (await destroy({ token, public_id: cloudUrlId.cloudUrlId, setLoading }));
    toast(JSON.stringify(e));
  } finally {
    setLoading(false);
  }
};

import { destroy, upload } from "@/lib/api/cloudinary";
import { Blog, BlogCategory, Role } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

export const fetchBlog = async ({
  slug,
  setLoading,
  setBlog,
}: {
  slug: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setBlog: Dispatch<SetStateAction<Blog | undefined>>;
}) => {
  try {
    setLoading(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`);
    const data = await response.json();
    if (!response.ok) {
      toast.error(JSON.stringify(data.errors));
      return;
    }
    setBlog(data.data);
  } catch (e) {
    toast(JSON.stringify(e));
  } finally {
    setLoading(false);
  }
};

export const fetchPostBlog = async ({
  user_role,
  setLoading,
  blogProps,
  token,
  user_stt,
}: {
  user_role: Role | undefined;
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
  user_stt: string;
}) => {
  let cloudResponse: { url: string; public_id: string } | undefined = undefined;
  try {
    setLoading(true);
    if (blogProps.coverFile) {
      cloudResponse = await upload({
        setLoading,
        selectedFile: blogProps.coverFile,
        token,
      });
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${user_role === "ADMIN" ? "sttblog" : "mainsttblog"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-TOKEN": token,
      },
      body: JSON.stringify({
        name: blogProps.name,
        category_slug: blogProps.category?.slug,
        cover_url: cloudResponse?.url || blogProps.coverUrl,
        cover_public_id: cloudResponse?.public_id,
        description: blogProps.description,
        body: blogProps.body,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      toast.error(JSON.stringify(data.errors));
      return;
    }
    toast.success("blog berhasil dibuat, akan muncul beberapa saat");
    window.location.replace(`/stt/${user_stt}`);
  } catch (e) {
    cloudResponse?.public_id &&
      (await destroy({
        token,
        public_id: cloudResponse.public_id,
        setLoading,
      }));
    toast(JSON.stringify(e));
  } finally {
    setLoading(false);
  }
};

export const fetchPatchBlog = async ({
  blogProps,
  token,
  setLoading,
  user_role,
  slug,
  user_stt,
}: {
  blogProps: {
    name: string | undefined;
    description: string | undefined;
    category_slug: string | undefined;
    background_public_id: string | undefined;
    background_url: string | undefined;
    body: string | undefined;
    background_file: File | undefined;
  };
  token: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
  user_role: Role | undefined;
  slug: string;
  user_stt: string | undefined;
}) => {
  let cloudResponse: { url: string; public_id: string } | undefined = undefined;
  try {
    setLoading(true);
    if (blogProps.background_file) {
      cloudResponse = await upload({
        setLoading,
        selectedFile: blogProps.background_file,
        token,
      });
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${user_role === "ADMIN" ? "sttblog" : "mainsttblog"}/${slug}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-API-TOKEN": token,
      },
      body: JSON.stringify({
        name: blogProps.name,
        description: blogProps.description,
        category_slug: blogProps.category_slug,
        cover_url: cloudResponse?.url || blogProps.background_url || undefined,
        cover_public_id: cloudResponse?.public_id || blogProps.background_public_id || undefined,
        body: blogProps.body,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      toast.error(JSON.stringify(data.errors));
      return;
    }
    if (cloudResponse?.url) {
      await destroy({
        token,
        public_id: blogProps.background_public_id,
        setLoading,
      });
    }
    toast.success("blog berhasil di perbaharui!");
    window.location.reload();
    window.location.replace(`/stt/${user_stt}`);
  } catch (e) {
    cloudResponse?.public_id &&
      (await destroy({
        token,
        public_id: cloudResponse.public_id,
        setLoading,
      }));
    toast(JSON.stringify(e));
  } finally {
    setLoading(false);
  }
};

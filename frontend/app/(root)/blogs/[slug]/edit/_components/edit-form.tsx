"use client";
import InputCategory from "@/app/(root)/blogs/[slug]/edit/_components/input-category";
import InputCover from "@/app/(root)/blogs/[slug]/edit/_components/input-cover";
import UpdateBlogWYSIWYG from "@/app/(root)/blogs/_components/editor-update";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fetchPatchBlog } from "@/lib/api/blogs";
import { Blog, BlogCategory, Role } from "@/lib/types";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export default function BlogEditForm({
  token,
  availableCategories,
  user_role,
  user_stt,
  blog,
  setLoading,
}: {
  availableCategories: BlogCategory[] | undefined;
  token: string | undefined;
  user_role: Role | undefined;
  user_stt: string | undefined;
  blog: Blog | undefined;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<BlogCategory | undefined>(undefined);
  const [backgroundUrl, setBackgroundUrl] = useState<string | undefined>("");
  const [backgroundId, setBackgroundId] = useState<string | undefined>("");
  const [description, setDescription] = useState<string>("");
  const [body, setBody] = useState<string | undefined>("");
  const [newImageFile, setNewImageFile] = useState<File | undefined>(undefined);

  useEffect(() => {
    if (blog) {
      setName(blog.name || "");
      setCategory(blog.category);
      setBackgroundUrl(blog.cover_url || "");
      setBackgroundId(blog.cover_public_id || "");
      setDescription(blog.description || "");
      setBody(blog.body || "");
    }
  }, [blog]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchPatchBlog({
      token: token!,
      user_role,
      blogProps: {
        name: name === blog?.name ? undefined : name,
        category_slug:
          category?.slug === blog?.category?.slug ? undefined : category?.slug,
        background_url:
          backgroundUrl === blog?.cover_url ? undefined : backgroundUrl,
        background_file: newImageFile,
        description:
          description === blog?.description ? undefined : description,
        body: body === blog?.body ? undefined : body,
        background_public_id:
          backgroundId === blog?.cover_public_id ? undefined : backgroundId,
      },
      slug: blog?.slug || "",
      setLoading,
      user_stt: user_stt,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full gap-6 flex-col md:flex-row md:items-stretch"
    >
      <div className="flex flex-1 flex-col justify-start items-stretch gap-6">
        <Label
          htmlFor="name"
          className="flex flex-col justify-start items-stretch gap-2"
        >
          <span className="font-semibold">Nama Blog</span>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Masukkan nama blog disini..."
          />
        </Label>

        <InputCategory
          availableBlogCategories={availableCategories}
          category={category}
          setCategory={setCategory}
        />
        <InputCover
          defaultImage={{ url: backgroundUrl, setUrl: setBackgroundUrl }}
          newImageFile={{ file: newImageFile, setFile: setNewImageFile }}
        />
        <Label
          htmlFor="description"
          className="flex flex-col justify-start items-stretch gap-2"
        >
          <span className="font-semibold">Deskripsi singkat blog</span>
          <Textarea
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
            className="h-[200px]"
            placeholder="Deskripsi singkat blog disini"
          ></Textarea>
        </Label>
      </div>
      <div className="flex flex-1 flex-col justify-start items-stretch gap-6">
        <div className="flex-1">
          {blog && (
            <UpdateBlogWYSIWYG body={{ content: body, setContent: setBody }} />
          )}
        </div>
        <Button type="submit">Buat Blog</Button>
      </div>
    </form>
  );
}

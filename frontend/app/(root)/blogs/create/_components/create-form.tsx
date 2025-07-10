"use client";
import CreateBlogWYSIWYG from "@/app/(root)/blogs/_components/editor";
import BlogImagePreview from "@/app/(root)/blogs/create/_components/image-preview";
import CustomLoading from "@/app/_components/loading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { fetchCategories } from "@/lib/api/blog-categories";
import { fetchPostBlog } from "@/lib/api/blogs";
import { BlogCategory, Role } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function BlogCreateForm({
  token,
  user_role,
  user_stt,
}: {
  token: string | undefined;
  user_role: Role | undefined;
  user_stt: string | undefined;
}) {
  const [availableBlogCategories, setAvailableBlogCategories] =
    useState<BlogCategory[]>();
  const [name, setName] = useState<string>();
  const [category, setCategory] = useState<BlogCategory>();
  const [coverUrl, setCoverUrl] = useState<string>();
  const [coverFile, setCoverFile] = useState<File>();
  const [description, setDescription] = useState<string>();
  const [body, setBody] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [coverError, setCoverError] = useState<string>();

  useEffect(() => {
    fetchCategories({ setLoading, setAvailableBlogCategories });
  }, []);

  useEffect(() => {
    setCategory(availableBlogCategories && availableBlogCategories[0]);
  }, [availableBlogCategories]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetchPostBlog({
      user_role,
      setLoading,
      blogProps: {
        name,
        body,
        category,
        coverFile,
        coverUrl,
        description,
      },
      token: token!,
      user_stt: user_stt!,
    });
  };

  if (loading) return <CustomLoading />;

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
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Masukkan nama blog disini..."
          />
        </Label>

        <Label
          htmlFor="category"
          className="flex flex-col justify-start items-stretch gap-2"
        >
          <span className="font-semibold">Kategori Blog</span>
          <Select
            value={category?.slug}
            onValueChange={(val) => {
              const selected = availableBlogCategories?.find(
                (cat) => cat.slug === val,
              );
              if (selected) setCategory(selected);
            }}
          >
            <SelectTrigger id="category" className="w-full">
              <SelectValue placeholder={category?.name} />
            </SelectTrigger>
            <SelectContent>
              {availableBlogCategories?.map(
                (category: BlogCategory, index: number) => {
                  return (
                    <SelectItem value={category.slug} key={index}>
                      {category.name}
                    </SelectItem>
                  );
                },
              )}
            </SelectContent>
          </Select>
        </Label>

        <div className="flex flex-1 flex-col justify-start items-stretch gap-2">
          <Label className="flex flex-col justify-start items-stretch gap-2">
            <span className="font-semibold">Cover URL</span>
            <Input
              type="text"
              placeholder="https://example.com/image.jpg"
              value={coverUrl}
              onChange={(e) => {
                setCoverUrl(e.target.value);
                setCoverError(undefined);
              }}
            />
          </Label>

          {coverUrl && (
            <div className="mt-2">
              <img
                src={coverUrl}
                alt="Preview Cover"
                className={cn(
                  "w-full max-h-60 object-cover rounded-md border shadow",
                  coverError && "hidden",
                )}
                onError={() =>
                  setCoverError("Gambar tidak dapat dimuat. Periksa URL-nya.")
                }
              />
              {coverError && (
                <p className="text-sm text-red-500 mt-1">{coverError}</p>
              )}
            </div>
          )}
        </div>

        <BlogImagePreview coverFile={{ coverFile, setCoverFile }} />

        <Label
          htmlFor="description"
          className="flex flex-col justify-start items-stretch gap-2"
        >
          <span className="font-semibold">Deskripsi singkat blog</span>
          <Textarea
            onChange={(e) => setDescription(e.target.value)}
            className="h-[200px]"
            placeholder="Deskripsi singkat blog disini"
          ></Textarea>
        </Label>
      </div>
      <div className="flex flex-1 flex-col justify-start items-stretch gap-2">
        <div className="flex-1">
          <CreateBlogWYSIWYG setBody={setBody} />
        </div>
        <Button type="submit">Buat Blog</Button>
      </div>
    </form>
  );
}

"use client";

import { useAuthContext } from "@/context/auth-context";
import CustomLoading from "@/app/_components/loading";
import { redirect } from "next/navigation";
import { use, useEffect, useState } from "react";
import { fetchBlog } from "@/lib/api/blogs";
import { Blog, BlogCategory } from "@/lib/types";
import BlogEditForm from "@/app/(root)/blogs/[slug]/edit/_components/edit-form";
import { fetchCategories } from "@/lib/api/blog-categories";

export default function UpdateBlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [blog, setBlog] = useState<Blog>();
  const [availableBlogCategories, setAvailableBlogCategories] =
    useState<BlogCategory[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { authenticated, role, loading, user } = useAuthContext();

  useEffect(() => {
    fetchBlog({ slug, setBlog, setLoading: setIsLoading });
    fetchCategories({ setLoading: setIsLoading, setAvailableBlogCategories });
  }, []);

  if (loading || isLoading) return <CustomLoading />;
  if (!authenticated) return redirect("/login");
  if (role === "USER") return redirect("/blog");

  return (
    <main className="flex justify-center py-4 px-4 items-center">
      <div className="w-full max-w-6xl flex justify-center flex-col items-stretch">
        <BlogEditForm
          availableCategories={availableBlogCategories}
          blog={blog}
          token={user?.token}
          user_role={user?.role}
          user_stt={user?.stt_membership?.stt_slug}
          setLoading={setIsLoading}
        />
      </div>
    </main>
  );
}

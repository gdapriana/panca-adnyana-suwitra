import { Blog } from "@/lib/types";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Calendar, Layers2 } from "lucide-react";
import moment from "moment";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthContext } from "@/context/auth-context";
import CustomLoading from "@/app/_components/loading";
import { BsArrowRight, BsGear, BsTrash } from "react-icons/bs";
import AlertDeleteBlog from "@/app/(root)/stt/[slug]/_components/alert-delete-blog";
import { useState } from "react";
import Empty from "@/app/_components/empty";
import { TbDatabaseOff } from "react-icons/tb";

export default function PageBlog({
  blogs,
  stt_slug,
}: {
  blogs: Blog[];
  stt_slug: string;
}) {
  const { authenticated, loading, role, user } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  if (loading || isLoading) return <CustomLoading />;
  return (
    <main className="flex gap-8 justify-center items-stretch flex-col">
      {blogs.length === 0 && (
        <Empty Icon={TbDatabaseOff}  message="Tidak ada blog"/>
      )}
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {blogs.map((blog: Blog, index: number) => {
          return (
            <article
              className="flex p-3 rounded-3xl border justify-start gap-4 flex-col items-stretch"
              key={index}
            >
              {blog.cover_url ? (
                <Image
                  alt={blog.name}
                  src={blog.cover_url}
                  width={1920}
                  height={1080}
                  className="aspect-video object-cover rounded-xl"
                />
              ) : (
                <div className="bg-secondary rounded-lg w-full aspect-video flex justify-center items-center">
                  <span className="text-muted-foreground">
                    Tidak ada gambar
                  </span>
                </div>
              )}
              <div className="flex flex-col gap-2 justify-start items-start">
                <h3 className="font-bold">{blog.name}</h3>
                <p className="text-muted-foreground line-clamp-3 text-sm">
                  {blog.description}
                </p>
                <Tooltip>
                  <TooltipTrigger className="flex mt-2 font-semibold text-sm justify-center items-center gap-1">
                    <Calendar size={14} />
                    {moment(blog.created_at).format("DD MMM YYYY")}
                  </TooltipTrigger>
                  <TooltipContent>Tanggal Upload</TooltipContent>
                </Tooltip>
              </div>

              <div className="flex justify-end gap-2 flex-wrap mt-auto items-center">
                {authenticated &&
                  (role === "ADMIN" || role === "SUPERADMIN") &&
                  user?.stt_membership?.stt_slug === stt_slug && (
                    <>
                      <Tooltip>
                        <TooltipTrigger>
                          <AlertDeleteBlog
                            role={role}
                            name={blog.name}
                            setLoading={setIsLoading}
                            token={user.token}
                            slug={blog.slug}
                          />
                        </TooltipTrigger>
                        <TooltipContent>Hapus Blog</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger>
                          <Button asChild variant="secondary">
                            <Link href={`/blogs/${blog.slug}/edit`}>
                              <BsGear />
                            </Link>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit blog</TooltipContent>
                      </Tooltip>
                    </>
                  )}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="secondary" asChild>
                      <Link href={`/categories/${blog.category?.slug}`}>
                        <Layers2 />
                        {blog.category?.name}
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Kategori blog</TooltipContent>
                </Tooltip>
                <Button size="sm" asChild>
                  <Link href={`/blogs/${blog.slug}`}>
                    <BsArrowRight />
                  </Link>
                </Button>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}

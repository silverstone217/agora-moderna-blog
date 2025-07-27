import { getPostBySlugWithUser } from "@/actions/blogs";
import { redirect } from "next/navigation";
import React from "react";
import ModifyBlog from "./ModifyBlog";

interface Props {
  params: Promise<{ slug: string }>;
}

async function page({ params }: Props) {
  const { slug } = await params;

  if (!slug) {
    redirect("/");
  }

  const blog = await getPostBySlugWithUser(slug);

  if (!blog) {
    redirect("/mes-blogs");
  }

  return (
    <div>
      <ModifyBlog blog={blog} />
    </div>
  );
}

export default page;

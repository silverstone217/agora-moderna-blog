import { redirect } from "next/navigation";
import React from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

async function BlogPage({ params }: Props) {
  const { slug } = await params;

  if (!slug) {
    redirect("/");
  }

  return <div>BlogPage - {slug}</div>;
}

export default BlogPage;

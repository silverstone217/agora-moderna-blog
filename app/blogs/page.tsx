import { getAllPost } from "@/actions/blogs";
// import MarkdownRenderer from "@/components/blogs/markdown/MarkdownRenderer";
import React, { Suspense } from "react";
import MainBlogs from "./MainBlogs";
import Footer from "@/components/(others)/Footer";

async function BlogPage() {
  const blogs = await getAllPost();

  if (blogs.length < 1) {
    return (
      <div className="min-h-96 w-full lex items-center justify-center flex-col text-2xl text-gray-500">
        <p>Aucun blog disponible</p>
      </div>
    );
  }

  return (
    <div className="p-4 min-h-screen flex flex-col">
      <Suspense fallback={<div>Chargement...</div>}>
        <MainBlogs blogs={blogs} />
      </Suspense>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default BlogPage;

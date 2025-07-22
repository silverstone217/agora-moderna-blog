import { getAllPost } from "@/actions/blogs";
// import MarkdownRenderer from "@/components/blogs/markdown/MarkdownRenderer";
import React, { Suspense } from "react";
import MainBlogs from "./MainBlogs";
import Footer from "@/components/(others)/Footer";

async function BlogPage() {
  const blogs = await getAllPost();

  return (
    <>
      <div className=" py-4 min-h-screen flex flex-col">
        <Suspense fallback={<div>Chargement...</div>}>
          <MainBlogs blogs={blogs} />
        </Suspense>
      </div>
      <Footer />
    </>
  );
}

export default BlogPage;

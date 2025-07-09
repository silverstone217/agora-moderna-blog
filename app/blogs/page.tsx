import { getAllPost } from "@/actions/blogs";
import MarkdownRenderer from "@/components/blogs/markdown/MarkdownRenderer";
import React, { Suspense } from "react";

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
    <Suspense>
      <div className="max-w-6xl mx-auto p-4 pt-16 grid gap-16">
        {blogs.map((blog) => (
          <div key={blog.id} className="py-4 border-b-2 flex flex-col gap-2">
            <h2 className="text-2xl font-bold capitalize">{blog.title}</h2>
            <p>{blog.category}</p>

            {/* content */}
            <MarkdownRenderer content={blog.content} />
          </div>
        ))}
      </div>
    </Suspense>
  );
}

export default BlogPage;

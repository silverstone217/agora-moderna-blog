import { getAllPost } from "@/actions/blogs";
import React from "react";
import { columnsBlogs } from "./columns";
import { DataTableBlogs } from "./data-table";

async function BlogsPage() {
  const blogs = await getAllPost();

  return (
    <div className="container mx-auto py-10">
      <DataTableBlogs columns={columnsBlogs} data={blogs} />
    </div>
  );
}

export default BlogsPage;

"use client";
import { Blog } from "@/lib/generated/prisma";
import React from "react";
import { playfairDisplay } from "@/utils/fonts";

import Blogcard from "../blogs/Blogcard";

type Props = {
  blogs: Blog[];
};

const NewestBlog = ({ blogs }: Props) => {
  return (
    <section className="w-full px-2 md:px-6 xl:px-20 py-4">
      <h2
        className={
          "text-3xl md:text-4xl font-bold mb-8 tracking-tight " +
          playfairDisplay.className
        }
      >
        Nouveaux articles
      </h2>
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => {
          return <Blogcard key={blog.id} blog={blog} />;
        })}
      </div>
    </section>
  );
};

export default NewestBlog;

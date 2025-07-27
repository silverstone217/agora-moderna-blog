"use client";

import React from "react";
import { Blog, User } from "@/lib/generated/prisma";
import Image from "next/image";
import MarkdownRenderer from "@/components/blogs/markdown/MarkdownRenderer";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import UserAvatar from "@/components/UserAvatar";
import { capitalizeFirstLetter, returnDataByValue } from "@/utils/functions";
import { playfairDisplay, unifrakturCook } from "@/utils/fonts";
import { ReadingTime } from "@/components/blogs/ReadingTime";
import { CategoriesData } from "@/utils/data";

type Props = {
  blogUser: Blog & {
    user: User;
  };
};

const MainBlog = ({ blogUser }: Props) => {
  const { user, ...blog } = blogUser;
  const tags = blog.tags.split(",").map((tag) => tag.trim());

  return (
    <article
      className="max-w-4xl mx-auto px-4 py-8 sm:py-12 prose prose-neutral 
    dark:prose-invert prose-headings:font-extrabold prose-headings:text-3xl 
    prose-p:text-base prose-p:leading-relaxed"
    >
      {/* Title */}
      <h1
        className={`mb-2 font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-tight
      ${unifrakturCook.className}
        `}
      >
        {capitalizeFirstLetter(blog.title)}
      </h1>

      {/* description */}
      <p className="mb-6 text-sm text-gray-500">
        {capitalizeFirstLetter(blog.description)}
      </p>

      {/* Image */}
      {blog.image && (
        <div
          className="relative w-full h-64 sm:h-96 rounded-lg overflow-hidden mb-8 
        shadow-lg "
        >
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Meta info */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 
      text-sm text-muted-foreground flex-wrap`}
      >
        <div className="flex items-center gap-3 mb-3 sm:mb-0">
          {user && <UserAvatar image={user.image} name={user.name} />}
          <div>
            <p className="font-semibold">{user.name ?? "Auteur inconnu"}</p>
            <time
              dateTime={blog.createdAt.toISOString()}
              className="text-xs text-gray-500 dark:text-gray-400"
            >
              {format(new Date(blog.createdAt), "d MMMM yyyy", { locale: fr })}
            </time>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="uppercase text-xs font-semibold">
            {returnDataByValue(CategoriesData, blog.category).label}
          </Badge>
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* time to read */}
      <div className="mb-4">
        <ReadingTime content={blog.content} />
      </div>

      {/* Contenu markdown via MarkdownRenderer */}
      <MarkdownRenderer
        content={blog.content}
        className={`${playfairDisplay.className}`}
      />
    </article>
  );
};

export default MainBlog;

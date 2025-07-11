"use client";
import { Blog } from "@/lib/generated/prisma";
import { CategoriesData } from "@/utils/data";
import { capitalizeFirstLetter, returnDataByValue } from "@/utils/functions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { unifrakturCook } from "@/utils/fonts";
import { Eye, Star } from "lucide-react";

type Props = {
  blogs: Blog[];
};

const LatestBlogSection = ({ blogs }: Props) => {
  return (
    <section className="w-full grid grid-cols-1 md:grid-cols-4 gap-6 px-2 md:px-6 py-10">
      {/* Nouveautés */}
      <div className="col-span-1 md:col-span-3 flex flex-col gap-4">
        <div className="flex items-center gap-2 px-2">
          <Star className="w-6 h-6 text-primary" />
          <h3 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
            Nouveautés
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} />
          ))}
        </div>
      </div>
      {/* Populaires */}
      <aside className="col-span-1 hidden md:flex flex-col gap-4">
        <div className="flex items-center gap-2 px-2">
          <Eye className="w-6 h-6 text-primary" />
          <h3 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
            Populaires
          </h3>
        </div>
        <div className="w-full flex flex-col gap-4">
          {blogs.map((blog, index) => (
            <Link
              key={index}
              href={`/blogs/${blog.slug}`}
              className="flex items-center gap-3 group rounded-lg transition hover:bg-muted/50 p-2"
            >
              <Image
                src={blog.image}
                alt={blog.title}
                width={56}
                height={56}
                className="rounded-md object-cover size-14 shadow-md group-hover:scale-105 transition"
              />
              <span
                className={`flex-1 text-base font-semibold line-clamp-2 group-hover:text-primary transition
                ${unifrakturCook.className}`}
              >
                {capitalizeFirstLetter(blog.title)}
              </span>
            </Link>
          ))}
        </div>
      </aside>
    </section>
  );
};

export default LatestBlogSection;

const BlogCard = ({ blog }: { blog: Blog }) => {
  const itemCategory = returnDataByValue(CategoriesData, blog.category);
  const {
    label: LabelCategory,
    icon: IconCategory,
    color: ColorCategory,
  } = itemCategory;

  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="relative flex flex-col rounded-xl shadow-lg bg-card dark:bg-card/80 group 
      overflow-hidden transition hover:shadow-2xl"
    >
      <div className="relative w-full h-48">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute top-2 left-2 flex items-center gap-2 z-10">
          {IconCategory ? (
            <IconCategory className="w-5 h-5" color={ColorCategory} />
          ) : (
            <Star className="w-5 h-5 text-primary" />
          )}
          <span className="text-xs font-medium bg-black/60 text-white px-2 py-0.5 rounded">
            {capitalizeFirstLetter(LabelCategory)}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h3
          className={`text-xl font-bold line-clamp-2 group-hover:text-primary transition
             ${unifrakturCook.className}`}
        >
          {capitalizeFirstLetter(blog.title)}
        </h3>
        <div className="flex flex-wrap gap-2">
          {blog.tags
            .split(",")
            .slice(0, 3)
            .map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {capitalizeFirstLetter(tag.trim())}
              </Badge>
            ))}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="mt-2 self-start px-2 py-1 text-xs rounded hover:bg-primary/10 transition"
        >
          {` Lire l'article`}
        </Button>
      </div>
    </Link>
  );
};

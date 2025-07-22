"use client";
import { Blog } from "@/lib/generated/prisma";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { capitalizeFirstLetter, returnDataByValue } from "@/utils/functions";
import { playfairDisplay, unifrakturCook } from "@/utils/fonts";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { Bookmark, MoveRight } from "lucide-react";
import Image from "next/image";
import { CategoriesData } from "@/utils/data";

interface BlogcardProps {
  blog: Blog;
  key: number | string;
}

const Blogcard = ({ blog }: BlogcardProps) => {
  const itemCategory = returnDataByValue(CategoriesData, blog.category);
  const { label, icon: IconCategory, color: ColorCategory } = itemCategory;
  return (
    <Card
      key={blog.id}
      className="flex flex-col h-full group shadow-none border 
              border-neutral-100 dark:border-neutral-800
                hover:shadow-xl transition-shadow duration-300 rounded-2xl
              bg-neutral-200/80 dark:bg-neutral-900/80 backdrop-blur-sm"
    >
      <div className="overflow-hidden rounded-t-2xl relative h-48 -mt-6">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          priority
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
        {IconCategory && (
          <span
            className="absolute top-4 left-4 flex items-center px-3 py-1
                      bg-white/80 dark:bg-neutral-800/80
                        rounded-full shadow text-xs gap-2
                        text-black dark:text-white font-semibold"
          >
            <IconCategory size={18} color={ColorCategory} />
            <span>{label}</span>
          </span>
        )}
      </div>
      <CardHeader className="pb-2">
        <CardTitle
          className={
            "text-xl md:text-2xl font-black mb-1 line-clamp-2 " +
            unifrakturCook.className
          }
        >
          {capitalizeFirstLetter(blog.title)}
        </CardTitle>
        <CardDescription
          className={
            "text-neutral-600 dark:text-neutral-300 line-clamp-3 mb-2 " +
            playfairDisplay.className
          }
        >
          {blog.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-end pb-2">
        <div className="flex flex-wrap gap-2 mt-2">
          {blog.tags
            .split(",")
            .slice(0, 3)
            .map((tag, i) => (
              <Badge
                key={i}
                variant={"outline"}
                className="border-gray-300/80 dark:border-gray-600/80 line-clamp-1"
              >
                #{tag.trim()}
              </Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex items-center w-full justify-between">
        <Link href={`/blogs/${blog.slug}`} passHref>
          <Button
            className="w-full justify-between px-5 rounded-xl mt-2 font-medium
                       bg-black/90 text-white hover:bg-black
                        dark:bg-white/10 dark:text-white dark:hover:bg-white/20 transition group"
          >
            <span>Lire plus</span>
            <MoveRight className="ml-2 size-5 group-hover:translate-x-1 transition-all duration-300" />
          </Button>
        </Link>

        {/* save */}
        <Button
          className=" justify-between px-5 rounded-xl mt-2 font-medium
                      bg-black/90 text-white hover:bg-black
                      dark:bg-white/10 dark:text-white dark:hover:bg-white/20 transition 
                     
                      "
        >
          <span>Bookmark</span>
          <Bookmark
            className="ml-2 size-5  transition-all duration-300 hover:fill-orange-600
           hover:text-orange-600"
          />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Blogcard;

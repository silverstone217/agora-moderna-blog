import { Blog } from "@/lib/generated/prisma";
import { CategoriesData } from "@/utils/data";
import { unifrakturCook } from "@/utils/fonts";
import { capitalizeFirstLetter, returnDataByValue } from "@/utils/functions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { CalendarDays, ArrowRight } from "lucide-react";

type Props = {
  category: string;
  blogs: Blog[];
};

const CategoryBlogSection = ({ category, blogs }: Props) => {
  const categoryData = returnDataByValue(CategoriesData, category);
  const filteredBlogs = blogs.filter((blog) =>
    blog.category.includes(category)
  );

  return (
    <section className="w-full flex flex-col gap-8 px-2 md:px-8 py-10">
      <div className="flex items-center gap-3">
        {categoryData.icon && (
          <categoryData.icon className="w-7 h-7 text-primary shrink-0" />
        )}
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          {capitalizeFirstLetter(categoryData.label)}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredBlogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blogs/${blog.slug}`}
            className="group flex flex-row gap-6 rounded-xl bg-card dark:bg-card/80 shadow-lg 
            overflow-hidden transition hover:shadow-2xl"
          >
            {/* Image */}
            <div className="relative flex-shrink-0 w-28 h-44 md:w-44 md:h-56">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover rounded-lg transition-transform duration-500 group-hover:scale-105 h-full"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            {/* Info */}
            <div className="flex flex-col justify-between py-3 pr-3 flex-1">
              <div className="flex flex-col gap-2">
                <h3
                  className={`text-2xl font-bold line-clamp-3 group-hover:text-primary transition 
                    ${unifrakturCook.className}`}
                >
                  {capitalizeFirstLetter(blog.title)}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {blog.tags
                    .split(",")
                    .slice(0, 3)
                    .map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs"
                      >
                        {capitalizeFirstLetter(tag.trim())}
                      </Badge>
                    ))}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 text-gray-500 dark:text-gray-400 text-xs">
                <CalendarDays className="w-4 h-4" />
                <span>
                  {new Date(blog.createdAt).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-4 px-2 py-1 text-xs rounded flex items-center gap-1 hover:bg-primary/10 transition"
              >
                {`Lire l'article`} <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryBlogSection;

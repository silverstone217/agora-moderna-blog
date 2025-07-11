import { getPostBySlugWithUser } from "@/actions/blogs";
import Footer from "@/components/(others)/Footer";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import MainBlog from "./MainBlog";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { unifrakturCook } from "@/utils/fonts";
import { ChevronRight } from "lucide-react";
import { ThemeSwitch } from "@/components/ThemeSwitch";

interface Props {
  params: Promise<{ slug: string }>;
}

async function BlogPage({ params }: Props) {
  const { slug } = await params;

  if (!slug) {
    redirect("/");
  }

  const blog = await getPostBySlugWithUser(slug);

  if (!blog) {
    redirect("/blogs");
  }

  return (
    <div className="p-4 min-h-screen flex flex-col">
      {/* Header avec breadcrumb */}
      <div className="max-w-4xl mx-auto px-4 pt-10 flex items-center justify-between w-full flex-wrap gap-2">
        {/* nav */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400"
        >
          <Link
            href="/"
            className={cn(
              "text-base font-semibold hover:text-gray-900 dark:hover:text-gray-100 transition",
              unifrakturCook.className
            )}
          >
            Accueil
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link
            href="/blogs"
            className={cn(
              "text-base font-semibold hover:text-gray-900 dark:hover:text-gray-100 transition",
              unifrakturCook.className
            )}
          >
            Blogs
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Suspense fallback={<div>...</div>}>
            <span
              className={cn(
                "text-base font-semibold text-gray-500 dark:text-gray-300",
                unifrakturCook.className,
                "  sm:max-w-56 lg:max-w-64 max-w-36 truncate"
              )}
            >
              {blog.title}
            </span>
          </Suspense>
        </nav>

        {/* Theme */}
        <div className="ml-auto">
          <ThemeSwitch />
        </div>
      </div>

      <Suspense fallback={<div>Chargement...</div>}>
        <MainBlog blogUser={blog} />
      </Suspense>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}

export default BlogPage;

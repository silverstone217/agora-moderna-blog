"use client";

import { Blog } from "@/lib/generated/prisma";
import {
  Bookmark,
  ChevronRight,
  Filter,
  Search,
  X,
  Loader2,
} from "lucide-react";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { capitalizeFirstLetter, returnDataByValue } from "@/utils/functions";
import { CategoriesData } from "@/utils/data";
import { playfairDisplay, unifrakturCook } from "@/utils/fonts";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import SelectCategory from "@/components/blogs/SelectCategory";
import { cn } from "@/lib/utils";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { useSearchParams } from "next/navigation";

type Props = {
  blogs: Blog[];
};

const MainBlogs = ({ blogs }: Props) => {
  const searchParams = useSearchParams();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    // Récupérer la valeur du paramètre "search"
    const search = searchParams.get("search") ?? "";
    setSearchText(search);
  }, [searchParams]);

  const filteredBlogs = useMemo(() => {
    const search = searchText.toLocaleLowerCase();
    return (
      blogs
        .filter((blog) => {
          const titleMatch = blog.title.toLocaleLowerCase().includes(search);
          const tagsMatch = blog.tags
            .replace(/,/g, " ")
            .toLocaleLowerCase()
            .includes(search.replace(/#/g, ""));
          const categoryMatch = blog.category.includes(search);
          return titleMatch || tagsMatch || categoryMatch;
        })
        .filter((blog) => (category ? blog.category === category : true)) ?? []
    );
  }, [searchText, blogs, category]);

  return (
    <div className="max-w-5xl mx-auto p-6 w-full mt-8 space-y-8">
      {/* Header avec breadcrumb */}
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
        <span
          className={cn(
            "text-base font-semibold text-gray-500 dark:text-gray-300",
            unifrakturCook.className
          )}
        >
          Blogs
        </span>
      </nav>

      {/* Filtres */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          Tous les Blogs
        </h1>

        <FilterPopover
          searchText={searchText}
          setSearchText={setSearchText}
          category={category}
          setCategory={setCategory}
        />
      </div>

      {/* Liste des blogs */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <Suspense
              key={blog.id}
              fallback={
                <div className="flex justify-center items-center p-10">
                  <Loader2 className="animate-spin w-6 h-6 text-primary" />
                </div>
              }
            >
              <BlogCard blog={blog} />
            </Suspense>
          ))
        ) : (
          <p className="col-span-full text-center text-lg text-gray-500 dark:text-gray-400 mt-12">
            Aucun blog trouvé !
          </p>
        )}
      </div>

      {/* button abs */}
      <ScrollToTopButton />
    </div>
  );
};

export default MainBlogs;

// BlogCard améliorée
const BlogCard = ({ blog }: { blog: Blog }) => {
  const itemCategory = returnDataByValue(CategoriesData, blog.category);
  const { label, icon: IconCategory, color: ColorCategory } = itemCategory;

  return (
    <Card
      className="group cursor-pointer transition-shadow hover:shadow-lg 
     duration-300 ease-in-out"
    >
      <Link href={`/blogs/${blog.slug}`} className="flex flex-col h-full">
        <div className="relative h-48 w-full rounded-t-lg overflow-hidden shadow-sm -mt-6">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            priority
          />
        </div>

        <CardContent className="flex flex-col flex-grow p-4">
          <h2
            className={`text-xl font-semibold line-clamp-3 mb-2 ${playfairDisplay.className}`}
          >
            {capitalizeFirstLetter(blog.title)}
          </h2>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            {IconCategory && (
              <IconCategory
                className="w-5 h-5 flex-shrink-0"
                color={ColorCategory}
                aria-hidden="true"
              />
            )}
            <span className={`${playfairDisplay.className}`}>{label}</span>
          </div>
        </CardContent>

        <CardFooter className="flex gap-4 p-4 pt-0 mt-auto">
          <Button
            variant="outline"
            className="flex-grow justify-center gap-2"
            aria-label={`Lire l'article ${blog.title}`}
          >
            Lire <ChevronRight />
          </Button>

          <Button
            variant="secondary"
            className="flex-grow justify-center gap-2"
            aria-label={`Enregistrer l'article ${blog.title}`}
          >
            Save <Bookmark />
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

// Popover pour filtres (responsive + accessible)
type FilterType = {
  category: string;
  searchText: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
};

const FilterPopover = ({
  category,
  searchText,
  setCategory,
  setSearchText,
}: FilterType) => {
  const cleanFilter = () => {
    setCategory("");
    setSearchText("");
  };

  const isButtonCleanFilterDisabled = useMemo(
    () => category === "" && searchText === "",
    [category, searchText]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          aria-label="Ouvrir les filtres"
        >
          <Filter className="w-5 h-5" />
          <span className="hidden sm:inline">Filtres</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-72 p-6" align="end">
        <h3 className="text-lg font-semibold mb-4">Rechercher ou filtrer</h3>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="search"
              placeholder="Rechercher un blog ou #tag..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="pl-10"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              aria-label="Recherche de blogs"
            />
          </div>

          <div>
            <label
              htmlFor="category-select"
              className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
            >
              Catégorie
            </label>
            <SelectCategory
              category={category}
              setCategory={setCategory}
              disabled={false}
              //   id="category-select"
            />
          </div>

          <Separator />

          <Button
            variant="ghost"
            className="w-full"
            onClick={cleanFilter}
            disabled={isButtonCleanFilterDisabled}
          >
            <X className="w-5 h-5 mr-2" />
            Réinitialiser les filtres
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

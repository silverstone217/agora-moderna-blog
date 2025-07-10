"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { playfairDisplay, unifrakturCook } from "@/utils/fonts";
import { cn } from "@/lib/utils";
import { FaArrowRight, FaXTwitter } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa";
import { Blog } from "@/lib/generated/prisma";
import { capitalizeFirstLetter, returnDataByValue } from "@/utils/functions";
import { CategoriesData } from "@/utils/data";
import { Button } from "../ui/button";

type Props = {
  blogs: Blog[];
};

const HeroSection = ({ blogs }: Props) => {
  const [index, setIndex] = useState(0);

  const slicedBlod = useMemo(() => blogs.slice(0, 3), [blogs]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slicedBlod.length);
    }, 25000);
    return () => clearInterval(interval);
  }, [slicedBlod.length]);

  const currentBlog = useMemo(() => slicedBlod[index], [index, slicedBlod]);
  const itemCategory = useMemo(
    () => returnDataByValue(CategoriesData, currentBlog.category),
    [currentBlog.category]
  );

  const { label, icon: IconCategory, color: ColorCategory } = itemCategory;

  return (
    <section
      className="flex flex-col pt-16 min-h-[calc(100vh-64px)] pb-6
    px-4 lg:px-6  max-w-7xl mx-auto w-full gap-10 lg:justify-center"
    >
      {/* top */}
      <div className="flex flex-col lg:flex-row items-center w-full gap-8">
        {/* gauche */}
        <div className="flex flex-col items-center lg:items-start gap-4 flex-shrink-0">
          <h2
            className={cn(
              "text-5xl lg:text-7xl xl:text-9xl font-bold  drop-shadow-md",
              unifrakturCook.className
            )}
          >
            Agora Moderna
          </h2>
          <p className="max-w-xs text-center lg:text-left text-amber-500 font-semibold text-lg">
            Meilleure plateforme pour lire des meilleurs contenus
          </p>
        </div>

        {/* right */}
        <div className="ml-auto mt-4 lg:mt-0 flex items-center gap-4">
          <Link
            href="#"
            className="
      p-3 rounded-full bg-amber-600 text-white border border-amber-400
      shadow-[10px_15px_15px_-5px_rgba(184,134,11,0.9)]
      transition-transform duration-300 ease-in-out
      hover:translate-x-1 hover:translate-y-1 hover:shadow-[15px_20px_20px_-7px_rgba(184,134,11,1)]
      focus:outline-none focus:ring-4 focus:ring-amber-400
      flex items-center justify-center
    "
            aria-label="Lien Twitter"
          >
            <FaXTwitter size={20} />
          </Link>

          <Link
            href="#"
            className="
      p-3 rounded-full bg-amber-600 text-green-400 border border-amber-400
      shadow-[10px_15px_15px_-5px_rgba(21,128,61,0.9)]
      transition-transform duration-300 ease-in-out
      hover:translate-x-1 hover:translate-y-1 hover:shadow-[15px_20px_20px_-7px_rgba(21,128,61,1)]
      focus:outline-none focus:ring-4 focus:ring-green-400
      flex items-center justify-center
    "
            aria-label="Lien téléphone"
          >
            <FaPhone size={20} />
          </Link>
        </div>
      </div>

      {/* bottom */}
      {slicedBlod.length > 0 && (
        <div
          className="flex items-center justify-between gap-4 p-6 w-full
      bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
      dark:from-gray-100 dark:via-gray-200 dark:to-gray-100
      overflow-hidden rounded-lg shadow-lg
      text-gray-100 dark:text-gray-800 lg:max-h-[calc(100vh-64px-6rem)] 
      "
        >
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8">
            {/* texte */}
            <div className="flex flex-col gap-3 lg:w-72">
              <p className="text-sm text-gray-400">
                {currentBlog.createdAt.toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <h2 className={`${unifrakturCook.className} text-4xl font-bold `}>
                {capitalizeFirstLetter(currentBlog.title)}
              </h2>

              <div className="flex items-center gap-2 text-sm text-amber-600">
                {IconCategory && (
                  <IconCategory
                    className="w-5 h-5 flex-shrink-0"
                    color={ColorCategory}
                    aria-hidden="true"
                  />
                )}
                <span className={`${playfairDisplay.className}`}>{label}</span>
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {currentBlog.tags
                  .split(",")
                  .slice(0, 4)
                  .map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-sm font-medium px-3 py-1 rounded-full bg-amber-200 text-amber-900"
                    >
                      {tag}
                    </span>
                  ))}
              </div>

              {/* read */}
              <Link href={"/blogs/" + currentBlog.slug}>
                <Button className="mt-6">
                  <span>Lire</span>
                  <FaArrowRight size={20} />
                </Button>
              </Link>
            </div>

            {/* image */}
            <Image
              src={currentBlog.image}
              alt={currentBlog.title + " image"}
              width={800}
              height={800}
              className="object-cover w-full lg:flex-1 h-54 md:h-72 lg:h-96 rounded-md shadow-md"
              priority={index === 0}
            />

            {/* nav */}
            <div className="flex lg:flex-col gap-3">
              {slicedBlod.map((_, idx) => (
                <button
                  key={idx}
                  className={`px-4 py-1 lg:px-1 lg:py-4 rounded-full transition-colors
              ${
                idx === index
                  ? "bg-amber-600 text-white"
                  : "bg-gray-300 dark:bg-gray-700"
              }
            `}
                  onClick={() => setIndex(idx)}
                  aria-label={`Voir article ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;

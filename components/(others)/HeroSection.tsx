"use client";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { playfairDisplay, unifrakturCook } from "@/utils/fonts";
import { ArrowBigRight, Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { isEmpyString } from "@/utils/functions";

const HeroSection = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (isEmpyString(searchText)) {
      return;
    }

    console.log("Search clicked");
    router.push("/blogs?search=" + searchText);
  };

  return (
    <section
      className=" min-h-[50vh] flex p-4 pt-24 pb-8
    flex-col items-center justify-center text-center "
    >
      <Badge className="font-medium" variant={"outline"}>
        Blog
      </Badge>
      <h2
        className={
          "text-4xl font-bold max-w-xl mx-auto my-4 " + unifrakturCook.className
        }
      >
        Des nouveaux contenus accessibles facilement.
      </h2>
      <p
        className={
          "text-sm text-gray-700 dark:text-gray-400 max-w-2xl mx-auto " +
          playfairDisplay.className
        }
      >
        Découvrez les dernières actualités et les derniers articles publiés sur
        la platefome, et découvrez comment vous pouvez contribuer à la
        communauté.
      </p>

      <div className=" w-full max-w-lg mx-auto flex items-center justify-center gap-4 mt-6 ">
        <div className="relative text-xs font-medium flex-1">
          <Search className="absolute top-1/2 left-2 transform -translate-y-1/2 opacity-75 size-5" />
          <Input
            className="pl-10 w-full text-sm font-medium"
            type="search"
            placeholder="ce qui vous fait envie..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
          />
        </div>
        <Button onClick={handleSearch}>
          <ArrowBigRight className="shrink-0 size-5" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;

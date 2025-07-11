"use client";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { cn } from "@/lib/utils";
import { unifrakturCook } from "@/utils/fonts";
import { HomeLinksPage } from "@/utils/links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useUser } from "@/hooks/getUser";
import UserAvatar from "../UserAvatar";
import SmallScreenSheetNav from "./SmallScreenSheetNav";
import { SignWithGoogle } from "../userAuthActions";

const Header = () => {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <div
      className="fixed h-16 flex items-center border-b w-full z-50
     transition-all duration-300 ease-in-out backdrop-blur-2xl
    "
    >
      <div className="px-4  w-full flex h-full items-center justify-between mx-auto max-w-7xl">
        {/* link home logo */}
        <Link
          href={"/"}
          className={`${unifrakturCook.className}
        text-lg font-bold shrink-0
        `}
        >
          Agora Moderna
        </Link>

        <div
          className="lg:flex hidden items-center gap-4 flex-1 ml-10
        transition-all duration-300 ease-in-out
        "
        >
          {/* links */}
          <BigScreenNavLinks pathname={pathname} />
        </div>

        {/* other part */}
        <div className="flex items-center gap-4 transition-all duration-300 ease-in-out">
          {/* theme */}
          <ThemeSwitch />

          {/* sign in  && profile user*/}
          <div className="hidden lg:block">
            {user ? (
              <Link href={"/overview"} className="lg:block hidden">
                <UserAvatar name={user.name} image={user.image} />
              </Link>
            ) : (
              <div className="px-2 w-full">
                <SignWithGoogle />
              </div>
            )}
          </div>

          {/* menu */}
          <SmallScreenSheetNav />
        </div>
      </div>
    </div>
  );
};

export default Header;

// Big screen nav
const BigScreenNavLinks = ({ pathname }: { pathname: string }) => {
  return (
    <nav className="lg:flex hidden items-center gap-4">
      {HomeLinksPage.map((link, idx) => {
        const isPathNameSame = pathname === link.value;

        return (
          <Link
            href={link.value}
            key={idx}
            className={cn(
              "text-sm font-medium hover:underline hover:text-foreground ",
              isPathNameSame ? "text-gray-600" : "",
              "transition-all ease-in-out duration-500"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
};

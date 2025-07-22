"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignOutButton, SignWithGoogle } from "@/components/userAuthActions";
import UserAvatar from "@/components/UserAvatar";
import { useUser } from "@/hooks/getUser";
import { cn } from "@/lib/utils";
import { AdminLinksPage } from "@/utils/links";
import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const AsideBigScreen = () => {
  const pathname = usePathname();
  const { user } = useUser();
  return (
    <aside
      className="lg:flex hidden z-40 fixed  w-64 border-r  h-[calc(100vh-64px)]
    transition-all duration-300 ease-in-out backdrop-blur-2xl
    "
    >
      <div className="py-4 w-full h-full overflow-x-hidden overflow-y-auto flex flex-col gap-6">
        {/* search */}
        <div className="flex items-center gap-4 w-full px-2">
          <div className="relative text-xs font-medium">
            <Search className="absolute top-1/2 left-2 transform -translate-y-1/2 opacity-75 size-5" />
            <Input className="pl-10" type="search" placeholder="chercher..." />
          </div>
          {/* button */}
          <Button>
            <ArrowRight />
          </Button>
        </div>
        {/* nav link */}
        <Separator />
        <nav className="flex flex-col gap-4 flex-1 py-4 px-2">
          {AdminLinksPage.map((link, idx) => {
            const isPathnameSame = pathname.includes(link.value);
            return (
              <Link
                href={link.value}
                key={idx}
                className="text-sm  flex items-center gap-4 p-2 group
                transition-all duration-300 ease-in-out
                "
              >
                <Button
                  className={cn(
                    "shrink-0 hover:cursor-pointer",

                    "group-hover:bg-gray-600 hover:bg-gray-600 group-hover:text-white"
                  )}
                  size={"icon"}
                  variant={isPathnameSame ? "default" : "secondary"}
                >
                  <link.icon className="size-5" />
                </Button>

                <span className="opacity-75 text-sm font-semibold">
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>
        <Separator />
        {/* avatar and logout */}
        <div className="flex flex-col gap-4  py-4 px-2 w-full">
          {/* profil */}
          {user && (
            <Link
              href={"#"}
              className="px-2 flex items-center gap-4 text-sm mb-1"
            >
              <UserAvatar name={user.name} image={user.image} />
              <div>
                <p className="font-medium capitalize">{user.name}</p>
                <p className="text-xs underline text-gray-500">{user.email}</p>
              </div>
            </Link>
          )}
          {/* actions */}
          {user ? (
            <div className="px-2 w-full">
              <SignOutButton />
            </div>
          ) : (
            <div className="px-2 w-full">
              <SignWithGoogle />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AsideBigScreen;

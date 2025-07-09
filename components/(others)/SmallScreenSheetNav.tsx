"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { unifrakturCook } from "@/utils/fonts";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@/hooks/getUser";
import { cn } from "@/lib/utils";
import Link from "next/link";
import UserAvatar from "@/components/UserAvatar";
import { SignOutButton, SignWithGoogle } from "@/components/userAuthActions";
import { HomeLinksPage } from "@/utils/links";

const SmallScreenSheetNav = () => {
  const pathname = usePathname();
  const { user } = useUser();
  return (
    <Sheet>
      <SheetTrigger asChild className="lg:hidden">
        <Button type="button" size={"icon"} variant={"default"}>
          <AlignJustify />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[95%] overflow-x-hidden overflow-y-auto h-screen gap-4">
        <SheetHeader>
          <SheetTitle
            className={`${unifrakturCook.className} text-2xl font-bold`}
          >
            Agora Moderna
          </SheetTitle>
          <SheetDescription>Profiter des meilleurs blogs!</SheetDescription>
        </SheetHeader>
        <Separator />
        {/* content */}
        <nav className="flex flex-col gap-4 flex-1 py-4 px-2">
          {HomeLinksPage.map((link, idx) => {
            const isPathnameSame = pathname === link.value;
            return (
              <SheetClose asChild key={idx}>
                <Link
                  href={link.value}
                  className="text-sm  flex items-center gap-4 p-2 group
                transition-all duration-300 ease-in-out
                "
                >
                  <Button
                    className={cn(
                      "shrink-0 hover:cursor-pointer",

                      "group-hover:bg-amber-700 hover:bg-amber-700"
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
              </SheetClose>
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
      </SheetContent>
    </Sheet>
  );
};

export default SmallScreenSheetNav;

"use client";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { Button } from "@/components/ui/button";
import { unifrakturCook } from "@/utils/fonts";
// import { AdminLinksPage } from "@/utils/links";
import { AlignJustify, X } from "lucide-react";
import Link from "next/link";
// import { usePathname } from "next/navigation";
import React from "react";
import SmallScreenSheetNav from "./SmallScreenSheetNav";

const Header = () => {
  //   const [isOpen, setIsOpen] = useState(false);
  //   const pathname = usePathname();

  return (
    <div
      className="fixed h-16 flex items-center border-b w-full z-50
     transition-all duration-300 ease-in-out backdrop-blur-2xl
    "
    >
      <div className="px-4  w-full flex h-full items-center justify-between">
        {/* link home logo */}
        <Link
          href={"/"}
          className={`${unifrakturCook.className}
        text-lg font-bold shrink-0
        `}
        >
          Agora Moderna
        </Link>

        {/* other part */}
        <div className="flex items-center gap-4">
          {/* theme */}
          <ThemeSwitch />

          {/* menu */}
          <SmallScreenSheetNav />
          {/* <MenuToggle
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            className="lg:hidden"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Header;

// Menu toggle
interface MenuToggleProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

export const MenuToggle: React.FC<MenuToggleProps> = ({
  isOpen,
  setIsOpen,
  className,
}) => {
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Button
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      onClick={toggle}
      type="button"
      size={"icon"}
      variant={"default"}
      className={`${className} transition-all duration-500 ease-in-out`}
    >
      {isOpen ? <X /> : <AlignJustify />}
    </Button>
  );
};

// Big screen nav
// const BigScreenNavLinks = ({}: { pathname: string }) => {
//   return (
//     <nav className="lg:flex hidden items-center gap-4">
//       {AdminLinksPage.map((link, idx) => (
//         <Link href={link.value} key={idx} className="text-sm font-medium">
//           {link.label}
//         </Link>
//       ))}
//     </nav>
//   );
// };

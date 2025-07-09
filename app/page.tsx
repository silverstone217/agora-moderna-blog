import Header from "@/components/(others)/Header";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { Button } from "@/components/ui/button";
import { unifrakturCook } from "@/utils/fonts";
import { CirclePlus, Rss } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <div className="flex h-screen flex-col items-center justify-center p-4 text-center">
        <h2
          className={`${unifrakturCook.className} text-7xl text-balance mb-2 `}
        >
          Bienvenue sur Agora Moderna
        </h2>
        <p className="text-lg font-bold text-pretty">
          Votre plateforme preferée pour la lecteure de meilleurs contenus
        </p>
        <br />
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href={"/mes-blogs"}>
            <Button variant={"secondary"}>
              <Rss className=" shrink-0" />
              <span>Voire mes blogs</span>
            </Button>
          </Link>
          <Link href={"/nouveau-blog"}>
            <Button>
              <CirclePlus className=" shrink-0" />
              <span>Ajouter un blog</span>
            </Button>
          </Link>
        </div>
        <br />
        <ThemeSwitch />
      </div>
    </>
  );
}

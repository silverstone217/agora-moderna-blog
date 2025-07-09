"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeSwitch() {
  const { setTheme, theme } = useTheme();
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Button
      size={"icon"}
      variant={"outline"}
      onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
    >
      {theme === "dark" ? <Moon /> : <Sun />}
    </Button>
  );
}

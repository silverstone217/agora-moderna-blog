import {
  ChartNoAxesGantt,
  Newspaper,
  CirclePlus,
  House,
  Info,
  Contact,
} from "lucide-react";

export const HomeLinksPage = [
  {
    label: "Accueil",
    value: "/",
    icon: House,
  },
  {
    label: "Blogs",
    value: "/blogs",
    icon: Newspaper,
  },
  {
    label: "About",
    value: "/about",
    icon: Info,
  },
  {
    label: "Contact",
    value: "/contact",
    icon: Contact,
  },
];

export const AdminLinksPage = [
  {
    label: "Overview",
    value: "/overview",
    icon: ChartNoAxesGantt,
  },
  {
    label: "Mes blogs",
    value: "/mes-blogs",
    icon: Newspaper,
  },
  {
    label: "Nouveau blog",
    value: "/nouveau-blog",
    icon: CirclePlus,
  },
];

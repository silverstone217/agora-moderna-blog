import {
  Cpu,
  Landmark,
  BadgeDollarSign,
  Scale,
  Clapperboard,
  Volleyball,
  HeartPulse,
  Sprout,
  Captions,
} from "lucide-react";

export const CategoriesData = [
  {
    label: "Informatique (IT)",
    value: "it",
    icon: Cpu,
    color: "#2563eb", // bleu vif, tech & digital
  },
  {
    label: "Finance et economie",
    value: "economie",
    icon: BadgeDollarSign,
    color: "#ca8a04", // jaune doré, richesse & finance
  },
  {
    label: "Politique",
    value: "politic",
    icon: Landmark,
    color: "#dc2626", // rouge profond, passion & pouvoir
  },
  {
    label: "Droit",
    value: "law",
    icon: Scale,
    color: "#4b5563", // gris anthracite, sérieux & impartialité
  },
  {
    label: "Culture",
    value: "culture",
    icon: Clapperboard,
    color: "#9333ea", // violet vibrant, créativité & arts
  },
  {
    label: "Sports",
    value: "sports",
    icon: Volleyball,
    color: "#059669", // vert dynamique, énergie & santé
  },
  {
    label: "Santé",
    value: "health",
    icon: HeartPulse,
    color: "#ef4444", // rouge clair, vitalité & soin
  },
  {
    label: "Environnement (nature)",
    value: "nature",
    icon: Sprout,
    color: "#22c55e", // vert nature, écologie & vie
  },
  {
    label: "Autres",
    value: "others",
    icon: Captions,
    color: "#64748b", // bleu gris neutre, polyvalent & discret
  },
];

import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export const isEmpyString = (str: string) => str.replace(/ /, "") === "";

// title to slug + random numbers
export function titleToSlug(title: string): string {
  // Convertit en minuscules, remplace les espaces et caractères spéciaux par des tirets
  const slug = title
    .toLowerCase()
    .trim()
    // Remplace les caractères accentués par leur équivalent non accentué
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    // Remplace tout ce qui n’est pas lettre, chiffre ou tiret par un tiret
    .replace(/[^a-z0-9]+/g, "-")
    // Supprime les tirets en début et fin
    .replace(/^-+|-+$/g, "")
    // Remplace les tirets multiples par un seul
    .replace(/-{2,}/g, "-");

  // Génère 2 chiffres aléatoires (00 à 99)
  const randomNumber = Math.floor(Math.random() * 100)
    .toString()
    .padStart(2, "0");

  return `${slug}-${randomNumber}`;
}

// clear tags
export function cleanTags(tagsInput: string): string {
  // Sépare par virgule, nettoie chaque tag, filtre les vides, met en minuscules
  const tagsArray = tagsInput
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter((tag) => tag.length > 0);

  // Supprime les doublons en utilisant un Set
  const uniqueTags = Array.from(new Set(tagsArray));

  // Rejoint en chaîne séparée par des virgules et espaces
  return uniqueTags.join(", ");
}

// capitalize first letter
export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// return Data by value
type DataValueType = {
  label: string;
  value: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  color?: string;
};
export function returnDataByValue(
  data: DataValueType[],
  value: string
): DataValueType {
  const result = data.find((item) => item.value === value);

  return result || { label: "", value: "" };
}

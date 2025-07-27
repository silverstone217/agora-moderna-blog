"use client";

import { Button } from "@/components/ui/button";
import { Blog } from "@/lib/generated/prisma";
import { CategoriesData } from "@/utils/data";
import { capitalizeFirstLetter, returnDataByValue } from "@/utils/functions";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit3, Eye, Trash2 } from "lucide-react";

export const columnsBlogs: ColumnDef<Blog>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        aria-label="Trier par numéro"
      >
        N <ArrowUpDown className="w-4 h-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const index = (row.index + 1).toString().padStart(2, "0");
      return (
        <span className="text-xs font-mono text-muted-foreground">{index}</span>
      );
    },
    enableSorting: false, // Optionnel : désactive le tri sur l’index
    size: 50,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        aria-label="Trier par titre"
      >
        Titre <ArrowUpDown className="w-4 h-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const title = row.original.title;
      return (
        <span className="line-clamp-2 text-sm font-semibold text-foreground">
          {capitalizeFirstLetter(title)}
        </span>
      );
    },
    size: 300,
  },
  {
    accessorKey: "category",
    header: "Catégorie",
    cell: ({ row }) => {
      const category = row.original.category;
      const formattedCategory = returnDataByValue(
        CategoriesData,
        category
      ).label;
      return (
        <span className="text-xs font-medium uppercase text-muted-foreground">
          {capitalizeFirstLetter(formattedCategory)}
        </span>
      );
    },
    size: 120,
  },
  {
    accessorKey: "isPublished",
    header: "Publié",
    cell: ({ row }) => {
      const isPublished = row.original.isPublished;
      return (
        <span
          className={`text-xs font-semibold ${
            isPublished
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {isPublished ? "OUI" : "NON"}
        </span>
      );
    },
    size: 70,
  },
  {
    accessorKey: "createdAt",
    header: "Édité le",
    cell: ({ row }) => {
      const formattedDate = new Date(row.original.createdAt).toLocaleDateString(
        "fr-FR",
        {
          dateStyle: "medium",
        }
      );
      return (
        <span className="text-xs text-muted-foreground">{formattedDate}</span>
      );
    },
    size: 130,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      // Récupérer l'id ou slug pour les actions
      const blogId = row.original.id;
      const blogSlug = row.original.slug;

      return (
        <div className="flex gap-2 justify-center">
          <Button
            variant="outline"
            size="icon"
            aria-label="Modifier l'article"
            onClick={() => {
              location.replace(`/mes-blogs/${blogSlug}`);
            }}
            className="text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900"
          >
            <Edit3 className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            aria-label="Lire l'article"
            onClick={() => {
              window.open(`/blogs/${blogSlug}`, "_blank");
            }}
            className="text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900"
          >
            <Eye className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            aria-label="Supprimer l'article"
            onClick={() => {
              // Logique supprimer (ex: confirmation + API call)
              if (confirm("Voulez-vous vraiment supprimer cet article ?")) {
                console.log("Supprimer", blogId);
              }
            }}
            className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      );
    },
    size: 140,
  },
];

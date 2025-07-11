"use server";
import { prisma } from "@/lib/prisma";
import { addNewPostSchema } from "@/schema/blogSchema";
import { cleanTags, titleToSlug } from "@/utils/functions";
import z from "zod";
import { getUser } from "./auth";

// Add blog
export type AddNewBlogType = z.infer<typeof addNewPostSchema>;
export const addNewBlog = async (data: AddNewBlogType) => {
  try {
    const user = await getUser();

    if (!user) {
      return {
        error: true,
        message: "Connectez-vous pour creer un blog post",
        data: null,
      };
    }

    //   validate data
    const validationResult = addNewPostSchema.safeParse(data);

    if (!validationResult.success) {
      console.log(validationResult.error.issues, "erreurs survenues");
      return {
        error: true,
        message: "Les informations soumises sont invalides",
        errors: validationResult.error.issues, // Important: Retourner les erreurs Zod
        data: null,
      };
    }

    const validated = validationResult.data;

    const slug = titleToSlug(validated.title);
    const tags = cleanTags(validated.tags);

    // console.log({ data });

    const blog = await prisma.blog.create({
      data: {
        slug,
        title: validated.title,
        content: validated.content,
        category: validated.category,
        image: validated.image,
        isPublished: validated.isPublished,
        tags,
        userId: user.id!,
      },
    });

    return {
      error: false,
      message: "Nouvel article ajouté avec succès",
      data: blog,
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
      message: "Impossible d'effectuer cette action",
      data: null,
    };
  }
};

export const getAllPost = async () => {
  const blogs = await prisma.blog.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return blogs ?? [];
};

export const getPostBySlugWithUser = async (slug: string) => {
  const blog = await prisma.blog.findUnique({
    where: {
      slug,
    },
    include: {
      user: true,
    },
  });
  return blog ?? null;
};

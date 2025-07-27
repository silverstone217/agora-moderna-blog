"use server";
import { prisma } from "@/lib/prisma";
import { addNewPostSchema, updatePostSchema } from "@/schema/blogSchema";
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
        description: validated.description,
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

// Modify blog
export type UpdateBlogType = z.infer<typeof updatePostSchema>;
export const updateBlog = async (data: UpdateBlogType) => {
  try {
    const user = await getUser();

    if (!user) {
      return {
        error: true,
        message: "Connectez-vous pour modifier ce blog",
        data: null,
      };
    }

    //   validate data
    const validationResult = updatePostSchema.safeParse(data);

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

    // if the blog exist
    const isBlogExist = await prisma.blog.findUnique({
      where: {
        id: validated.id,
      },
    });
    if (!isBlogExist) {
      return {
        error: true,
        message: "Le blog n'existe pas",
        data: null,
      };
    }

    const isTheOwner = isBlogExist.userId === user.id;
    if (!isTheOwner) {
      return {
        error: true,
        message: "Vous n'êtes pas le propriétaire de ce blog",
        data: null,
      };
    }

    let slug = isBlogExist.slug;

    // is the title has changed
    if (validated.title !== isBlogExist.title) {
      slug = titleToSlug(validated.title);
    }

    const tags = cleanTags(validated.tags);

    // console.log({ data });

    const blog = await prisma.blog.update({
      where: {
        id: validated.id,
      },
      data: {
        slug,
        title: validated.title,
        content: validated.content,
        category: validated.category,
        image: validated.image,
        isPublished: validated.isPublished,
        tags,
        description: validated.description,
      },
    });

    return {
      error: false,
      message: " L'article modifié avec succès",
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

// get all posts
export const getAllPost = async () => {
  const blogs = await prisma.blog.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return blogs ?? [];
};

// get post by slug with the user(author)
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

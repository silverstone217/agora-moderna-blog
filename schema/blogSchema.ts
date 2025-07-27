import { z } from "zod";

export const addNewPostSchema = z.object({
  title: z
    .string()
    .min(1)
    .max(200)
    .transform((str) => str.toLowerCase().trim()),
  content: z.string().min(1),
  category: z.string().min(1),
  image: z.string().url(),
  tags: z.string().min(1),
  isPublished: z.boolean().default(false),
  description: z.string().min(1).max(500),
});

export const updatePostSchema = z.object({
  title: z
    .string()
    .min(1)
    .max(200)
    .transform((str) => str.toLowerCase().trim()),
  content: z.string().min(1),
  category: z.string().min(1),
  image: z.string().url(),
  tags: z.string().min(1),
  isPublished: z.boolean().default(false),
  description: z.string().min(1).max(500),
  id: z.string().cuid(),
});

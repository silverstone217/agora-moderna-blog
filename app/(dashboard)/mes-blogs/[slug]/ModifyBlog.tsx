"use client";

import React, { useMemo, useState } from "react";
import { Blog } from "@/lib/generated/prisma";
import { isEmpyString } from "@/utils/functions";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { playfairDisplay } from "@/utils/fonts";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SelectCategory from "@/components/blogs/SelectCategory";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import MarkdownInput from "@/components/blogs/markdown/MarkdownInput";
import { updateBlog, UpdateBlogType } from "@/actions/blogs"; // supposition d'une action updateBlog similaire à addNewBlog
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

type Props = {
  blog: Blog;
};

const ModifyBlog = ({ blog }: Props) => {
  const [title, setTitle] = useState(blog.title ?? "");
  const [content, setContent] = useState(blog.content ?? "");
  const [category, setCategory] = useState(blog.category ?? "");
  const [tags, setTags] = useState(blog.tags ?? "");
  const [isPublished, setIsPublished] = useState(blog.isPublished ?? false);
  const [image, setImage] = useState(blog.image ?? "");
  const [description, setDescription] = useState(blog.description ?? "");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Désactivation du bouton si des champs sont vides ou si rien n'a changé
  const isButtonSaveDisabled = useMemo(() => {
    if (loading) return true;
    if (
      isEmpyString(title) ||
      isEmpyString(content) ||
      isEmpyString(image) ||
      isEmpyString(category) ||
      isEmpyString(tags) ||
      isEmpyString(description)
    ) {
      return true;
    }
    // Vérifie si aucun champ modifié
    if (
      title === blog.title &&
      content === blog.content &&
      category === blog.category &&
      tags === blog.tags &&
      description === blog.description &&
      image === blog.image &&
      isPublished === blog.isPublished
    ) {
      return true;
    }
    return false;
  }, [
    title,
    content,
    category,
    tags,
    description,
    image,
    isPublished,
    loading,
    blog,
  ]);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const backupUrl = blog.slug;

      const formData: UpdateBlogType = {
        id: blog.id,
        tags,
        title,
        category,
        isPublished,
        content,
        image,
        description,
      };

      const result = await updateBlog(formData);

      if (result.error) {
        toast.error(result.message || "Erreur lors de la modification");
        return;
      }

      toast.success("Article modifié avec succès !");
      const data = result.data;

      if (data && data.slug !== backupUrl) {
        router.push("/mes-blogs/" + data.slug);
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Oops!", { description: "Impossible de modifier l'article" });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // setTitle(blog.title ?? "");
    // setContent(blog.content ?? "");
    // setCategory(blog.category ?? "");
    // setTags(blog.tags ?? "");
    // setIsPublished(blog.isPublished ?? false);
    // setImage(blog.image ?? "");
    // setDescription(blog.description ?? "");
    router.push("/mes-blogs");
  };

  return (
    <Card className="mx-auto max-w-2xl w-full">
      <CardHeader>
        <CardTitle
          className={`${playfairDisplay.className} text-4xl font-bold`}
        >
          {`Modifier l'article`}
        </CardTitle>
        <CardDescription
          className={`${playfairDisplay.className} text-balance max-w-md`}
        >
          Mettez à jour votre contenu avec soin pour garder vos lecteurs
          captivés.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        {/* Titre */}
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="title">Titre</Label>
          <Input
            id="title"
            type="text"
            placeholder="ex: Le magicien d'Oz"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            disabled={loading}
            minLength={1}
            maxLength={200}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
          />
        </div>

        {/* Image */}
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="image">Image</Label>
          <Input
            id="image"
            type="url"
            placeholder="ex: https://image.exemple.com"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            disabled={loading}
            minLength={1}
            maxLength={200}
          />
          {image && (
            <Image
              src={image}
              alt="Preview image"
              className="mt-2 max-h-52 w-full rounded-md object-cover"
              priority
              width={400}
              height={400}
            />
          )}
        </div>

        {/* Catégorie */}
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="category">Catégorie</Label>
          <SelectCategory
            category={category}
            setCategory={setCategory}
            disabled={loading}
          />
        </div>

        {/* Description */}
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Quel genre de contenu, en bref!"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            minLength={10}
            maxLength={500}
            disabled={loading}
            className="min-h-28 max-h-40"
          />
        </div>

        {/* Contenu Markdown */}
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="content">Contenu</Label>
          <MarkdownInput
            value={content}
            onChange={(val) => setContent(val || "")}
            disabled={loading}
          />
        </div>

        {/* Tags */}
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="tags"
            type="text"
            placeholder="ex: fun, joie, nature, jeffBezos, CR7"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            minLength={1}
            maxLength={600}
            disabled={loading}
          />
          <p className="text-xs text-gray-600">
            <strong>NB:</strong> Les tags doivent être séparés par une virgule.
          </p>
        </div>

        {/* Publication */}
        <div className="flex items-center justify-between w-full gap-3">
          <Label htmlFor="publish">Publier cet article ?</Label>
          <Switch
            id="publish"
            checked={isPublished}
            disabled={loading}
            onCheckedChange={setIsPublished}
          />
        </div>
      </CardContent>

      <Separator />

      {/* Actions */}
      <CardFooter className="flex flex-wrap items-center justify-end gap-4">
        <Button variant="secondary" disabled={loading} onClick={handleCancel}>
          retour
        </Button>

        <Button disabled={isButtonSaveDisabled} onClick={handleSubmit}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enregistrement...
            </>
          ) : (
            "Enregistrer"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModifyBlog;

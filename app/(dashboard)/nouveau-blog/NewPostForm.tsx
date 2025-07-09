"use client";

import React, { useMemo, useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { isEmpyString } from "@/utils/functions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const NewPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);

  const isButtonAddDisabled = useMemo(() => {
    if (loading) return true;
    if (
      isEmpyString(title) ||
      isEmpyString(content) ||
      isEmpyString(image) ||
      isEmpyString(category) ||
      isEmpyString(tags)
    ) {
      return true;
    }
    return false;
  }, [category, content, image, loading, tags, title]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = {
        tags,
        title,
        category,
        isPublished,
        content,
        image,
      };

      // Simule une requête réseau
      setTimeout(() => {
        console.log(formData);
        toast.success("Article ajouté avec succès !");
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error("Oops!", { description: "Impossible d'ajouter un article" });
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto max-w-lg w-full">
      <CardHeader>
        <CardTitle
          className={`${playfairDisplay.className} text-4xl font-bold`}
        >
          Nouvel article
        </CardTitle>
        <CardDescription
          className={`${playfairDisplay.className} text-balance max-w-md`}
        >
          Laissez votre imagination prendre le contrôle et faites-nous rêver à{" "}
          {`l'`}aide de votre plume.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        {/* Titre */}
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="title">Titre</Label>
          <Input
            type="text"
            id="title"
            placeholder="ex: Le magicien d'Oz"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            minLength={1}
            maxLength={200}
            disabled={loading}
          />
        </div>

        {/* Image */}
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="image">Image</Label>
          <Input
            type="url"
            id="image"
            placeholder="ex: https://image.exemple.com"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            minLength={1}
            maxLength={200}
            disabled={loading}
          />
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

        {/* Contenu */}
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="content">Contenu</Label>
          <Textarea
            id="content"
            placeholder="ex: Le magicien d'Oz venait de me dire un secret incroyable"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            minLength={1}
            className="min-h-[16rem] max-h-[24rem]"
            disabled={loading}
          />
        </div>

        {/* Tags */}
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="tags">Tags</Label>
          <Input
            type="text"
            id="tags"
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
          <Label htmlFor="publish">Publier directement le blog ?</Label>
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
        <Button
          variant="secondary"
          disabled={loading}
          onClick={() => {
            // Reset form ou navigation, selon besoin
            setTitle("");
            setContent("");
            setCategory("");
            setTags("");
            setIsPublished(false);
            setImage("");
          }}
        >
          Annuler
        </Button>

        <Button disabled={isButtonAddDisabled} onClick={handleSubmit}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              En cours...
            </>
          ) : (
            "Ajouter"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewPostForm;

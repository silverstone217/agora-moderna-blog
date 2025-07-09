"use client";
import React from "react";
import MDEditor from "@uiw/react-md-editor";

const MarkdownInput = ({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}) => {
  return (
    <div className="w-full" data-color-mode="light">
      <MDEditor
        value={value}
        onChange={(value?: string) => onChange(value ?? "")}
        height={300}
        visibleDragbar={false}
        preview="edit" // ou "live" pour voir le rendu en temps réel
        textareaProps={{
          disabled,
          placeholder: "Rédigez votre contenu en Markdown ici...",
        }}
      />
    </div>
  );
};

export default MarkdownInput;

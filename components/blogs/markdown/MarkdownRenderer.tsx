"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // pour les listes, tables, etc.
import rehypeRaw from "rehype-raw"; // pour autoriser le HTML dans markdown (attention sécurité)

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <article className="prose max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {content}
      </ReactMarkdown>
    </article>
  );
};

export default MarkdownRenderer;

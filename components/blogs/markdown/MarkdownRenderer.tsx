/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const components: Components = {
  h1: ({ node, ...props }) => (
    <h1 className="text-4xl font-bold my-4" {...props} />
  ),
  h2: ({ node, ...props }) => (
    <h2 className="text-3xl font-semibold my-3" {...props} />
  ),
  h3: ({ node, ...props }) => (
    <h3 className="text-2xl font-semibold my-2" {...props} />
  ),
  p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
  ul: ({ node, ...props }) => (
    <ul className="list-disc list-inside mb-4" {...props} />
  ),
  ol: ({ node, ...props }) => (
    <ol className="list-decimal list-inside mb-4" {...props} />
  ),
  li: ({ node, ...props }) => <li className="mb-1" {...props} />,
  a: ({ node, ...props }) => (
    <a className="text-indigo-600 underline hover:text-indigo-800" {...props} />
  ),
  img: ({ node, ...props }) => (
    <picture>
      <img
        className="max-w-full rounded-md my-4 h-auto"
        alt={props.alt}
        {...props}
      />
    </picture>
  ),
  table: ({ node, ...props }) => (
    <table
      className="table-auto border-collapse border border-gray-300 mb-6"
      {...props}
    />
  ),
  th: ({ node, ...props }) => (
    <th className="border border-gray-300 px-4 py-2 bg-gray-100" {...props} />
  ),
  td: ({ node, ...props }) => (
    <td className="border border-gray-300 px-4 py-2" {...props} />
  ),
  del: ({ node, ...props }) => <del className="line-through" {...props} />,
  pre: ({ node, ...props }) => (
    <pre
      className="bg-gray-900 text-green-600 rounded p-4 overflow-x-auto mb-6 font-mono text-sm"
      {...props}
    />
  ),

  blockquote: ({ node, ...props }) => (
    <blockquote
      className="bg-yellow-100 border-l-4 border-yellow-500 p-4 italic text-gray-600"
      {...props}
    />
  ),
};

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <article className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
};

export default MarkdownRenderer;

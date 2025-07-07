"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const BlogWYSIWYG = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
  });

  return (
    <div className="p-4 border rounded space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 border-b pb-2">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={
            editor?.isActive("bold")
              ? "font-bold bg-gray-200 px-2 py-1 rounded"
              : "px-2 py-1"
          }
        >
          Bold
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={
            editor?.isActive("italic")
              ? "italic bg-gray-200 px-2 py-1 rounded"
              : "px-2 py-1"
          }
        >
          Italic
        </button>
        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor?.isActive("heading", { level: 1 })
              ? "bg-gray-200 px-2 py-1 rounded"
              : "px-2 py-1"
          }
        >
          H1
        </button>
        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor?.isActive("heading", { level: 2 })
              ? "bg-gray-200 px-2 py-1 rounded"
              : "px-2 py-1"
          }
        >
          H2
        </button>
        <button
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor?.isActive("heading", { level: 3 })
              ? "bg-gray-200 px-2 py-1 rounded"
              : "px-2 py-1"
          }
        >
          H3
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={
            editor?.isActive("bulletList")
              ? "bg-gray-200 px-2 py-1 rounded"
              : "px-2 py-1"
          }
        >
          Bullet List
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
          className={
            editor?.isActive("orderedList")
              ? "bg-gray-200 px-2 py-1 rounded"
              : "px-2 py-1"
          }
        >
          Numbered List
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
          className={
            editor?.isActive("codeBlock")
              ? "bg-gray-200 px-2 py-1 rounded"
              : "px-2 py-1"
          }
        >
          Code Block
        </button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="prose max-w-none border p-4 min-h-[200px]"
      />
    </div>
  );
};

export default BlogWYSIWYG;

"use client";

import EditorActtion from "@/app/(root)/blogs/_components/editor-action";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Dispatch, SetStateAction } from "react";

const CreateBlogWYSIWYG = ({
  setBody,
}: {
  setBody: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
    onUpdate: ({ editor }) => {
      setBody(editor?.getText());
    },
  });

  return (
    <div className="p-4 border flex flex-col justify-start items-stretch rounded space-y-2 h-full">
      <EditorActtion editor={editor} />
      <div className="h-full max-h-[400px] overflow-auto">
        <EditorContent
          editor={editor}
          className="prose overflow-auto border px-4 min-h-[200px] h-full"
        />
      </div>
    </div>
  );
};

export default CreateBlogWYSIWYG;

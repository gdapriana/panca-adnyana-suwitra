import { Button } from "@/components/ui/button";
import { Editor } from "@tiptap/react";
import {
  BoldIcon,
  Code2Icon,
  Heading1,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
} from "lucide-react";
export default function EditorActtion({ editor }: { editor: Editor | null }) {
  return (
    <div className="flex flex-wrap gap-2 pb-1">
      <Button
        type="button"
        size="icon"
        onClick={() => editor?.chain().focus().toggleBold().run()}
        variant={editor?.isActive("bold") ? "default" : "secondary"}
      >
        <BoldIcon />
      </Button>
      <Button
        type="button"
        size="icon"
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        variant={editor?.isActive("italic") ? "default" : "secondary"}
      >
        <ItalicIcon />
      </Button>
      <Button
        type="button"
        size="icon"
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 1 }).run()
        }
        variant={
          editor?.isActive("heading", { level: 1 }) ? "default" : "secondary"
        }
      >
        <Heading1Icon />
      </Button>
      <Button
        type="button"
        size="icon"
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 2 }).run()
        }
        variant={
          editor?.isActive("heading", { level: 2 }) ? "default" : "secondary"
        }
      >
        <Heading2Icon />
      </Button>
      <Button
        type="button"
        size="icon"
        onClick={() =>
          editor?.chain().focus().toggleHeading({ level: 3 }).run()
        }
        variant={
          editor?.isActive("heading", { level: 3 }) ? "default" : "secondary"
        }
      >
        <Heading3Icon />
      </Button>

      <Button
        type="button"
        variant={editor?.isActive("bulletList") ? "default" : "secondary"}
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
      >
        <ListIcon />
      </Button>
      <Button
        type="button"
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        variant={editor?.isActive("orderedList") ? "default" : "secondary"}
      >
        <ListOrderedIcon />
      </Button>
      <Button
        type="button"
        onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
        variant={editor?.isActive("codeBlock") ? "default" : "secondary"}
      >
        <Code2Icon />
      </Button>
    </div>
  );
}

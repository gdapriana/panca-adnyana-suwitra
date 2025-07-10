import { Editor } from "@tiptap/react";

import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ListIcon,
  ListOrderedIcon,
  Code2Icon,
  QuoteIcon,
  MinusIcon,
  CodeIcon,
  Undo2Icon,
  Redo2Icon,
  EraserIcon,
  TableIcon,
  RowsIcon,
  ColumnsIcon,
  Trash2Icon,
  ImageIcon,
  LinkIcon,
  HighlighterIcon,
  SquareCheckBigIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function editorAction({ editor }: { editor: Editor | null }) {
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
        size="icon"
        type="button"
        onClick={() => editor?.chain().focus().toggleStrike().run()}
        variant={editor?.isActive("strike") ? "default" : "secondary"}
      >
        <StrikethroughIcon />
      </Button>

      {/* Headings */}
      <Button
        size="icon"
        type="button"
        onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
        variant={editor?.isActive("heading", { level: 1 }) ? "default" : "secondary"}
      >
        <Heading1Icon />
      </Button>
      <Button
        size="icon"
        type="button"
        onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
        variant={editor?.isActive("heading", { level: 2 }) ? "default" : "secondary"}
      >
        <Heading2Icon />
      </Button>
      <Button
        size="icon"
        type="button"
        onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
        variant={editor?.isActive("heading", { level: 3 }) ? "default" : "secondary"}
      >
        <Heading3Icon />
      </Button>

      {/* Lists */}
      <Button
        size="icon"
        type="button"
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        variant={editor?.isActive("bulletList") ? "default" : "secondary"}
      >
        <ListIcon />
      </Button>
      <Button
        size="icon"
        type="button"
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        variant={editor?.isActive("orderedList") ? "default" : "secondary"}
      >
        <ListOrderedIcon />
      </Button>

      {/* Code Block */}
      <Button
        size="icon"
        type="button"
        onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
        variant={editor?.isActive("codeBlock") ? "default" : "secondary"}
      >
        <Code2Icon />
      </Button>

      {/* Extra Features */}
      <Button
        size="icon"
        type="button"
        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        variant={editor?.isActive("blockquote") ? "default" : "secondary"}
      >
        <QuoteIcon />
      </Button>
      <Button type="button" size="icon" onClick={() => editor?.chain().focus().setHorizontalRule().run()} variant="secondary">
        <MinusIcon />
      </Button>
      <Button
        size="icon"
        type="button"
        onClick={() => editor?.chain().focus().toggleCode().run()}
        variant={editor?.isActive("code") ? "default" : "secondary"}
      >
        <CodeIcon />
      </Button>

      {/* Undo & Redo */}
      <Button type="button" size="icon" onClick={() => editor?.chain().focus().undo().run()} variant="secondary">
        <Undo2Icon />
      </Button>
      <Button type="button" size="icon" onClick={() => editor?.chain().focus().redo().run()} variant="secondary">
        <Redo2Icon />
      </Button>

      {/* Clear Formatting */}
      <Button
        type="button"
        size="icon"
        onClick={() => editor?.chain().focus().unsetAllMarks().clearNodes().run()}
        variant="secondary"
      >
        <EraserIcon />
      </Button>

      {/* Tabel */}
      <Button
        type="button"
        size="icon"
        onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
        variant="secondary"
      >
        <TableIcon />
      </Button>
      <Button type="button" size="icon" onClick={() => editor?.chain().focus().addColumnBefore().run()} variant="secondary">
        <ColumnsIcon />
      </Button>
      <Button type="button" size="icon" onClick={() => editor?.chain().focus().addRowBefore().run()} variant="secondary">
        <RowsIcon />
      </Button>
      <Button type="button" size="icon" onClick={() => editor?.chain().focus().deleteTable().run()} variant="secondary">
        <Trash2Icon />
      </Button>

      {/* Image */}
      <Button
        type="button"
        size="icon"
        onClick={() => {
          const url = window.prompt("Masukkan URL gambar:");
          if (url) editor?.chain().focus().setImage({ src: url }).run();
        }}
        variant="secondary"
      >
        <ImageIcon />
      </Button>

      {/* Link */}
      <Button
        size="icon"
        type="button"
        onClick={() => {
          const url = window.prompt("Masukkan URL:");
          if (url) editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        }}
        variant={editor?.isActive("link") ? "default" : "secondary"}
      >
        <LinkIcon />
      </Button>

      {/* Highlight */}
      <Button
        size="icon"
        type="button"
        onClick={() => editor?.chain().focus().toggleHighlight().run()}
        variant={editor?.isActive("highlight") ? "default" : "secondary"}
      >
        <HighlighterIcon />
      </Button>

      {/* Task List */}
      <Button
        size="icon"
        type="button"
        onClick={() => editor?.chain().focus().toggleTaskList().run()}
        variant={editor?.isActive("taskList") ? "default" : "secondary"}
      >
        <SquareCheckBigIcon />
      </Button>
    </div>
  );
}

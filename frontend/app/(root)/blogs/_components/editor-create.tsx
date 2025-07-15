"use client";

import EditorActtion from "@/app/(root)/blogs/_components/editor-action";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Dispatch, SetStateAction } from "react";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";

const CreateBlogWYSIWYG = ({ setBody }: { setBody: Dispatch<SetStateAction<string | undefined>> }) => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Highlight,
			Image,
			Link,
			TaskList,
			TaskItem.configure({ nested: true }),
			Table.configure({ resizable: true }),
			TableRow,
			TableHeader,
			TableCell,
		],
		content: "<p>Tulis <i>body</i> blog disini...</p>",
		onUpdate: ({ editor }) => {
			setBody(editor?.getHTML());
		},
	});

	return (
		<div className="p-4 border flex flex-col justify-start items-stretch rounded space-y-2 h-full">
			<EditorActtion editor={editor} />
			<div className="h-full overflow-auto">
				<EditorContent editor={editor} className="prose overflow-auto border px-4 min-h-[200px] h-full" />
			</div>
		</div>
	);
};

export default CreateBlogWYSIWYG;

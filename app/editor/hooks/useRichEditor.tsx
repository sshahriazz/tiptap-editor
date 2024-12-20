"use client";

import type { AnyExtension, Editor } from "@tiptap/core";
import { useEditor } from "@tiptap/react";
// import {initialContent} from '@/lib/data/initialContent'
import { FontSize } from "@/app/editor/extensions/fontsize";
import { Image } from "@/app/editor/extensions/image/Image";
import Column from "@/app/editor/extensions/multi-column/Column";
import Columns from "@/app/editor/extensions/multi-column/Columns";
import { SlashCommand } from "@/app/editor/extensions/SlashCommand";
import { fileToBase64, randomId } from "@/app/editor/extensions/utils";
import { initialContent } from "@/app/editor/lib/content";
import { FileHandler } from "@tiptap-pro/extension-file-handler";
import CharacterCount from "@tiptap/extension-character-count";
import { Color } from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import { Link } from "@tiptap/extension-link";
import Mention from "@tiptap/extension-mention";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import Document from "../extensions/Document/Document";
import { Table, TableCell, TableHeader, TableRow } from "../extensions/Table";

declare global {
  interface Window {
    editor: Editor | null;
  }
}

const extensions = [
  Document,
  StarterKit.configure({
    document: false,
  }),
  Columns,
  Underline,
  Mention.configure({
    HTMLAttributes: {
      class: "mention",
    },
    //suggestion,
  }),
  TaskList,
  Column,
  TaskItem.configure({
    nested: true,
  }),
  FontSize,
  Subscript,
  Superscript,
  FontFamily,
  CharacterCount,
  FileHandler.configure({
    allowedMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"],
    onDrop: (currentEditor, files, pos) => {
      files.forEach((file) => {
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          currentEditor
            .chain()
            .insertContentAt(pos, {
              type: "image",
              attrs: {
                src: fileReader.result,
              },
            })
            .focus()
            .run();
        };
      });
    },
    onPaste: (currentEditor, files, htmlContent) => {
      files.forEach((file) => {
        if (htmlContent) {
          // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
          // you could extract the pasted file from this url string and upload it to a server for example
          console.log(htmlContent); // eslint-disable-line no-console
          return false;
        }

        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          currentEditor
            .chain()
            .insertContentAt(currentEditor.state.selection.anchor, {
              type: "image",
              attrs: {
                src: fileReader.result,
              },
            })
            .focus()
            .run();
        };
      });
    },
  }),
  Image.configure({
    allowedMimeTypes: ["image/*"],
    maxFileSize: 5 * 1024 * 1024,
    allowBase64: true,
    uploadFn: async (file) => {
      // NOTE: This is a fake upload function. Replace this with your own upload logic.
      // This function should return the uploaded image URL.

      // wait 3s to simulate upload
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const src = await fileToBase64(file);

      // either return { id: string | number, src: string } or just src
      // return src;
      return { id: randomId(), src };
    },
    onImageRemoved({ id, src }) {
      console.log("Image removed", { id, src });
    },
    onValidationError(errors) {
      errors.forEach((error) => {
        // toast.error('Image validation error', {
        //     position: 'bottom-right',
        //     description: error.reason
        // })
      });
    },
  }),
  Highlight.configure({
    multicolor: true,
  }),
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Link.configure({
    openOnClick: true,
    autolink: true,
    defaultProtocol: "https",
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Typography,
  Color,
  SlashCommand,
];

export const useBlockEditor = () => {
  const editor = useEditor(
    {
      immediatelyRender: false,
      // shouldRerenderOnTransaction: false,
      autofocus: true,
      onCreate: (ctx) => {
        if (ctx.editor.isEmpty) {
          ctx.editor.commands.setContent(initialContent);
          ctx.editor.commands.focus("start", {
            scrollIntoView: true,
          });
        }
      },
      extensions: [...extensions].filter(
        (e): e is AnyExtension => e !== undefined
      ),
      editorProps: {
        attributes: {
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          class:
            "min-h-[1100px] shadow shadow-blue-100 prose min-w-[850px] mx-auto focus:outline-none border p-[96px] mt-3 bg-white rounded-md shadow-md",
        },
      },
    },
    []
  );
  useEffect(() => {
    if (!editor) return;
    window.editor = editor;
    console.log("once");
  }, [editor]);
  return { editor };
};

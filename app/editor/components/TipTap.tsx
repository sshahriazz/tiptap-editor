"use client";

import CharacterCount from "@tiptap/extension-character-count";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import FontFamily from "@tiptap/extension-font-family";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Mention from "@tiptap/extension-mention";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import { BubbleMenu, EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState } from "react";
import { ToC } from "./TOC";
import Toolbar from "./toolbar/Toolbar";
import HardBreak from "@tiptap/extension-hard-break";
import { Image } from "../extensions/image/Image";
import { fileToBase64, randomId } from "@/app/editor/extensions/utils";
import { FileHandler } from "@tiptap-pro/extension-file-handler";
import TableOfContents, {
  getHierarchicalIndexes,
} from "@tiptap-pro/extension-table-of-contents";
import { Link } from "@tiptap/extension-link";
import { default as BubbleMenuBar } from "./toolbar/BubbleMenuBar";
import { FontSize } from "@/app/editor/extensions/fontsize";
import CharactersAndWordCount from "./toolbar/CharactersAndWordCount";
import { SlashCommand } from "../extensions/SlashCommand";
import Placeholder from "@tiptap/extension-placeholder";
import { Table, TableCell, TableHeader, TableRow } from "../extensions/Table";

// const PdfGeneration = dynamic(() => import('@/app/editor/components/PDFGeneration'), {ssr: false});

const MemorizedToC = React.memo(ToC);

const Tiptap = () => {
  const [items, setItems] = useState<any>([]);
  const [limit] = useState(500);
  const extensions = [
    StarterKit,
    Underline,
    Highlight.configure({
      multicolor: true,
    }),
    Mention.configure({
      HTMLAttributes: {
        class: "mention",
      },
      //suggestion,
    }),
    TaskList,
    TaskItem.configure({
      nested: true,
    }),

    FontSize,
    HardBreak,
    Subscript,
    Superscript,
    Paragraph,
    Text,
    TextStyle,
    FontFamily,
    CharacterCount.configure({
      limit,
    }),
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
    // Image,
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
    Highlight,
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
    TableOfContents.configure({
      getIndex: getHierarchicalIndexes,
      onUpdate(content) {
        setItems(content);
      },
    }),

    Typography,
    TextStyle,
    Color,
    Placeholder.configure({
      includeChildren: true,
      showOnlyCurrent: false,
      placeholder: () => "",
    }),
    SlashCommand,
  ];
  const content = `<p>Hello World! 🌎️</p> 
  <h1>Discography</h1>
  <img src="/image-dog.jpeg" alt="image" />
    <h2>Top Albums</h2>
    <ul>
        <li><a href="https://en.wikipedia.org/wiki/Thriller_(album)" target="_blank">Thriller - Michael Jackson</a></li>
        <li><a href="https://en.wikipedia.org/wiki/Back_in_Black" target="_blank">Back in Black - AC/DC</a></li>
        <li><a href="https://en.wikipedia.org/wiki/The_Dark_Side_of_the_Moon" target="_blank">The Dark Side of the Moon - Pink Floyd</a></li>
        <li><a href="https://en.wikipedia.org/wiki/The_Bodyguard_(soundtrack)" target="_blank">The Bodyguard - Whitney Houston</a></li>
        <li><a href="https://en.wikipedia.org/wiki/Bat_Out_of_Hell" target="_blank">Bat Out of Hell - Meat Loaf</a></li>
        <li><a href="https://en.wikipedia.org/wiki/Their_Greatest_Hits_(1971%E2%80%931975)" target="_blank">Their Greatest Hits (1971–1975) - Eagles</a></li>
        <li><a href="https://en.wikipedia.org/wiki/Come_On_Over_(Shania_Twain_album)" target="_blank">Come On Over - Shania Twain</a></li>
        <li><a href="https://en.wikipedia.org/wiki/Led_Zeppelin_IV" target="_blank">Led Zeppelin IV - Led Zeppelin</a></li>
        <li><a href="https://en.wikipedia.org/wiki/Bad_(album)" target="_blank">Bad - Michael Jackson</a></li>
        <li><a href="https://en.wikipedia.org/wiki/Rumours_(album)" target="_blank">Rumours - Fleetwood Mac</a></li>
    </ul>
    <ul data-type="taskList">
        <li data-type="taskItem" data-checked="true">flour</li>
        <li data-type="taskItem" data-checked="true">baking powder</li>
        <li data-type="taskItem" data-checked="true">salt</li>
        <li data-type="taskItem" data-checked="false">sugar</li>
        <li data-type="taskItem" data-checked="false">milk</li>
        <li data-type="taskItem" data-checked="false">eggs</li>
        <li data-type="taskItem" data-checked="false">butter</li>
      </ul>
    <table>`;
  // prose-sm sm:prose-base lg:prose-lg xl:prose-2xl prose-li:text-sm prose-ul:text-sm prose-ol:text-sm prose-a:text-sm
  return (
    <div className="w-full flex justify-between">
      <div className="mx-auto flex flex-col">
        <EditorProvider
          immediatelyRender={false}
          editorProps={{
            attributes: {
              class:
                "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl max-w-[1150px] mx-auto focus:outline-none border p-24 bg-white rounded-md shadow-md",
            },
          }}
          slotBefore={<Toolbar />}
          extensions={extensions}
          content={content}
        >
          <BubbleMenu editor={null} tippyOptions={{ duration: 100 }}>
            <BubbleMenuBar />
          </BubbleMenu>
          {/*<FloatingMenu*/}
          {/*  editor={null}*/}
          {/*  tippyOptions={{ duration: 100, placement: "bottom-start" }}*/}
          {/*>*/}
          {/*  <FloatingMenuBar />*/}
          {/*</FloatingMenu>*/}
          <MemorizedToC items={items} />
          <CharactersAndWordCount />
        </EditorProvider>
      </div>
    </div>
  );
};

export default Tiptap;

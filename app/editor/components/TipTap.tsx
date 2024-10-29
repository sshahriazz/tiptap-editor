"use client";

import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import { BubbleMenu, EditorProvider } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useState } from "react";
import { ToC } from "./TOC";
import Toolbar from "./toolbar/Toolbar";

import { Image } from "../extensions/image/Image";

import { FontSize } from "@/app/editor/extensions/fontsize";
import Column from "@/app/editor/extensions/multi-column/Column";
import Columns from "@/app/editor/extensions/multi-column/Columns";
import { fileToBase64, randomId } from "@/app/editor/extensions/utils";
import { FileHandler } from "@tiptap-pro/extension-file-handler";
import TableOfContents from "@tiptap-pro/extension-table-of-contents";
import { Link } from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { SlashCommand } from "../extensions/SlashCommand";
import { Table, TableCell, TableHeader, TableRow } from "../extensions/Table";
import "../extensions/Table/table.css";
import { TableOfContentsNode } from "../extensions/TableOfContentsNode";
import { default as BubbleMenuBar } from "./toolbar/BubbleMenuBar";

// const PdfGeneration = dynamic(() => import('@/app/editor/components/PDFGeneration'), {ssr: false});

const MemorizedToC = React.memo(ToC);

const Tiptap = () => {
    const [items, setItems] = useState<any>([]);

    const extensions = [
        StarterKit,
        Underline,
        Highlight.configure({
            multicolor: true,
        }),
        FontSize,
        FileHandler.configure({
            allowedMimeTypes: [
                "image/png",
                "image/jpeg",
                "image/gif",
                "image/webp",
            ],
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
                            .insertContentAt(
                                currentEditor.state.selection.anchor,
                                {
                                    type: "image",
                                    attrs: {
                                        src: fileReader.result,
                                    },
                                }
                            )
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
        TableOfContents,
        TableOfContentsNode,
        Link.configure({
            openOnClick: true,
            autolink: true,
            defaultProtocol: "https",
        }),
        TextAlign.configure({
            types: ["heading", "paragraph"],
        }),
        // TableOfContents.configure({
        //     getIndex: getHierarchicalIndexes,
        //     onUpdate(content) {
        //         setItems(content);
        //     },
        // }),
        Columns,
        Column,
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
    const content = `<p>Hello World! 🌎️</p>   <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th colSpan="3">Description</th>
            </tr>
            <tr>
              <td>Cyndi Lauper</td>
              <td>Singer</td>
              <td>Songwriter</td>
              <td>Actress</td>
            </tr>
          </tbody>
        </table>`;
    // prose-sm sm:prose-base lg:prose-lg xl:prose-2xl prose-li:text-sm prose-ul:text-sm prose-ol:text-sm prose-a:text-sm
    return (
        <div className="w-full flex justify-between">
            <div className="mx-auto flex flex-col">
                <EditorProvider
                    immediatelyRender={false}
                    editorProps={{
                        attributes: {
                            class: "prose max-w-[950px] mx-auto focus:outline-none border p-24 bg-white rounded-md shadow-md",
                        },
                    }}
                    slotBefore={<Toolbar />}
                    extensions={extensions}
                    content={content}
                >
                    <BubbleMenu editor={null} tippyOptions={{ duration: 100 }}>
                        <BubbleMenuBar />
                    </BubbleMenu>
                    {/* <FloatingMenu
                        editor={null}
                        tippyOptions={{
                            duration: 100,
                            placement: "bottom-start",
                        }}
                    >
                        <FloatingMenuBar />
                    </FloatingMenu> */}
                    <MemorizedToC items={items} />
                </EditorProvider>
            </div>
        </div>
    );
};

export default Tiptap;

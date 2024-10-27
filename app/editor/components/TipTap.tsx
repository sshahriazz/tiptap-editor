"use client";

import {BubbleMenu, EditorProvider, FloatingMenu,} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import TextStyle from "@tiptap/extension-text-style";
import {Color} from "@tiptap/extension-color";
import Toolbar from "./toolbar/Toolbar";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import FileHandler from "@tiptap-pro/extension-file-handler";
import Underline from "@tiptap/extension-underline";
import {ToC} from "./TOC";
import React, {Suspense, useState} from "react";

import TableOfContents, {getHierarchicalIndexes,} from "@tiptap-pro/extension-table-of-contents";
import {Link} from "@tiptap/extension-link";

import dynamic from "next/dynamic";

const PdfGeneration = dynamic(() => import('@/app/editor/components/PDFGeneration'), {ssr: false});


const MemorizedToC = React.memo(ToC);

const Tiptap = () => {
    const [items, setItems] = useState<any>([]);

    const extensions = [
        StarterKit,
        Underline,
        Highlight.configure({
            multicolor: true,
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
        Image,
        Highlight,
        Table.configure({
            resizable: true,
        }),
        TableCell,
        TableHeader,
        TableRow,
        Link.configure({
            openOnClick: true,
            autolink: true,
            defaultProtocol: 'https',
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


    return (
        <div className="w-full">


            <EditorProvider
                immediatelyRender={false}
                editorProps={{
                    attributes: {
                        class:
                            "prose bg-white focus:outline-none mx-auto",
                    },
                }}
                slotBefore={<Toolbar/>}
                extensions={extensions}
                content={content}
            >

                <BubbleMenu editor={null} tippyOptions={{duration: 100}}>
                    <Toolbar/>
                </BubbleMenu>

                <FloatingMenu editor={null} tippyOptions={{duration: 100}}>
                    <Toolbar/>
                </FloatingMenu>
                <MemorizedToC items={items}/>
                <Suspense fallback={<div>Loading...</div>}>

                    <PdfGeneration/>
                </Suspense>
            </EditorProvider>
        </div>
    );
};

export default Tiptap;

"use client";

import {BubbleMenu, EditorContent} from "@tiptap/react";
import React from "react";
import {default as BubbleMenuBar} from "./toolbar/BubbleMenuBar";
import {useBlockEditor} from "@/app/editor/hooks/useRichEditor";
import Toolbar from "@/app/editor/components/toolbar/Toolbar";

// const PdfGeneration = dynamic(() => import('@/app/editor/components/PDFGeneration'), {ssr: false});

// const MemorizedToC = React.memo(ToC);

const Tiptap = () => {

    const {editor} = useBlockEditor();

    if (!editor) {
        return null
    }


    return (
        <div className="w-full flex justify-between">
            <div className="mx-auto flex flex-col">
                <Toolbar editor={editor}/>
                <EditorContent editor={editor}/>
                <BubbleMenu editor={editor} tippyOptions={{duration: 100}}>
                    <BubbleMenuBar editor={editor}/>
                </BubbleMenu>
            </div>
        </div>
    );
};

export default Tiptap;

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
    // const [items, setItems] = useState<any>([]);
    // const [limit] = useState(500);


    // prose-sm sm:prose-base lg:prose-lg xl:prose-2xl prose-li:text-sm prose-ul:text-sm prose-ol:text-sm prose-a:text-sm
    return (
        <div className="w-full flex justify-between">
            <div className="mx-auto flex flex-col">
                {/*<EditorProvider*/}
                {/*    immediatelyRender={false}*/}
                {/*    editorProps={{*/}
                {/*        attributes: {*/}
                {/*            class:*/}
                {/*                "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl max-w-[1150px] mx-auto focus:outline-none border p-24 bg-white rounded-md shadow-md",*/}
                {/*        },*/}
                {/*    }}*/}
                {/*    slotBefore={<Toolbar/>}*/}
                {/*    extensions={extensions}*/}
                {/*    content={content}*/}
                {/*>*/}
                <Toolbar editor={editor}/>
                <EditorContent editor={editor}/>
                <BubbleMenu editor={editor} tippyOptions={{duration: 100}}>
                    <BubbleMenuBar/>
                </BubbleMenu>
                {/*<FloatingMenu*/}
                {/*  editor={null}*/}
                {/*  tippyOptions={{ duration: 100, placement: "bottom-start" }}*/}
                {/*>*/}
                {/*  <FloatingMenuBar />*/}
                {/*</FloatingMenu>*/}
                {/*<MemorizedToC items={items}/>*/}
                {/*<CharactersAndWordCount/>*/}
                {/*</EditorProvider>*/}
            </div>
        </div>
    );
};

export default Tiptap;

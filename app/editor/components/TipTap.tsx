"use client";

import Toolbar from "@/app/editor/components/toolbar/Toolbar";
import ColumnsMenu from "@/app/editor/extensions/multi-column/menus/ColumnsMenu";
import { useBlockEditor } from "@/app/editor/hooks/useRichEditor";
import { BubbleMenu, EditorContent } from "@tiptap/react";
import { useRef } from "react";
import "../../styles/index.css";
import { TableColumnMenu, TableRowMenu } from "../extensions/Table/menus";
import { default as BubbleMenuBar } from "./toolbar/BubbleMenuBar";

// const PdfGeneration = dynamic(() => import('@/app/editor/components/PDFGeneration'), {ssr: false});

// const MemorizedToC = React.memo(ToC);

const Tiptap = () => {
  const { editor } = useBlockEditor();
  const menuContainerRef = useRef(null);

  if (!editor) {
    return null;
  }

  return (
    <div ref={menuContainerRef} className="w-full flex justify-between mt-6">
      <div className="mx-auto flex flex-col ">
        <Toolbar editor={editor} />
        <EditorContent editor={editor} />
        <TableRowMenu editor={editor} appendTo={menuContainerRef} />
        <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <BubbleMenuBar editor={editor} />
        </BubbleMenu>
        <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
      </div>
    </div>
  );
};

export default Tiptap;

import { Button, ButtonGroup } from "@nextui-org/react";
import React from "react";
import { EMenuProps } from "../../lib/type";
import { Heading1Icon, Heading2Icon } from "lucide-react";
import { useCurrentEditor } from "@tiptap/react";

const Heading = () => {
    const {
        editor
      } = useCurrentEditor()
    
      if (!editor) {
        return null;
      }
  return (
    <ButtonGroup>
      <Button
        isIconOnly
        size="sm"
        onPress={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        <Heading1Icon size={16} />
      </Button>
      <Button
        isIconOnly
        size="sm"
        onPress={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        <Heading2Icon size={16} />
      </Button>
      <Button
        isIconOnly
        size="sm"
        onPress={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        H3
      </Button>
      <Button
        isIconOnly
        size="sm"
        onPress={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        H4
      </Button>
      <Button
        isIconOnly
        size="sm"
        onPress={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
      >
        H5
      </Button>
      <Button
        isIconOnly
        size="sm"
        onPress={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
      >
        H6
      </Button>
    </ButtonGroup>
  );
};

export default Heading;

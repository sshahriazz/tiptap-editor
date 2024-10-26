import React from "react";
import { Button, ButtonGroup } from "@nextui-org/react";
import { AlignCenterVerticalIcon, AlignVerticalJustifyStart, AlignStartVerticalIcon, AlignEndVerticalIcon } from "lucide-react";
import { useCurrentEditor } from "@tiptap/react";

const TextAlignment = () => {
  const {
    editor
  } = useCurrentEditor()

  if (!editor) {
    return null;
  }
  return (
    <ButtonGroup>
      
      <Button
        variant="flat"
        isIconOnly
        size="sm"
        onPress={() => editor.chain().focus().setTextAlign("left").run()}
        className={
          editor.isActive({ textAlign: "left" }) ? "text-blue-500" : ""
        }
      >
       <AlignStartVerticalIcon size={16} />
      </Button>
      <Button
        variant="flat"
        isIconOnly
        size="sm"
        onPress={() => editor.chain().focus().setTextAlign("center").run()}
        className={
          editor.isActive({ textAlign: "center" }) ? "text-blue-500" : ""
        }
      >
        <AlignCenterVerticalIcon size={16} />
      </Button>
      <Button
        variant="flat"
        isIconOnly
        size="sm"
        onPress={() => editor.chain().focus().setTextAlign("right").run()}
        className={
          editor.isActive({ textAlign: "right" }) ? "text-blue-500" : ""
        }
      >
        <AlignEndVerticalIcon size={16}/>
      </Button>
      <Button
        variant="flat"
        isIconOnly
        size="sm"
        onPress={() => editor.chain().focus().setTextAlign("justify").run()}
        className={
          editor.isActive({ textAlign: "justify" }) ? "text-blue-500" : ""
        }
      >
        <AlignVerticalJustifyStart size={16}/>
      </Button>
    </ButtonGroup>
  );
};

export default TextAlignment;

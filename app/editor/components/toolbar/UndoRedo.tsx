import { Button, ButtonGroup } from "@nextui-org/react";
import React from "react";
import { EMenuProps } from "../../lib/type";
import { Redo2Icon, Undo2Icon } from "lucide-react";
import { useCurrentEditor } from "@tiptap/react";

const UndoRedo = () => {
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
        onPress={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <Undo2Icon size={16} />
      </Button>
      <Button
        variant="flat"
        isIconOnly
        size="sm"
        onPress={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <Redo2Icon size={16} />
      </Button>
    </ButtonGroup>
  );
};

export default UndoRedo;

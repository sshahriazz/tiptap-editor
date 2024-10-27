import { Button } from "@nextui-org/react";
import React from "react";
import { useCurrentEditor } from "@tiptap/react";

const HorizontalRule = () => {
  const {
    editor
  } = useCurrentEditor()

  if (!editor) {
    return null;
  }
  return (
    <Button
      variant="flat"
      isIconOnly
      size="sm"
      onPress={() => editor.chain().focus().setHorizontalRule().run()}
    >
      ---
    </Button>
  );
};

export default HorizontalRule;

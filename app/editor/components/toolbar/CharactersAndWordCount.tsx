import { Button } from "@nextui-org/react";
import { useCurrentEditor } from "@tiptap/react";
import React from "react";

const CharactersAndWordCount = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }
  return (
    <div className={`flex gap-2`}>
      <Button variant="flat" size="sm">
        {editor.storage.characterCount.characters()} characters
      </Button>
      <Button variant="flat" size="sm">
        {editor.storage.characterCount.words()} words
      </Button>
    </div>
  );
};

export default CharactersAndWordCount;

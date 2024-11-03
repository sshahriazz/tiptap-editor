import { Button } from "@nextui-org/react";
import React from "react";

const Paragraph = ({ editor }: any) => {
  return (
    <>
      <Button
        variant="flat"
        size={"sm"}
        isIconOnly
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`${editor.isActive("paragraph") ? "text-primary-500" : ""} `}
      >
        <span className="text-sm">P</span>
      </Button>
    </>
  );
};

export default Paragraph;

import { Button, ButtonGroup } from "@nextui-org/react";
import { MessageSquareQuote } from "lucide-react";
import React from "react";

const QuoteUnquote = ({ editor }: any) => {
  return (
    <>
      <ButtonGroup>
        <Button
          variant="flat"
          size="sm"
          isIconOnly
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          <MessageSquareQuote size={16} />
        </Button>
        <Button
          variant="flat"
          size="sm"
          onClick={() => editor.chain().focus().setBlockquote().run()}
          disabled={!editor.can().setBlockquote()}
        >
          Set blockquote
        </Button>
        <Button
          variant="flat"
          size="sm"
          onClick={() => editor.chain().focus().unsetBlockquote().run()}
          disabled={!editor.can().unsetBlockquote()}
        >
          Unset blockquote
        </Button>
      </ButtonGroup>
    </>
  );
};

export default QuoteUnquote;

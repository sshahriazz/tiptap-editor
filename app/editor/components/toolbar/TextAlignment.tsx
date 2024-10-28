import { Button, ButtonGroup } from "@nextui-org/react";
import { useCurrentEditor } from "@tiptap/react";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";
import ActionButton from "../ActionButton";

const TextAlignment = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }
  return (
    <ButtonGroup>
      <ActionButton contentForMac={<p>Left</p>} contentForWindows={<p>Left</p>}>
        <Button
          variant="flat"
          isIconOnly
          size="sm"
          onPress={() => editor.chain().focus().setTextAlign("left").run()}
          className={`${
            editor.isActive({ textAlign: "left" }) ? "text-blue-500" : ""
          } bg-default/40`}
        >
          <AlignLeft size={16} />
        </Button>
      </ActionButton>
      <ActionButton
        contentForMac={<p>Center</p>}
        contentForWindows={<p>Center</p>}
      >
        <Button
          variant="flat"
          isIconOnly
          size="sm"
          onPress={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" }) ? "text-blue-500" : ""
          }
        >
          <AlignCenter size={16} />
        </Button>
      </ActionButton>
      <ActionButton
        contentForMac={<p>Right</p>}
        contentForWindows={<p>Right</p>}
      >
        <Button
          variant="flat"
          isIconOnly
          size="sm"
          onPress={() => editor.chain().focus().setTextAlign("right").run()}
          className={
            editor.isActive({ textAlign: "right" }) ? "text-blue-500" : ""
          }
        >
          <AlignRight size={16} />
        </Button>
      </ActionButton>
      <ActionButton
        contentForMac={<p>Justify</p>}
        contentForWindows={<p>Justify</p>}
      >
        <Button
          variant="flat"
          isIconOnly
          size="sm"
          onPress={() => editor.chain().focus().setTextAlign("justify").run()}
          className={
            editor.isActive({ textAlign: "justify" }) ? "text-blue-500" : ""
          }
        >
          <AlignJustify size={16} />
        </Button>
      </ActionButton>
    </ButtonGroup>
  );
};

export default TextAlignment;

import { Button, ButtonGroup, Kbd } from "@nextui-org/react";
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
      <ActionButton
        contentForMac={
          <div className="flex items-center">
            <p className="mr-2">Left</p>{" "}
            <Kbd keys={["command", "shift"]}>L</Kbd>
          </div>
        }
        contentForWindows={
          <div className="flex items-center">
            <p className="mr-2">Left</p>
            <p>ctrl + shift + L</p>
          </div>
        }
      >
        <Button
          variant="flat"
          isIconOnly
          size="sm"
          onPress={() => editor.chain().focus().setTextAlign("left").run()}
          className={
            editor.isActive({ textAlign: "left" }) ? "text-blue-500" : ""
          }
        >
          <AlignLeft size={16} />
        </Button>
      </ActionButton>
      <ActionButton
        contentForMac={
          <div className="flex items-center">
            <p className="mr-2">Center</p>{" "}
            <Kbd keys={["command", "shift"]}>E</Kbd>
          </div>
        }
        contentForWindows={
          <div className="flex items-center">
            <p className="mr-2">Center</p>
            <p>ctrl + shift + L</p>
          </div>
        }
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
        contentForMac={
          <div className="flex items-center">
            <p className="mr-2">Right</p>{" "}
            <Kbd keys={["command", "shift"]}>R</Kbd>
          </div>
        }
        contentForWindows={
          <div className="flex items-center">
            <p className="mr-2">Right</p>
            <p>ctrl + shift + R</p>
          </div>
        }
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
        contentForMac={
          <div className="flex items-center">
            <p className="mr-2">Justify</p>{" "}
            <Kbd keys={["command", "shift"]}>J</Kbd>
          </div>
        }
        contentForWindows={
          <div className="flex items-center">
            <p className="mr-2 text-white">Justify</p>
            <p>ctrl + shift + J</p>
          </div>
        }
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

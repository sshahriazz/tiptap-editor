import { Button, ButtonGroup, Kbd } from "@nextui-org/react";
import { useCurrentEditor } from "@tiptap/react";
import { Redo2Icon, Undo2Icon } from "lucide-react";
import ActionButton from "../ActionButton";

const UndoRedo = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <ButtonGroup>
      <ActionButton
        contentForMac={
          <div className="flex items-center">
            <p className="mr-2">Undo</p> <Kbd keys={["command"]}>Z</Kbd>
          </div>
        }
        contentForWindows={
          <div className="flex items-center">
            <p className="mr-2">Undo</p>
            <p>ctrl + Z</p>
          </div>
        }
      >
        <Button
          isIconOnly
          size="sm"
          onPress={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo2Icon size={16} />
        </Button>
      </ActionButton>
      <ActionButton
        contentForMac={
          <div className="flex items-center">
            <p className="mr-2">Redo</p> <Kbd keys={["command"]}>Y</Kbd>
          </div>
        }
        contentForWindows={
          <div className="flex items-center">
            <p className="mr-2">Redo</p>
            <p>ctrl + Y</p>
          </div>
        }
      >
        <Button
          isIconOnly
          size="sm"
          onPress={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo2Icon size={16} />
        </Button>
      </ActionButton>
    </ButtonGroup>
  );
};

export default UndoRedo;

import { Button, ButtonGroup } from "@nextui-org/react";
import { Subscript, Superscript } from "lucide-react";
import ActionButton from "../ActionButton";

const SubAndSupScript = ({ editor }: any) => {
  return (
    <ButtonGroup>
      <ActionButton
        contentForMac={
          <div className="flex gap-1 items-center">
            <span>Subscript</span>
          </div>
        }
        contentForWindows={
          <div className="flex gap-1 items-center">
            <span className="pr-1">Subscript</span>
          </div>
        }
      >
        <Button
          variant="flat"
          isIconOnly
          size="sm"
          onPress={() => editor.chain().focus().toggleSuperscript().run()}
          className={editor.isActive("superscript") ? "text-primary" : ""}
        >
          <Superscript size={16} className="mb-1" />
        </Button>
      </ActionButton>
      <ActionButton
        contentForMac={
          <div className="flex gap-1 items-center">
            <span>Superscript</span>
          </div>
        }
        contentForWindows={
          <div className="flex gap-1 items-center">
            <span className="pr-1">Superscript</span>{" "}
          </div>
        }
      >
        <Button
          variant="flat"
          isIconOnly
          size="sm"
          onClick={() => editor.chain().focus().toggleSubscript().run()}
          className={editor.isActive("subscript") ? "text-primary" : ""}
        >
          <Subscript size={16} className="mt-1" />
        </Button>
      </ActionButton>
    </ButtonGroup>
  );
};

export default SubAndSupScript;

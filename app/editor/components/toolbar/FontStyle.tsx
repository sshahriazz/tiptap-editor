import { Button, ButtonGroup, Kbd } from "@nextui-org/react";
import {
  BoldIcon,
  Code,
  ItalicIcon,
  SquareCode,
  Strikethrough,
  UnderlineIcon,
} from "lucide-react";
import ActionButton from "../ActionButton";

const FontStyle = ({ editor }: any) => {
  return (
    <ButtonGroup>
      <ActionButton
        contentForMac={
          <div className="flex items-center">
            <p className="mr-2">Bold</p> <Kbd keys={["command"]}>B</Kbd>
          </div>
        }
        contentForWindows={
          <p className="flex items-center">
            <span className="mr-2">Bold</span>
            <span>ctrl + B</span>
          </p>
        }
      >
        <Button
          variant="flat"
          isIconOnly
          size="sm"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`${editor.isActive("bold") ? "text-primary-500" : ""} 
          `}
        >
          <BoldIcon size={16} />
        </Button>
      </ActionButton>
      <ActionButton
        contentForMac={
          <div className="flex items-center">
            <p className="mr-2">Italic</p> <Kbd keys={["command"]}>I</Kbd>
          </div>
        }
        contentForWindows={
          <div className="flex items-center">
            <p className="mr-2">Italic</p>
            <p>ctrl + I</p>
          </div>
        }
      >
        <Button
          variant="flat"
          isIconOnly
          size="sm"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`${editor.isActive("italic") ? "text-primary-500" : ""} `}
        >
          <ItalicIcon size={16} />
        </Button>
      </ActionButton>
      <ActionButton
        contentForMac={
          <div className="flex items-center">
            <p className="mr-2">Underline</p> <Kbd keys={["command"]}>U</Kbd>
          </div>
        }
        contentForWindows={
          <div className="flex items-center">
            <p className="mr-2">Underline</p>
            <p>ctrl + U</p>
          </div>
        }
      >
        <Button
          variant="flat"
          isIconOnly
          size="sm"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`${
            editor.isActive("underline") ? "text-primary-500" : ""
          }`}
        >
          <UnderlineIcon size={16} />
        </Button>
      </ActionButton>
      <ActionButton
        contentForMac={
          <div className="flex items-center">
            <p>Strike</p>
          </div>
        }
        contentForWindows={
          <div className="flex items-center">
            <p>Strike</p>
          </div>
        }
      >
        <Button
          variant="flat"
          isIconOnly
          size="sm"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`${editor.isActive("strike") ? "text-primary-500" : ""} `}
        >
          <Strikethrough size={16} />
        </Button>
      </ActionButton>
      <ActionButton
        contentForMac={
          <div className="flex items-center">
            <p>Code</p>
          </div>
        }
        contentForWindows={
          <div className="flex items-center">
            <p>Code</p>
          </div>
        }
      >
        <Button
          variant="flat"
          isIconOnly
          size="sm"
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={`${editor.isActive("strike") ? "text-primary-500" : ""} `}
        >
          <Code size={16} />
        </Button>
      </ActionButton>
      <ActionButton
        contentForMac={
          <div className="flex items-center">
            <p>Code block</p>{" "}
          </div>
        }
        contentForWindows={
          <div className="flex items-center">
            <p>Code block</p>
          </div>
        }
      >
        <Button
          variant="flat"
          isIconOnly
          size="sm"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`${editor.isActive("strike") ? "text-primary-500" : ""} `}
        >
          <SquareCode size={16} />
        </Button>
      </ActionButton>
    </ButtonGroup>
  );
};

export default FontStyle;

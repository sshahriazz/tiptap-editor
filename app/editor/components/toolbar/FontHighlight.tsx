import {
  Button,
  ButtonGroup,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { BaselineIcon, Highlighter, PaintRoller } from "lucide-react";
import { useState } from "react";
import { SketchPicker } from "react-color";
import ActionButton from "../ActionButton";

const FontHighlight = ({ editor }: any) => {
  const [color, setColor] = useState<string>(
    editor.getAttributes("textStyle").color || "#FFF"
  );

  return (
    <ButtonGroup>
      <ActionButton
        contentForMac={<p>Highlight color</p>}
        contentForWindows={<p>Highlight color</p>}
      >
        <Button
          variant="flat"
          isIconOnly
          size="sm"
          onClick={() =>
            editor.chain().focus().toggleHighlight({ color: "#FFFF00" }).run()
          }
          className={editor.isActive("highlight") ? "text-primary-500" : ""}
        >
          <Highlighter
            //    style={{ color: color }}
            size={16}
          />
        </Button>
      </ActionButton>
      <Popover>
        <PopoverTrigger>
          <Button
            variant="flat"
            isIconOnly
            size="sm"
            className={editor.isActive("highlight") ? "" : ""}
          >
            <ActionButton
              contentForMac={<p>Text background color</p>}
              contentForWindows={<p>Text background color</p>}
            >
              <span
                style={{ backgroundColor: color }}
                className="rounded-[2px]"
              >
                <BaselineIcon
                  style={{ color: "#000000" }}
                  className="font-bold m-0.5 "
                  size={16}
                />
              </span>
            </ActionButton>
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <SketchPicker
            styles={{
              default: {
                saturation: {
                  border: "1px solid #e2e8f0",
                  borderRadius: "4px",
                },
                picker: {
                  boxShadow: "none",
                },
              },
            }}
            color={editor.getAttributes("textStyle").color}
            onChangeComplete={(e) => {
              setColor(e.hex);

              editor.chain().focus().toggleHighlight({ color: e.hex }).run();
            }}
          />
        </PopoverContent>
      </Popover>
      {/* <ActionButton
        contentForMac={<p>Highlight remover</p>}
        contentForWindows={<p>Highlight remover</p>}
      >
        <Button
          variant="flat"
          isIconOnly
          size="sm"
          onClick={() => editor.chain().focus().setHighlight().run()}
          // disabled={!editor.isActive("highlight")}
        >
          <PaintRoller size={16} />
        </Button>
      </ActionButton> */}
    </ButtonGroup>
  );
};

export default FontHighlight;

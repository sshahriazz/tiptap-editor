import React, {useEffect, useState} from "react";
import {
  Button,
  ButtonGroup,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { SketchPicker } from "react-color";
import { BaselineIcon, BrushIcon, PaintRoller } from "lucide-react";
import { useCurrentEditor } from "@tiptap/react";

const FontHighlight = () => {
    const {
        editor
      } = useCurrentEditor()
    


  const [color, setColor] = useState<string>("#000000");

  useEffect(() => {
    if (!editor) {
      return () => {};
    }
    setColor(editor.getAttributes("highlight").color);
  }, [editor]);

    if (!editor) {
        return null;
    }

  return (
    <ButtonGroup>
      <Button
      isIconOnly
      size="sm"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={editor.isActive("highlight") ? "is-active" : ""}
      >
              
              <BrushIcon style={{ color: color }} size={16} />
      </Button>
      <Popover>
        <PopoverTrigger>
          <Button
          isIconOnly
          size="sm"
            className={
              editor.isActive("highlight", { color: color }) ? "is-active" : ""
            }
          >
            <BaselineIcon
              className="font-bold"
              style={{ color: color }}
              size={16}
            />
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

      <Button
      isIconOnly
      size="sm"
        onClick={() => editor.chain().focus().unsetHighlight().run()}
        disabled={!editor.isActive("highlight")}
      >
        <PaintRoller size={16} />
      </Button>
    </ButtonGroup>
  );
};

export default FontHighlight;

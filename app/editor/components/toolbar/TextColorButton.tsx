import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@nextui-org/react";
import { useCurrentEditor } from "@tiptap/react";
import { Baseline } from "lucide-react";
import { useState } from "react";
import ActionButton from "../ActionButton";

const colors = [
  { name: "black", hex: "#000000" },
  { name: "darkGray4", hex: "#434343" },
  { name: "darkGray3", hex: "#666666" },
  { name: "darkGray2", hex: "#999999" },
  { name: "darkGray1", hex: "#b7b7b7" },
  { name: "gray", hex: "#cccccc" },
  { name: "lightGray1", hex: "#d9d9d9" },
  { name: "lightGray2", hex: "#efefef", border: "#DADBDF" },
  { name: "lightGray3", hex: "#f3f3f3", border: "#DADBDF" },
  { name: "white", hex: "#ffffff", border: "#DADBDF" },
  { name: "redBerry", hex: "#980000" },
  { name: "red", hex: "#ff0000" },
  { name: "orange", hex: "#ff9900" },
  { name: "yellow", hex: "#ffff00" },
  { name: "green", hex: "#00ff00" },
  { name: "cyan", hex: "#00ffff" },
  { name: "cornflowerBlue", hex: "#4a86e8" },
  { name: "blue", hex: "#0000ff" },
  { name: "purple", hex: "#9900ff" },
  { name: "magenta", hex: "#ff00ff" },
  { name: "lightRedBerry3", hex: "#e6b8af" },
  { name: "lightRed3", hex: "#f4cccc" },
  { name: "lightOrange3", hex: "#fce5cd", border: "#DADBDF" },
  { name: "lightYellow3", hex: "#fff2cc", border: "#DADBDF" },
  { name: "lightGreen3", hex: "#d9ead3" },
  { name: "lightCyan3", hex: "#d0e0e3" },
  { name: "lightCornflowerBlue3", hex: "#c9daf8" },
  { name: "lightBlue3", hex: "#cfe2f3" },
  { name: "lightPurple3", hex: "#d9d2e9" },
  { name: "lightMagenta3", hex: "#ead1dc" },
  { name: "lightRedBerry2", hex: "#dd7e6b" },
  { name: "lightRed2", hex: "#ea9999" },
  { name: "lightOrange2", hex: "#f9cb9c", border: "#DADBDF" },
  { name: "lightYellow2", hex: "#ffe599", border: "#DADBDF" },
  { name: "lightGreen2", hex: "#b6d7a8" },
  { name: "lightCyan2", hex: "#a2c4c9" },
  { name: "lightCornflowerBlue2", hex: "#a4c2f4" },
  { name: "lightBlue2", hex: "#9fc5e8" },
  { name: "lightPurple2", hex: "#b4a7d6" },
  { name: "lightMagenta2", hex: "#d5a6bd" },
  { name: "lightRedBerry1", hex: "#cc4125" },
  { name: "lightRed1", hex: "#e06666" },
  { name: "lightOrange1", hex: "#f6b26b" },
  { name: "lightYellow1", hex: "#ffd966", border: "#DADBDF" },
  { name: "lightGreen1", hex: "#93c47d" },
  { name: "lightCyan1", hex: "#76a5af" },
  { name: "lightCornflowerBlue1", hex: "#6d9eeb" },
  { name: "lightBlue1", hex: "#6fa8dc" },
  { name: "lightPurple1", hex: "#8e7cc3" },
  { name: "lightMagenta1", hex: "#c27ba0" },
  { name: "darkRedBerry1", hex: "#a61c00" },
  { name: "darkRed1", hex: "#cc0000" },
  { name: "darkOrange1", hex: "#e69138" },
  { name: "darkYellow1", hex: "#f1c232" },
  { name: "darkGreen1", hex: "#6aa84f" },
  { name: "darkCyan1", hex: "#45818e" },
  { name: "darkCornflowerBlue1", hex: "#3c78d8" },
  { name: "darkBlue1", hex: "#3d85c6" },
  { name: "darkPurple1", hex: "#674ea7" },
  { name: "darkMagenta1", hex: "#a64d79" },
  { name: "darkRedBerry2", hex: "#85200c" },
  { name: "darkRed2", hex: "#990000" },
  { name: "darkOrange2", hex: "#b45f06" },
  { name: "darkYellow2", hex: "#bf9000" },
  { name: "darkGreen2", hex: "#38761d" },
  { name: "darkCyan2", hex: "#134f5c" },
  { name: "darkCornflowerBlue2", hex: "#1155cc" },
  { name: "darkBlue2", hex: "#0b5394" },
  { name: "darkPurple2", hex: "#351c75" },
  { name: "darkMagenta2", hex: "#741b47" },
  { name: "darkRedBerry3", hex: "#5b0f00" },
  { name: "darkRed3", hex: "#660000" },
  { name: "darkOrange3", hex: "#783f04" },
  { name: "darkYellow3", hex: "#7f6000" },
  { name: "darkGreen3", hex: "#274e13" },
  { name: "darkCyan3", hex: "#0c343d" },
  { name: "darkCornflowerBlue3", hex: "#1c4587" },
  { name: "darkBlue3", hex: "#073763" },
  { name: "darkPurple3", hex: "#20124d" },
  { name: "darkMagenta3", hex: "#4c1130" },
];

const TextColorButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [color, setColor] = useState<string>("#000000");

  const { editor } = useCurrentEditor();
  if (!editor) {
    return null;
  }
  return (
    <>
      <Popover
        isOpen={isModalOpen}
        onOpenChange={(open) => setIsModalOpen(open)}
        classNames={{
          content: "px-1",
        }}
      >
        <PopoverTrigger>
          <Button
            variant="flat"
            size={"sm"}
            className={`${
              editor.isActive("textStyle", {
                color: editor.getAttributes("textStyle").color,
              })
                ? `text-${color}`
                : ""
            } `}
            isIconOnly
          >
            <ActionButton
              contentForMac={<p>Text color</p>}
              contentForWindows={<p>Text color</p>}
            >
              <Baseline size={16} />
            </ActionButton>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-4">
          <div className="control-group">
            <div className="button-group">
              <div className="grid grid-cols-10 gap-1">
                {colors.map((color) => (
                  <button
                    style={{
                      backgroundColor: color.hex,
                      border: `1px solid ${color.border}`,
                    }}
                    key={color.hex}
                    onClick={() => {
                      editor.chain().focus().setColor(color?.hex).run();
                      setColor(color?.hex);
                    }}
                    className={
                      editor.isActive("textStyle", {
                        color: color?.hex,
                      })
                        ? "is-active"
                        : "w-5 h-5 rounded-full"
                    }
                    data-testid="setGreen"
                  ></button>
                ))}
              </div>
            </div>
            <br />
            <button
              onClick={() => {
                onOpen();
                setIsModalOpen(false);
              }}
            >
              Custom color picker
            </button>
            <input
              type="color"
              className="w-5 h-5 rounded-full border-none outline-none"
              onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
                editor.chain().focus().setColor(event.target.value).run()
              }
              value={editor.getAttributes("textStyle").color}
              data-testid="setColor"
            />
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default TextColorButton;

"use client";

import { useCallback, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button, ButtonGroup, Input } from "@nextui-org/react";
import ActionButton from "../../components/ActionButton";

export default function FontSize({ editor }: any) {
  const [inputValue, setInputValue] = useState("16");
  const [isValid, setIsValid] = useState(true);

  const getFontSize = useCallback(() => {
    return editor!.getAttributes("textStyle").fontSize ?? "16";
  }, [editor]);

  //   useEffect(() => {
  //     console.log("logging");
  //     setInputValue(getFontSize() ?? "16");
  //     console.log(getFontSize(), "fontSize");
  //   }, [getFontSize]);

  const parseInput = (value: string): number => {
    const num = parseFloat(value);
    return /^\d*\.?\d+$/.test(value) ? num : NaN;
  };

  const updateFontSize = useCallback((newSize: number) => {
    const validSize = Math.max(10, Math.min(newSize, 99));

    setInputValue(validSize.toString());
    setIsValid(true);
  }, []);

  const changeFontSize = (delta: number) => {
    const currentFontSize = parseInput(getFontSize());
    const size = currentFontSize ? parseInput(inputValue) : currentFontSize;

    if (!isNaN(size)) {
      const newSize = size + delta;
      updateFontSize(newSize);
    } else updateFontSize(size);

    editor.chain().focus().setFontSize(inputValue).run();
  };

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLInputElement>
  ) => {
    const value = (e.target as HTMLInputElement).value;
    setInputValue(value);

    const size = parseInput(value);
    setIsValid(!isNaN(size) && size > 10);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const size = parseInput(inputValue);
      if (size > 10) {
        updateFontSize(size);
        editor.chain().focus().setFontSize(size).run();
      } else {
        setInputValue("16");
        setIsValid(false);
      }
    } else {
      handleInputChange(e);
    }
  };
  //   const handleInputBlur = () => {
  //     const size = parseInput(inputValue);
  //     if (isNaN(size) || size < 10) {
  //       updateFontSize(16);
  //     } else {
  //       updateFontSize(size);
  //     }
  //   };

  //   useEffect(() => {
  //     if (isValid && editor) {
  //       editor.chain().focus().setFontSize(inputValue).run();
  //     }
  //   }, [editor, isValid, inputValue]);

  return (
    <ButtonGroup>
      <ActionButton
        contentForMac={
          <div className="flex items-center">
            <p className="mr-2">Font</p>
          </div>
        }
        contentForWindows={
          <div className="flex items-center">
            <p className="mr-2">Bold</p>
          </div>
        }
      >
        <Button
          variant={"flat"}
          size="sm"
          isIconOnly
          onClick={() => changeFontSize(-1)}
          aria-label="Decrease font size"
        >
          <Minus className="h-4 w-4" />
        </Button>
      </ActionButton>
      <ActionButton
        contentForMac={
          <div className="flex items-center">
            <p className="mr-2">Font size decrease</p>
          </div>
        }
        contentForWindows={
          <div className="flex items-center">
            <p className="mr-2">Font size decrease</p>
          </div>
        }
      >
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          //onBlur={handleInputBlur}
          size="sm"
          radius="none"
          className={`w-9 text-center ${
            isValid ? "text-primary" : "text-red-500"
          }`}
          classNames={{
            base: "h-8  ",
            mainWrapper: "h-8",
            input: ["text-small ,bg-default/40"],
            inputWrapper: "h-8 bg-default/40",
          }}
          aria-label="Font size"
          aria-invalid={!isValid}
          style={{ color: isValid ? "inherit" : "red" }}
        />
      </ActionButton>
      <ActionButton
        contentForMac={
          <div className="flex items-center">
            <p className="mr-2">Font size increase</p>
          </div>
        }
        contentForWindows={
          <div className="flex items-center">
            <p className="mr-2">Font size increase</p>
          </div>
        }
      >
        <Button
          variant={"flat"}
          size={"sm"}
          isIconOnly
          onClick={() => changeFontSize(1)}
          aria-label="Increase font size"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </ActionButton>
    </ButtonGroup>
  );
}

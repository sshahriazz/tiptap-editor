import React from "react";
import ActionButton from "../ActionButton";
import { Button } from "@nextui-org/react";
import { SquareSplitHorizontal } from "lucide-react";

const AddRowSplit = ({ editor }: any) => {
  return (
    <ActionButton
      contentForMac={
        <div className="flex gap-1 items-center">
          <span>Add Col</span>
          {/* <Kbd keys={["shift"]}></Kbd>+
              <Kbd keys={["enter"]}></Kbd> */}
        </div>
      }
      contentForWindows={
        <div className="flex gap-1 items-center">
          <span className="pr-1">Add Col</span>
          {/* <Kbd keys={["shift"]}></Kbd>
              +<Kbd keys={["enter"]}></Kbd> */}
        </div>
      }
    >
      <Button
        variant="flat"
        size="sm"
        isIconOnly
        onPress={() =>
          editor
            .chain()
            .focus()
            .setColumns()
            .focus(editor.state.selection.head - 1)
            .run()
        }
      >
        <SquareSplitHorizontal size={16} />
      </Button>
    </ActionButton>
  );
};

export default AddRowSplit;

import { useCurrentEditor } from "@tiptap/react";
import React from "react";
import ActionButton from "../ActionButton";
import { Button } from "@nextui-org/react";
import { ListChecks } from "lucide-react";

const TaskList = () => {
  const { editor } = useCurrentEditor();
  if (!editor) {
    return null;
  }
  return (
    <div>
      <ActionButton contentForMac={"Task List"} contentForWindows={"Task List"}>
        <Button
          size="sm"
          variant="flat"
          onPress={() => editor.chain().focus().toggleTaskList().run()}
          isIconOnly
        >
          <ListChecks size={16} />
        </Button>
      </ActionButton>
    </div>
  );
};

export default TaskList;

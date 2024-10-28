import {
  Button,
  Card,
  CardBody,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useCurrentEditor } from "@tiptap/react";
import { Table } from "lucide-react";
import FontStyle from "./FontStyle";
import Link from "./Link";

const BubbleMenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  console.log(editor.isActive("table"), "editor?.isActive");

  const isTableActive = editor.isActive("table");

  return (
    <Card className={"sticky top-0 z-50 mt-3 w-fit mx-auto mb-4"}>
      <CardBody className={"flex-row gap-3"}>
        <FontStyle />
        <Link />
        {isTableActive && (
          <div className={"flex gap-3"}>
            <Popover>
              <PopoverTrigger>
                <Button
                  variant="flat"
                  isIconOnly
                  size="sm"
                  className="bg-default/40"
                >
                  <Table size={16} />
                </Button>
              </PopoverTrigger>
              {/* add list here */}
              <PopoverContent>
                <button
                  className="bg-default/40"
                  onClick={() => editor.chain().focus().addColumnBefore().run()}
                >
                  Add Column Before
                </button>
                <button
                  onClick={() => editor.chain().focus().addColumnAfter().run()}
                >
                  Add Column After
                </button>
                <button
                  onClick={() => editor.chain().focus().addRowBefore().run()}
                >
                  Add Row Before
                </button>
                <button
                  onClick={() => editor.chain().focus().addRowAfter().run()}
                >
                  Add Row After
                </button>
                <button
                  onClick={() => editor.chain().focus().deleteColumn().run()}
                >
                  Delete Column
                </button>
                <button
                  onClick={() => editor.chain().focus().deleteRow().run()}
                >
                  Delete Row
                </button>
                <button
                  onClick={() => editor.chain().focus().deleteTable().run()}
                >
                  Delete Table
                </button>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default BubbleMenuBar;

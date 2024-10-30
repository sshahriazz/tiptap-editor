import {
  Button,
  Card,
  CardBody,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useCurrentEditor } from "@tiptap/react";
import FontStyle from "./FontStyle";
import Link from "./Link";
import { Table } from "lucide-react";

const BubbleMenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  console.log(editor.isActive("table"), "editor?.isActive");

  const isTableActive = editor.isActive("table");
  const tableActions = [
    {
      key: "Add Column Before",
      action: () => editor.chain().focus().addColumnBefore().run(),
    },
    {
      key: "Add Column After",
      action: () => editor.chain().focus().addColumnAfter().run(),
    },
    {
      key: "Add Row Before",
      action: () => editor.chain().focus().addRowBefore().run(),
    },
    {
      key: "Add Row After",
      action: () => editor.chain().focus().addRowAfter().run(),
    },
    {
      key: "Delete Column",
      action: () => editor.chain().focus().deleteColumn().run(),
    },
    {
      key: "Delete Row",
      action: () => editor.chain().focus().deleteRow().run(),
    },
    {
      key: "Delete Table",
      action: () => editor.chain().focus().deleteTable().run(),
    },
  ];

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
              <PopoverContent>
                <Listbox
                  aria-label="Single selection example"
                  variant="flat"
                  disallowEmptySelection
                  selectionMode="single"
                  items={tableActions}
                  className="p-0 py-2"
                >
                  {(item) => (
                    <ListboxItem key={item?.key} onClick={item?.action}>
                      {item?.key}
                    </ListboxItem>
                  )}
                </Listbox>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default BubbleMenuBar;

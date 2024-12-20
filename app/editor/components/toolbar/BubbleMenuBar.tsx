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
import FontStyle from "./FontStyle";
import Link from "./Link";
import { Table } from "lucide-react";
import { Editor } from "@tiptap/react";

const BubbleMenuBar = ({ editor }: { editor: Editor }) => {
  console.log(editor);

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
  if (isTableActive) {
    return;
  } else {
    return (
      <Card className={"sticky top-0 z-50 mt-3 w-fit mx-auto mb-4"}>
        <CardBody className={"flex-row gap-3"}>
          <FontStyle editor={editor} />
          <Link editor={editor} />
        </CardBody>
      </Card>
    );
  }
};

export default BubbleMenuBar;

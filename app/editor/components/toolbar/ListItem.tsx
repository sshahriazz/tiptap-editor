import {
  Button,
  ButtonGroup,
  Kbd,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useCurrentEditor } from "@tiptap/react";
import { ChevronDownIcon, ListIcon, ListOrderedIcon } from "lucide-react";
import { useState } from "react";
import ActionButton from "../ActionButton";
import { ListboxWrapper } from "../ListboxWrapper";

const LIstItem = () => {
  const [selectedKeys, setSelectedKeys] = useState(new Set<string>());
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <ButtonGroup>
      <ActionButton
        contentForMac={
          <div className="flex items-center">
            <p className="mr-2">Bulleted list</p>{" "}
            <Kbd keys={["command", "shift"]}>8</Kbd>
          </div>
        }
        contentForWindows={
          <div className="flex items-center">
            <p className="mr-2">Bulleted list</p>
            <p>ctrl + shift + 8</p>
          </div>
        }
      >
        <Button
          isIconOnly
          size="sm"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "text-primary-500" : ""}
        >
          <ListIcon size={16} />
        </Button>
      </ActionButton>
      <ActionButton
        contentForMac={
          <div className="flex items-center">
            <p className="mr-2">Numbered list</p>{" "}
            <Kbd keys={["command", "shift"]}>7</Kbd>
          </div>
        }
        contentForWindows={
          <div className="flex items-center">
            <p className="mr-2">Numbered list</p>
            <p>ctrl + shift + 7</p>
          </div>
        }
      >
        <Button
          isIconOnly
          size="sm"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "text-primary-500" : ""}
        >
          <ListOrderedIcon size={16} />
        </Button>
      </ActionButton>
      <Popover classNames={{ content: "py-2" }}>
        <PopoverTrigger>
          <Button variant="flat" isIconOnly size="sm" color="primary">
            <ChevronDownIcon size={16} />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <div>
            <Listbox
              aria-label="Single selection example"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
              className="p-0"
            >
              <ListboxItem
                key={"listItem1"}
                onClick={() =>
                  editor.chain().focus().splitListItem("listItem").run()
                }
                // disabled={!editor.can().splitListItem("listItem")}
              >
                Split list item
              </ListboxItem>
              <ListboxItem
                key={"listItem2"}
                onClick={() =>
                  editor.chain().focus().sinkListItem("listItem").run()
                }
                // disabled={!editor.can().sinkListItem("listItem")}
              >
                Sink list item
              </ListboxItem>
              <ListboxItem
                key={"listItem3"}
                onClick={() =>
                  editor.chain().focus().liftListItem("listItem").run()
                }
                // disabled={!editor.can().liftListItem("listItem")}
              >
                Lift list item
              </ListboxItem>
            </Listbox>
          </div>
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  );
};

export default LIstItem;

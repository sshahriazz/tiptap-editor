import {
  Button,
  ButtonGroup,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import {
  ChevronDownIcon,
} from "lucide-react";
import React from "react";
import { useCurrentEditor } from "@tiptap/react";

const TableMenu = () => {
  const {
    editor
  } = useCurrentEditor()

  if (!editor) {
    return null;
  }
  return (
    <ButtonGroup>
      <Button
        variant="flat"
        color="primary"
        isIconOnly
        size="sm"
        onPress={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        }
      >
        1
      </Button>

      <Popover classNames={{ content: "py-2" }}>
        <PopoverTrigger>
          <Button variant="flat" isIconOnly size="sm" color="primary">
            <ChevronDownIcon size={16} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="gap-y-2">
          <ButtonGroup>
            <Button
              variant="flat"
              color="primary"
              isIconOnly
              size="sm"
              onPress={() => editor.chain().focus().addColumnBefore().run()}
            >
              2
            </Button>
            <Button
              variant="flat"
              color="primary"
              isIconOnly
              size="sm"
              onPress={() => editor.chain().focus().addColumnAfter().run()}
            >
              3
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              variant="flat"
              color="primary"
              isIconOnly
              size="sm"
              onPress={() => editor.chain().focus().deleteColumn().run()}
            >
              4
            </Button>
            <Button
              variant="flat"
              color="primary"
              isIconOnly
              size="sm"
              onPress={() => editor.chain().focus().addRowBefore().run()}
            >
              5
            </Button>
            <Button
              variant="flat"
              color="primary"
              isIconOnly
              size="sm"
              onPress={() => editor.chain().focus().addRowAfter().run()}
            >
              6
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              variant="flat"
              color="primary"
              isIconOnly
              size="sm"
              onPress={() => editor.chain().focus().deleteRow().run()}
            >
              7
            </Button>
            <Button
              variant="flat"
              color="primary"
              isIconOnly
              size="sm"
              onPress={() => editor.chain().focus().deleteTable().run()}
            >
              8
            </Button>
            <Button
              variant="flat"
              color="primary"
              isIconOnly
              size="sm"
              onPress={() => editor.chain().focus().mergeCells().run()}
            >
              9
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              variant="flat"
              color="primary"
              isIconOnly
              size="sm"
              onPress={() => editor.chain().focus().splitCell().run()}
            >
              10
            </Button>
            <Button
              variant="flat"
              color="primary"
              isIconOnly
              size="sm"
              onPress={() => editor.chain().focus().toggleHeaderColumn().run()}
            >
              11
            </Button>
            <Button
              variant="flat"
              color="primary"
              isIconOnly
              size="sm"
              onPress={() => editor.chain().focus().toggleHeaderRow().run()}
            >
              12
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              variant="flat"
              color="primary"
              isIconOnly
              size="sm"
              onPress={() => editor.chain().focus().toggleHeaderCell().run()}
            >
              13
            </Button>
            <Button
              variant="flat"
              color="primary"
              isIconOnly
              size="sm"
              onPress={() => editor.chain().focus().mergeOrSplit().run()}
            >
              14
            </Button>
            <Button
              variant="flat"
              color="primary"
              isIconOnly
              size="sm"
              onPress={() =>
                editor.chain().focus().setCellAttribute("colspan", 2).run()
              }
            >
              15
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              variant="flat"
              color="primary"
              isIconOnly
              size="sm"
              onPress={() => editor.chain().focus().fixTables().run()}
            >
              16
            </Button>
            <Button
              variant="flat"
              color="primary"
              isIconOnly
              size="sm"
              onPress={() => editor.chain().focus().goToNextCell().run()}
            >
              17
            </Button>
            <Button
              variant="flat"
              color="primary"
              isIconOnly
              size="sm"
              onPress={() => editor.chain().focus().goToPreviousCell().run()}
            >
              18
            </Button>
          </ButtonGroup>
        </PopoverContent>
      </Popover>
    </ButtonGroup>
  );
};

export default TableMenu;

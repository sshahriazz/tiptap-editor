import {
  Popover,
  Button,
  Card,
  CardBody,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { Editor as CoreEditor } from "@tiptap/core";
import { EditorState } from "@tiptap/pm/state";
import { EditorView } from "@tiptap/pm/view";
import { BubbleMenu as BaseBubbleMenu, Editor } from "@tiptap/react";
import React, { useCallback } from "react";
import { isRowGripSelected } from "./utils";
import { ArrowDownToLine, ArrowUpToLine, Trash } from "lucide-react";

interface MenuProps {
  editor: Editor;
  appendTo?: React.RefObject<any>;
  shouldHide?: boolean;
}

interface ShouldShowProps {
  editor?: CoreEditor;
  view: EditorView;
  state?: EditorState;
  oldState?: EditorState;
  from?: number;
  to?: number;
}

export const TableRowMenu = React.memo(
  ({ editor, appendTo }: MenuProps): JSX.Element => {
    const shouldShow = useCallback(
      ({ view, state, from }: ShouldShowProps) => {
        if (!state || !from) {
          return false;
        }

        return isRowGripSelected({ editor, view, state, from });
      },
      [editor]
    );

    const onAddRowBefore = useCallback(() => {
      editor.chain().focus().addRowBefore().run();
    }, [editor]);

    const onAddRowAfter = useCallback(() => {
      editor.chain().focus().addRowAfter().run();
    }, [editor]);

    const onDeleteRow = useCallback(() => {
      editor.chain().focus().deleteRow().run();
    }, [editor]);

    return (
      <BaseBubbleMenu
        editor={editor}
        pluginKey="tableRowMenu"
        updateDelay={0}
        tippyOptions={{
          appendTo: () => {
            return appendTo?.current;
          },
          placement: "left",
          offset: [0, 15],
          popperOptions: {
            modifiers: [{ name: "flip", enabled: false }],
          },
        }}
        shouldShow={shouldShow}
      >
        <Popover className="p-0 border-none">
          <PopoverTrigger>
            <Button variant="flat" size="sm">
              Edit Row
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0">
            <Card style={{ width: "200px" }}>
              <CardBody className="flex flex-col gap-3">
                <Button
                  startContent={<ArrowUpToLine size={14} />}
                  variant="flat"
                  size="sm"
                  className="flex justify-start"
                  onPress={onAddRowBefore}
                >
                  Insert row above
                </Button>
                <Button
                  startContent={<ArrowDownToLine size={14} />}
                  variant="flat"
                  size="sm"
                  className="flex justify-start"
                  onPress={onAddRowAfter}
                >
                  Insert row below
                </Button>
                <Button
                  startContent={<Trash size={14} />}
                  variant="flat"
                  size="sm"
                  color="danger"
                  className="flex justify-start"
                  onPress={onDeleteRow}
                >
                  Delete row
                </Button>
              </CardBody>
            </Card>
          </PopoverContent>
        </Popover>
      </BaseBubbleMenu>
    );
  }
);

TableRowMenu.displayName = "TableRowMenu";

export default TableRowMenu;

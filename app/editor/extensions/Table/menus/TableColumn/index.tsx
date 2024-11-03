import {
  Popover,
  Button,
  Card,
  CardBody,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { Editor as CoreEditor } from "@tiptap/core";
import { EditorState } from "@tiptap/pm/state";
import { EditorView } from "@tiptap/pm/view";
import { BubbleMenu as BaseBubbleMenu, Editor } from "@tiptap/react";
import React, { useCallback, useRef } from "react";
import { Icon } from "../../../Icon";
import { isColumnGripSelected } from "./utils";
import {
  ArrowDownToLine,
  ArrowLeftToLine,
  ArrowRightToLine,
  ArrowUpToLine,
  Trash,
} from "lucide-react";

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

export const TableColumnMenu = React.memo(
  ({ editor, appendTo }: MenuProps): JSX.Element => {
    const shouldShow = useCallback(
      ({ view, state, from }: ShouldShowProps) => {
        if (!state) {
          return false;
        }

        return isColumnGripSelected({
          editor,
          view,
          state,
          from: from || 0,
        });
      },
      [editor]
    );

    const onAddColumnBefore = useCallback(() => {
      editor.chain().focus().addColumnBefore().run();
    }, [editor]);

    const onAddColumnAfter = useCallback(() => {
      editor.chain().focus().addColumnAfter().run();
    }, [editor]);

    const onDeleteColumn = useCallback(() => {
      editor.chain().focus().deleteColumn().run();
    }, [editor]);

    return (
      <BaseBubbleMenu
        editor={editor}
        pluginKey="tableColumnMenu"
        updateDelay={0}
        tippyOptions={{
          appendTo: () => {
            return appendTo?.current;
          },
          offset: [0, 15],
          popperOptions: {
            modifiers: [{ name: "flip", enabled: false }],
          },
        }}
        shouldShow={shouldShow}
      >
        <Popover className="border-0">
          <PopoverTrigger>
            <Button variant="flat" size="sm">
              Edit Column
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 border-0">
            <Card style={{ width: "200px" }}>
              <CardBody className="flex flex-col gap-3">
                <Button
                  startContent={<ArrowLeftToLine size={14} />}
                  variant="flat"
                  size="sm"
                  className="flex justify-start"
                  onPress={onAddColumnBefore}
                >
                  Insert column before
                </Button>
                <Button
                  startContent={<ArrowRightToLine size={14} />}
                  variant="flat"
                  size="sm"
                  className="flex justify-start"
                  onPress={onAddColumnAfter}
                >
                  Insert column after
                </Button>
                <Button
                  startContent={<Trash size={14} />}
                  variant="flat"
                  size="sm"
                  color="danger"
                  className="flex justify-start"
                  onPress={onDeleteColumn}
                >
                  Delete column
                </Button>
              </CardBody>
            </Card>
          </PopoverContent>
        </Popover>
      </BaseBubbleMenu>
    );
  }
);

TableColumnMenu.displayName = "TableColumnMenu";

export default TableColumnMenu;

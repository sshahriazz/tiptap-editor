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
import ActionButton from "@/app/editor/components/ActionButton";

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
        <div className="relative">
          <div className={`absolute -top-[64px] -left-[65px] `}>
            <Card>
              <CardBody className="flex flex-col  gap-3">
                <ActionButton
                  contentForMac={<p>Insert row above</p>}
                  contentForWindows={<p>Insert row above</p>}
                >
                  <Button
                    variant="flat"
                    size="sm"
                    isIconOnly
                    onPress={onAddRowBefore}
                  >
                    <ArrowUpToLine size={14} />
                  </Button>
                </ActionButton>
                <ActionButton
                  contentForMac={<p>Insert row below</p>}
                  contentForWindows={<p>Insert row below</p>}
                >
                  <Button
                    variant="flat"
                    size="sm"
                    isIconOnly
                    onPress={onAddRowAfter}
                  >
                    <ArrowDownToLine size={14} />
                  </Button>
                </ActionButton>
                <ActionButton
                  contentForMac={<p>Delete row</p>}
                  contentForWindows={<p>Delete row</p>}
                >
                  <Button
                    variant="flat"
                    size="sm"
                    isIconOnly
                    color="danger"
                    onPress={onDeleteRow}
                  >
                    <Trash size={14} />
                  </Button>
                </ActionButton>
              </CardBody>
            </Card>
          </div>
        </div>
      </BaseBubbleMenu>
    );
  }
);

TableRowMenu.displayName = "TableRowMenu";

export default TableRowMenu;

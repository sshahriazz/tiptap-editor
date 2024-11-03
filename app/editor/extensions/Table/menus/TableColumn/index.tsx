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
        <div className="relative">
          <div className={`absolute bottom-0 -left-[70px] `}>
            <Card>
              <CardBody className="flex flex-row  gap-3">
                <ActionButton
                  contentForMac={<p>Insert column before</p>}
                  contentForWindows={<p>Insert column before</p>}
                >
                  <Button
                    variant="flat"
                    size="sm"
                    isIconOnly
                    onPress={onAddColumnBefore}
                  >
                    <ArrowLeftToLine size={14} />
                  </Button>
                </ActionButton>
                <ActionButton
                  contentForMac={<p> Insert column after</p>}
                  contentForWindows={<p> Insert column after</p>}
                >
                  <Button
                    variant="flat"
                    size="sm"
                    isIconOnly
                    onPress={onAddColumnAfter}
                  >
                    <ArrowRightToLine size={14} />
                  </Button>
                </ActionButton>
                <ActionButton
                  contentForMac={<p> Delete column</p>}
                  contentForWindows={<p> Delete column</p>}
                >
                  <Button
                    variant="flat"
                    size="sm"
                    color="danger"
                    isIconOnly
                    onPress={onDeleteColumn}
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

TableColumnMenu.displayName = "TableColumnMenu";

export default TableColumnMenu;

import { Toolbar } from "@/app/editor/components/Toolbar";
import { Button } from "@nextui-org/react";
import { Editor as CoreEditor } from "@tiptap/core";
import { EditorState } from "@tiptap/pm/state";
import { EditorView } from "@tiptap/pm/view";
import { BubbleMenu as BaseBubbleMenu, Editor } from "@tiptap/react";
import React, { useCallback } from "react";
import { Icon } from "../../../icon";
import { isColumnGripSelected } from "./utils";

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
                <Toolbar.Wrapper isVertical>
                    <Button onClick={onAddColumnBefore}>
                        <Icon name="ArrowLeftToLine" />
                        Add column before
                    </Button>
                    <Button onClick={onAddColumnAfter}>
                        <Icon name="ArrowRightToLine" />
                        Add column after
                    </Button>
                    <Button onClick={onDeleteColumn}>
                        <Icon name="ArrowRightToLine" />
                        Delete column
                    </Button>
                </Toolbar.Wrapper>
            </BaseBubbleMenu>
        );
    }
);

TableColumnMenu.displayName = "TableColumnMenu";

export default TableColumnMenu;

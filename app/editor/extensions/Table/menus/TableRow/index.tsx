import { Editor as CoreEditor } from "@tiptap/core";
import { EditorState } from "@tiptap/pm/state";
import { EditorView } from "@tiptap/pm/view";
import { BubbleMenu as BaseBubbleMenu } from "@tiptap/react";
import React, { useCallback } from "react";

import { Editor } from "@tiptap/react";
import { isRowGripSelected } from "./utils";

import { Toolbar } from "@/app/editor/components/Toolbar";
import { Button } from "@nextui-org/react";
import { Icon } from "../../../icon";

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
                <Toolbar.Wrapper isVertical>
                    <Button onClick={onAddRowBefore}>
                        <Icon name="ArrowUpToLine" />
                        Add row before
                    </Button>
                    <Button onClick={onAddRowAfter}>
                        <Icon name="ArrowDownToLine" />
                        Add row after
                    </Button>
                    <Button onClick={onDeleteRow}>
                        <Icon name="Trash" />
                        Delete row
                    </Button>
                </Toolbar.Wrapper>
            </BaseBubbleMenu>
        );
    }
);

TableRowMenu.displayName = "TableRowMenu";

export default TableRowMenu;

import {BubbleMenu as BaseBubbleMenu, useEditorState} from '@tiptap/react'
import {useCallback} from 'react'
import {sticky} from 'tippy.js'
// import {v4 as uuid} from 'uuid'
// import {MenuProps} from '@/components/menus/types'
// import {getRenderContainer} from '@/lib/utils/getRenderContainer'
import {ColumnLayout} from '../Columns'
import {Button, ButtonGroup} from "@nextui-org/react";
import getRenderContainer from "@/app/editor/lib/getRenderContainer";
import {MenuProps} from "@/app/editor/lib/type";
import {v4} from "uuid";

export const ColumnsMenu = ({editor, appendTo}: MenuProps) => {
    const getReferenceClientRect = useCallback(() => {
        const renderContainer = getRenderContainer(editor, 'columns')
        const rect = renderContainer?.getBoundingClientRect() || new DOMRect(-1000, -1000, 0, 0)

        return rect
    }, [editor])

    const shouldShow = useCallback(() => {
        const isColumns = editor.isActive('columns')
        return isColumns
    }, [editor])

    const onColumnLeft = useCallback(() => {
        editor.chain().focus().setLayout(ColumnLayout.SidebarLeft).run()
    }, [editor])

    const onColumnRight = useCallback(() => {
        editor.chain().focus().setLayout(ColumnLayout.SidebarRight).run()
    }, [editor])

    const onColumnTwo = useCallback(() => {
        editor.chain().focus().setLayout(ColumnLayout.TwoColumn).run()
    }, [editor])
    const {isColumnLeft, isColumnRight, isColumnTwo} = useEditorState({
        editor,
        selector: ctx => {
            return {
                isColumnLeft: ctx.editor.isActive('columns', {layout: ColumnLayout.SidebarLeft}),
                isColumnRight: ctx.editor.isActive('columns', {layout: ColumnLayout.SidebarRight}),
                isColumnTwo: ctx.editor.isActive('columns', {layout: ColumnLayout.TwoColumn}),
            }
        },
    })

    return (
        <BaseBubbleMenu
            editor={editor}
            pluginKey={`columnsMenu-${v4()}`}
            shouldShow={shouldShow}
            updateDelay={0}
            tippyOptions={{
                offset: [0, 8],
                popperOptions: {
                    modifiers: [{name: 'flip', enabled: false}],
                },
                getReferenceClientRect,
                appendTo: () => appendTo?.current,
                plugins: [sticky],
                sticky: 'popper',
            }}
        >
            <ButtonGroup>
                <Button disabled={isColumnLeft} onClick={onColumnLeft}>
                    PanelLeft
                </Button>
                <Button disabled={isColumnTwo} onClick={onColumnTwo}>
                    Columns2
                </Button>
                <Button disabled={isColumnRight} onClick={onColumnRight}>
                    PanelRight
                </Button>
            </ButtonGroup>
        </BaseBubbleMenu>
    )
}

export default ColumnsMenu

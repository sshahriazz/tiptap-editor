import {type Editor} from '@tiptap/react'

export interface EMenuProps {
    editor: Editor;
}

export interface MenuProps {
    editor: Editor
    appendTo?: React.RefObject<any>
    shouldHide?: boolean
}

// export interface ShouldShowProps {
//     editor?: CoreEditor
//     view: EditorView
//     state?: EditorState
//     oldState?: EditorState
//     from?: number
//     to?: number
// }

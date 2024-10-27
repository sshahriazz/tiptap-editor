import React from 'react'
import {Button, ButtonGroup} from '@nextui-org/react'
import {BoldIcon, ItalicIcon, Strikethrough, UnderlineIcon} from 'lucide-react'
import {useCurrentEditor} from '@tiptap/react'

const FontStyle = () => {
    const {
        editor
    } = useCurrentEditor()

    if (!editor) {
        return null;
    }

    return (
        <ButtonGroup>
            <Button isIconOnly size='sm' onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('bold') ? 'text-primary-500' : ''}>
                <BoldIcon size={16}/>
            </Button>
            <Button isIconOnly size='sm' onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('italic') ? 'text-primary-500' : ''}>
                <ItalicIcon size={16}/>
            </Button>
            <Button isIconOnly size='sm' onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={editor.isActive('underline') ? 'text-primary-500' : ''}>
                <UnderlineIcon size={16}/>
            </Button>
            <Button isIconOnly size='sm' onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive('strike') ? 'text-primary-500' : ''}>
                <Strikethrough size={16}/>
            </Button>
        </ButtonGroup>
    )
}

export default FontStyle
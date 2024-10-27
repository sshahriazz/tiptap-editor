import React from "react";
import TableMenu from "./TableMenu";
import TextAlignment from "./TextAlignment";
import UndoRedo from "./UndoRedo";
import UnorderedList from "./UnorderedList";
import HorizontalRule from "./HorizontalRule";
import FontColor from "./FontColor";
import FontHighlight from "./FontHighlight";
import Heading from "./Heading";
import FontStyle from "./FontStyle";
import {Card, CardBody} from "@nextui-org/card";
import {Button} from "@nextui-org/react";
import {useCurrentEditor} from "@tiptap/react";
import {TypeIcon} from 'lucide-react'
import Link from "./Link";

const Toolbar = () => {
    const {
        editor
    } = useCurrentEditor()
    if (!editor) {
        return null;
    }

    console.log(editor.getJSON())
    console.log(editor.getHTML())
    return (
        <Card className={'sticky top-0 z-50 mt-3 w-fit mx-auto mb-4'}>
            <CardBody className={'flex-row gap-3'}>

                <UndoRedo/>

                <Heading/>

                <Button size={'sm'} isIconOnly onClick={() => editor.chain().focus().setParagraph().run()}
                        className={editor.isActive('paragraph') ? 'text-primary-500' : ''}>
                    <TypeIcon size={16}/>
                </Button>

                <Link/>

                <TextAlignment/>

                <UnorderedList/>

                <TableMenu/>

                <HorizontalRule/>

                <FontColor/>

                <FontHighlight/>

                <FontStyle/>

            </CardBody>

        </Card>
    );
};

export default Toolbar;

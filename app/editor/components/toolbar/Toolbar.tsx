import { Card, CardBody } from "@nextui-org/card";
import { Button, ButtonGroup } from "@nextui-org/react";
import { useCurrentEditor } from "@tiptap/react";
import { TypeIcon } from "lucide-react";
import BoldButton from "./BoldButton";
import FontColor from "./FontColor";
import FontHighlight from "./FontHighlight";
import FontStyle from "./FontStyle";
import Heading from "./Heading";
import HorizontalRule from "./HorizontalRule";
import ItalicButton from "./ItalicButton";
import Link from "./Link";
import TableMenu from "./TableMenu";
import TextAlignment from "./TextAlignment";
import TextColorButton from "./TextColorButton";
import UnderlineButton from "./UnderlineButton";
import UndoRedo from "./UndoRedo";
import UnorderedList from "./UnorderedList";

const Toolbar = () => {
    const { editor } = useCurrentEditor();
    if (!editor) {
        return null;
    }

    console.log(editor.getJSON());
    console.log(editor.getHTML());
    return (
        <Card className={"sticky top-0 z-50 mt-3 w-fit mx-auto mb-4"}>
            <CardBody className={"flex-row gap-3"}>
                <UndoRedo />

                <Heading />
                {/* <FontFamilyButton /> */}
                <ButtonGroup>
                    <BoldButton />
                    <ItalicButton />
                    <UnderlineButton />
                </ButtonGroup>
                <TextColorButton />
                <Button
                    size={"sm"}
                    isIconOnly
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={
                        editor.isActive("paragraph") ? "text-primary-500" : ""
                    }
                >
                    <TypeIcon size={16} />
                </Button>

                <Link />

                <TextAlignment />

                <UnorderedList />

                <TableMenu />

                <HorizontalRule />

                <FontColor />

                <FontHighlight />

                <FontStyle />
            </CardBody>
        </Card>
    );
};

export default Toolbar;

import {ImageEditDialog} from "@/app/editor/components/image/ImageEditDialog";
import {Card, CardBody} from "@nextui-org/card";
import {Button} from "@nextui-org/react";
import {useCurrentEditor} from "@tiptap/react";
import {TypeIcon} from "lucide-react";
import FontHighlight from "./FontHighlight";
import FontStyle from "./FontStyle";
import Heading from "./Heading";
import HorizontalRule from "./HorizontalRule";
import Link from "./Link";
import LIstItem from "./ListItem";
import TableMenu from "./TableMenu";
import TextAlignment from "./TextAlignment";
import TextColorButton from "./TextColorButton";
import UndoRedo from "./UndoRedo";
import FontSize from "@/app/editor/extensions/fontsize/FontSize";

const Toolbar = () => {
    const {editor} = useCurrentEditor();
    if (!editor) {
        return null;
    }

    console.log(editor.getJSON(), "getjosn");

    return (
        <Card className={"sticky top-0 z-50 mt-3 w-fit mx-auto mb-4"}>
            <CardBody className={"flex-row gap-3 shadow-sm"}>
                <UndoRedo/>
                <Heading/>
                <FontStyle/>
                <FontSize/>
                <Button
                    variant="flat"
                    size={"sm"}
                    isIconOnly
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={`${
                        editor.isActive("paragraph") ? "text-primary-500" : ""
                    } `}
                >
                    <TypeIcon size={16}/>
                </Button>
                <Link/>
                <ImageEditDialog editor={editor}/>
                <TextColorButton/>
                <TextAlignment/>
                <LIstItem/>
                <TableMenu/>
                <HorizontalRule/>
                {/* <FontColor /> */}
                <FontHighlight/>
            </CardBody>
        </Card>
    );
};

export default Toolbar;

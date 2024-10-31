import {ImageEditDialog} from "@/app/editor/components/image/ImageEditDialog";
import FontSize from "@/app/editor/extensions/fontsize/FontSize";
import {Card, CardBody} from "@nextui-org/card";
import {Button} from "@nextui-org/react";
import FontFamily from "./FontFamily";
import FontHighlight from "./FontHighlight";
import FontStyle from "./FontStyle";
import HardBreak from "./HardBreak";
import Heading from "./Heading";
import HorizontalRule from "./HorizontalRule";
import Link from "./Link";
import LIstItem from "./ListItem";
import SubAndSupScript from "./SubAndSupScript";
import TableMenu from "./TableMenu";
import TaskList from "./TaskList";
import TextAlignment from "./TextAlignment";
import TextColorButton from "./TextColorButton";
import UndoRedo from "./UndoRedo";

const Toolbar = ({editor}: any) => {
    // const { editor } = useCurrentEditor();
    // if (!editor) {
    //   return null;
    // }

    // console.log(editor.getJSON(), "getjosn");
    // isDisabled={() => editor.isActive('columns')}
    return (
        <Card className={"sticky top-0 z-50 mt-3 w-fit mx-auto mb-4"}>
            <CardBody className={"flex-row gap-3 shadow-sm"}>
                <Button onPress={() => editor
                    .chain()
                    .focus()
                    .setColumns()
                    .focus(editor.state.selection.head - 1)
                    .run()}>
                    Col
                </Button>

                <UndoRedo editor={editor}/>
                <FontStyle editor={editor}/>
                <Heading editor={editor}/>
                <FontFamily editor={editor}/>
                <FontSize editor={editor}/>
                <HardBreak editor={editor}/>
                <Button
                    variant="flat"
                    size={"sm"}
                    isIconOnly
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={`${
                        editor.isActive("paragraph") ? "text-primary-500" : ""
                    } `}
                >
                    <span className="text-sm">P</span>
                </Button>
                <Link editor={editor}/>
                <ImageEditDialog editor={editor}/>
                <TextColorButton editor={editor}/>
                <TextAlignment editor={editor}/>
                <SubAndSupScript editor={editor}/>
                <LIstItem editor={editor}/>
                <TaskList editor={editor}/>
                <TableMenu editor={editor}/>
                <HorizontalRule editor={editor}/>
                <FontHighlight editor={editor}/>
                {/* <CharactersAndWordCount /> */}
            </CardBody>
        </Card>
    );
};

export default Toolbar;

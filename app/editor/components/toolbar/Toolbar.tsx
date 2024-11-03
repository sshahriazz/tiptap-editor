import { ImageEditDialog } from "@/app/editor/components/image/ImageEditDialog";
import FontSize from "@/app/editor/extensions/fontsize/FontSize";
import { Card, CardBody } from "@nextui-org/card";
import FontFamily from "./FontFamily";
import FontHighlight from "./FontHighlight";
import FontStyle from "./FontStyle";
import HardBreak from "./HardBreak";
import Heading from "./Heading";
import HorizontalRule from "./HorizontalRule";
import Link from "./Link";
import LIstItem from "./ListItem";
import TableMenu from "./TableMenu";
import TaskList from "./TaskList";
import TextAlignment from "./TextAlignment";
import TextColorButton from "./TextColorButton";
import UndoRedo from "./UndoRedo";
import AddRowSplit from "./AddRowSplit";
import Paragraph from "./Paragraph";

const Toolbar = ({ editor }: any) => {
  if (!editor) return null;

  return (
    <Card className={"sticky top-0 z-50 mt-3 w-fit mx-auto mb-4"}>
      <CardBody className={"flex-row gap-3 shadow-sm"}>
        <UndoRedo editor={editor} />
        <AddRowSplit editor={editor} />
        <TableMenu editor={editor} />
        {/* <QuoteUnquote editor={editor} /> */}
        <FontStyle editor={editor} />
        <Heading editor={editor} />
        <FontFamily editor={editor} />
        <FontSize editor={editor} />
        <Paragraph editor={editor} />
        <TextColorButton editor={editor} />
        <FontHighlight editor={editor} />
        <TextAlignment editor={editor} />
        <HardBreak editor={editor} />
        {/* <SubAndSupScript editor={editor} /> */}
        <Link editor={editor} />
        <ImageEditDialog editor={editor} />
        <LIstItem editor={editor} />
        <TaskList editor={editor} />
        <HorizontalRule editor={editor} />
        {/* <CharactersAndWordCount /> */}
      </CardBody>
    </Card>
  );
};

export default Toolbar;

import { Card, CardBody } from "@nextui-org/react";
import { useCurrentEditor } from "@tiptap/react";
import FontStyle from "./FontStyle";
import Link from "./Link";

const BubbleMenuBar = () => {
    const { editor } = useCurrentEditor();
    if (!editor) {
        return null;
    }

    return (
        <Card className={"sticky top-0 z-50 mt-3 w-fit mx-auto mb-4"}>
            <CardBody className={"flex-row gap-3"}>
                <FontStyle />
                <Link />
            </CardBody>
        </Card>
    );
};

export default BubbleMenuBar;

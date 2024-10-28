import { Button } from "@nextui-org/react";
import { useCurrentEditor } from "@tiptap/react";
import { Minus } from "lucide-react";
import ActionButton from "../ActionButton";

const HorizontalRule = () => {
    const { editor } = useCurrentEditor();

    if (!editor) {
        return null;
    }
    return (
        <ActionButton
            contentForMac={<p>Divider</p>}
            contentForWindows={<p>Divider</p>}
        >
            <Button
                variant="flat"
                isIconOnly
                size="sm"
                onPress={() => editor.chain().focus().setHorizontalRule().run()}
            >
                <Minus />
            </Button>
        </ActionButton>
    );
};

export default HorizontalRule;

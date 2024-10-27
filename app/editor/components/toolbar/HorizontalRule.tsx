import { Button } from "@nextui-org/react";
import { useCurrentEditor } from "@tiptap/react";
import { Minus } from "lucide-react";

const HorizontalRule = () => {
    const { editor } = useCurrentEditor();

    if (!editor) {
        return null;
    }
    return (
        <Button
            variant="flat"
            isIconOnly
            size="sm"
            onPress={() => editor.chain().focus().setHorizontalRule().run()}
        >
            <Minus />
        </Button>
    );
};

export default HorizontalRule;

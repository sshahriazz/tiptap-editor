import { Button } from "@nextui-org/react";
import { useCurrentEditor } from "@tiptap/react";
import { Italic } from "lucide-react";

const ItalicButton = () => {
    const { editor } = useCurrentEditor();
    if (!editor) {
        return null;
    }
    return (
        <Button
            isIconOnly
            onClick={() => editor?.chain()?.focus()?.toggleItalic()?.run()}
            className={editor?.isActive("italic") ? "is-active" : ""}
            size="sm"
        >
            <Italic size={16} />
        </Button>
    );
};

export default ItalicButton;

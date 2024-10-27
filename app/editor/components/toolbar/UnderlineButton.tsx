import { Button } from "@nextui-org/react";
import { useCurrentEditor } from "@tiptap/react";
import { Underline } from "lucide-react";

const UnderlineButton = () => {
    const { editor } = useCurrentEditor();
    if (!editor) {
        return null;
    }
    return (
        <Button
            isIconOnly
            size="sm"
            onClick={() => editor?.chain()?.focus()?.toggleUnderline()?.run()}
            className={editor?.isActive("underline") ? "is-active" : ""}
        >
            <Underline size={16} />
        </Button>
    );
};

export default UnderlineButton;

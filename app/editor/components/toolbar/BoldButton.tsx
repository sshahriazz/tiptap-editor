import { Button } from "@nextui-org/react";
import { useCurrentEditor } from "@tiptap/react";
import { Bold } from "lucide-react";

const BoldButton = () => {
    const { editor } = useCurrentEditor();
    if (!editor) {
        return null;
    }
    return (
        <Button
            onClick={() => editor?.chain()?.focus()?.toggleBold()?.run()}
            className={editor?.isActive("bold") ? "is-active" : ""}
            isIconOnly
            size="sm"
        >
            <Bold size={16} />
        </Button>
    );
};

export default BoldButton;

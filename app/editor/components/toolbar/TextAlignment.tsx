import { Button, ButtonGroup } from "@nextui-org/react";
import { useCurrentEditor } from "@tiptap/react";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";

const TextAlignment = () => {
    const { editor } = useCurrentEditor();

    if (!editor) {
        return null;
    }
    return (
        <ButtonGroup>
            <Button
                variant="flat"
                isIconOnly
                size="sm"
                onPress={() =>
                    editor.chain().focus().setTextAlign("left").run()
                }
                className={
                    editor.isActive({ textAlign: "left" })
                        ? "text-blue-500"
                        : ""
                }
            >
                <AlignLeft size={16} />
            </Button>
            <Button
                variant="flat"
                isIconOnly
                size="sm"
                onPress={() =>
                    editor.chain().focus().setTextAlign("center").run()
                }
                className={
                    editor.isActive({ textAlign: "center" })
                        ? "text-blue-500"
                        : ""
                }
            >
                <AlignCenter size={16} />
            </Button>
            <Button
                variant="flat"
                isIconOnly
                size="sm"
                onPress={() =>
                    editor.chain().focus().setTextAlign("right").run()
                }
                className={
                    editor.isActive({ textAlign: "right" })
                        ? "text-blue-500"
                        : ""
                }
            >
                <AlignRight size={16} />
            </Button>
            <Button
                variant="flat"
                isIconOnly
                size="sm"
                onPress={() =>
                    editor.chain().focus().setTextAlign("justify").run()
                }
                className={
                    editor.isActive({ textAlign: "justify" })
                        ? "text-blue-500"
                        : ""
                }
            >
                <AlignJustify size={16} />
            </Button>
        </ButtonGroup>
    );
};

export default TextAlignment;

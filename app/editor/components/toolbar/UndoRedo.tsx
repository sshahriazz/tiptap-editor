import { Button, ButtonGroup } from "@nextui-org/react";
import { useCurrentEditor } from "@tiptap/react";
import { Redo2Icon, Undo2Icon } from "lucide-react";
import ActionButton from "../ActionButton";

const UndoRedo = () => {
    const { editor } = useCurrentEditor();

    if (!editor) {
        return null;
    }

    return (
        <ButtonGroup>
            <ActionButton
                contentForMac={<p>ctrl + K</p>}
                contentForWindows={<p>ctrl + K</p>}
            >
                <Button
                    isIconOnly
                    size="sm"
                    onPress={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                >
                    <Undo2Icon size={16} />
                </Button>
            </ActionButton>
            <Button
                isIconOnly
                size="sm"
                onPress={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
            >
                <Redo2Icon size={16} />
            </Button>
        </ButtonGroup>
    );
};

export default UndoRedo;

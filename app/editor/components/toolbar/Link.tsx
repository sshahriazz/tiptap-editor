import { Button, ButtonGroup } from "@nextui-org/react";
import { useCurrentEditor } from "@tiptap/react";
import { Link2Icon } from "lucide-react";
import { useCallback } from "react";

function Link() {
    const { editor } = useCurrentEditor();

    const setLink = useCallback(() => {
        if (!editor) {
            return null;
        }
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();

            return;
        }

        // update link
        editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({ href: url })
            .run();
    }, [editor]);

    if (!editor) {
        return null;
    }

    if (!editor) {
        return null;
    }

    return (
        <ButtonGroup className="button-group">
            <Button
                isIconOnly
                size={"sm"}
                onClick={setLink}
                className={editor.isActive("link") ? "is-active" : ""}
            >
                <Link2Icon size={16} />
            </Button>
            {/* <Button
                isIconOnly size={'sm'}
                onClick={() => editor.chain().focus().unsetLink().run()}
                disabled={!editor.isActive('link')}
            >
                <Unlink2Icon size={16}/>
            </Button> */}
        </ButtonGroup>
    );
}

export default Link;

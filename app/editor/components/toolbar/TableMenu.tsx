import { Button, ButtonGroup } from "@nextui-org/react";
import { useCurrentEditor } from "@tiptap/react";
import { Table } from "lucide-react";
import ActionButton from "../ActionButton";

const TableMenu = () => {
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
                    editor
                        .chain()
                        .focus()
                        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                        .run()
                }
            >
                <ActionButton
                    contentForMac={<p>Table</p>}
                    contentForWindows={<p>Table</p>}
                >
                    <Table size={16} />
                </ActionButton>
            </Button>
        </ButtonGroup>
    );
};

export default TableMenu;

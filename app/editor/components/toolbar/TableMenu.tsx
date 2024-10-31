import {
    Button,
    ButtonGroup,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@nextui-org/react";
import { Table } from "lucide-react";
import { useState } from "react";
import ActionButton from "../ActionButton";

const TableMenu = ({ editor }: any) => {
    const [row, setRow] = useState(null);
    const [column, setColumn] = useState(null);
    const handleSelectRowAndColumn = (row: number, column: number) => {
        setRow(row);
        setColumn(column);
    };
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
                        .insertTable({ rows: 3, cols: 3, withHeaderRow: false })
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
            <Popover>
                <PopoverTrigger>
                    <Button variant="flat" size="sm">
                        Click me
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <div>
                        <button
                            onClick={() => handleSelectRowAndColumn()}
                        ></button>
                        <button></button>
                        <button></button>
                        <button></button>
                        <button></button>
                        <button></button>
                        <button></button>
                        <button></button>
                    </div>
                </PopoverContent>
            </Popover>
        </ButtonGroup>
    );
};

export default TableMenu;

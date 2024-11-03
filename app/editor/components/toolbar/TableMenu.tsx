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
    const [selectedButton, setSelectedButton] = useState({ row: 0, col: 0 });

    const handleSelectRowAndColumn = (row: number, col: number) => {
        setSelectedButton({ row, col });
    };
    const isHovered = (row: number, col: number) => {
        return (
            row < selectedButton.row ||
            (row === selectedButton.row && col <= selectedButton.col)
        );
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
                        {[1, 2, 3, 4, 5, 6].map((row) => (
                            <div key={row}>
                                {[1, 2, 3, 4, 5, 6].map((col) => (
                                    <button
                                        key={`${row}-${col}`}
                                        className={`bg-gray-200 border border-gray-300 w-3 h-3 ${
                                            isHovered(row, col)
                                                ? "bg-green-300"
                                                : "hover:bg-green-300"
                                        }`}
                                        onClick={() =>
                                            handleSelectRowAndColumn(row, col)
                                        }
                                    ></button>
                                ))}
                            </div>
                        ))}
                    </div>
                </PopoverContent>
            </Popover>
        </ButtonGroup>
    );
};

export default TableMenu;

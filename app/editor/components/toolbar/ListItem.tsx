import {
    Button,
    ButtonGroup,
    Listbox,
    ListboxItem,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@nextui-org/react";
import { useCurrentEditor } from "@tiptap/react";
import { ChevronDownIcon, ListIcon, ListOrderedIcon } from "lucide-react";
import { useState } from "react";
import { ListboxWrapper } from "../ListboxWrapper";

const LIstItem = () => {
    const [selectedKeys, setSelectedKeys] = useState(new Set<string>());
    const { editor } = useCurrentEditor();

    if (!editor) {
        return null;
    }

    return (
        <ButtonGroup>
            <Button
                isIconOnly
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={
                    editor.isActive("bulletList") ? "text-primary-500" : ""
                }
            >
                <ListIcon size={16} />
            </Button>
            <Button
                isIconOnly
                size="sm"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={
                    editor.isActive("orderedList") ? "text-primary-500" : ""
                }
            >
                <ListOrderedIcon size={16} />
            </Button>
            <Popover classNames={{ content: "py-2" }}>
                <PopoverTrigger>
                    <Button variant="flat" isIconOnly size="sm" color="primary">
                        <ChevronDownIcon size={16} />
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <ListboxWrapper>
                        <Listbox
                            aria-label="Single selection example"
                            variant="flat"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedKeys}
                            onSelectionChange={setSelectedKeys}
                        >
                            <ListboxItem
                                key={"listItem1"}
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .splitListItem("listItem")
                                        .run()
                                }
                                // disabled={!editor.can().splitListItem("listItem")}
                            >
                                Split list item
                            </ListboxItem>
                            <ListboxItem
                                key={"listItem2"}
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .sinkListItem("listItem")
                                        .run()
                                }
                                // disabled={!editor.can().sinkListItem("listItem")}
                            >
                                Sink list item
                            </ListboxItem>
                            <ListboxItem
                                key={"listItem3"}
                                onClick={() =>
                                    editor
                                        .chain()
                                        .focus()
                                        .liftListItem("listItem")
                                        .run()
                                }
                                // disabled={!editor.can().liftListItem("listItem")}
                            >
                                Lift list item
                            </ListboxItem>
                        </Listbox>
                    </ListboxWrapper>
                </PopoverContent>
            </Popover>
        </ButtonGroup>
    );
};

export default LIstItem;

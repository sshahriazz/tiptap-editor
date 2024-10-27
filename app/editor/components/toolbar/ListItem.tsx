import {Button, ButtonGroup, Popover, PopoverContent, PopoverTrigger,} from "@nextui-org/react";
import React from "react";
import {ChevronDownIcon, ListIcon, ListOrderedIcon} from "lucide-react";
import {useCurrentEditor} from "@tiptap/react";

const LIstItem = () => {
    const {
        editor
    } = useCurrentEditor()

    if (!editor) {
        return null;
    }

    return (
        <ButtonGroup>
            <Button
                isIconOnly
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive("bulletList") ? "text-primary-500" : ""}
            >
                <ListIcon size={16}/>
            </Button>
            <Button
                isIconOnly
                size="sm"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive("orderedList") ? "text-primary-500" : ""}
            >
                <ListOrderedIcon size={16}/>
            </Button>
            <Popover classNames={{content: "py-2"}}>
                <PopoverTrigger>
                    <Button variant="flat" isIconOnly size="sm" color="primary">
                        <ChevronDownIcon size={16}/>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="gap-y-2">
                    <ButtonGroup>

                        <Button
                            onClick={() =>
                                editor.chain().focus().splitListItem("listItem").run()
                            }
                            disabled={!editor.can().splitListItem("listItem")}
                        >
                            Split list item
                        </Button>
                        <Button
                            onClick={() =>
                                editor.chain().focus().sinkListItem("listItem").run()
                            }
                            disabled={!editor.can().sinkListItem("listItem")}
                        >
                            Sink list item
                        </Button>
                        <Button
                            onClick={() =>
                                editor.chain().focus().liftListItem("listItem").run()
                            }
                            disabled={!editor.can().liftListItem("listItem")}
                        >
                            Lift list item
                        </Button>
                    </ButtonGroup>
                </PopoverContent>
            </Popover>
        </ButtonGroup>
    );
};

export default LIstItem;

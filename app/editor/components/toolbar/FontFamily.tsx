import {Button, Listbox, ListboxItem, Popover, PopoverContent, PopoverTrigger, Selection,} from "@nextui-org/react";
import React, {useState} from "react";
import ActionButton from "../ActionButton";

const FontFamily = ({editor}: any) => {
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["Inter"]));

    const fonts = [
        {
            key: "Inter",
            label: "Inter",
            name: "sans",
        },
        {
            key: "Comic Sans MS, Comic Sans",
            label: "Comic Sans MS, Comic Sans",
            name: "Comic Sans MS, Comic Sans",
        },
        {
            key: "serif",
            label: "serif",
            name: "serif",
        },
        {
            key: "monospace",
            label: "monospace",
            name: "mono",
        },
        {
            key: "cursive",
            label: "cursive",
            name: "cursive",
        },
        {
            key: "var(--title-font-family)",
            label: "var(--title-font-family)",
            name: "custom-title",
        },
    ];
    return (
        <div>
            <Popover
                classNames={{
                    content: "px-1",
                }}
            >
                <PopoverTrigger>
                    <Button
                        variant="flat"
                        size={"sm"}
                        // className={` ${
                        //   editor.isActive("heading", {
                        //     level: editor.getAttributes("heading").level,
                        //   })
                        //     ? "text-primary-500"
                        //     : ""
                        // } `}
                        //isIconOnly
                    >
                        <ActionButton
                            contentForMac={<p>Font Family</p>}
                            contentForWindows={<p>Font Family</p>}
                        >
                            <span className="text-xs">{selectedKeys}</span>
                        </ActionButton>
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-2">
                    <Listbox
                        items={fonts}
                        aria-label="Single selection example"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="single"
                        selectedKeys={selectedKeys}
                        onSelectionChange={setSelectedKeys}
                        className="p-0"
                    >
                        {(item) => (
                            <ListboxItem
                                onPress={() => {
                                    editor.chain().focus().setFontFamily(item?.key).run();
                                }}
                                key={item?.key}
                            >
                                <span style={{fontFamily: item?.key}}>{item?.label}</span>
                            </ListboxItem>
                        )}
                    </Listbox>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default FontFamily;

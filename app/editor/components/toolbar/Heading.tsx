import {Button, Listbox, ListboxItem, Popover, PopoverContent, PopoverTrigger, Selection,} from "@nextui-org/react";
import {Level} from "@tiptap/extension-heading";
import {
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  HeadingIcon,
} from "lucide-react";
import {ReactNode, useState} from "react";
import ActionButton from "../ActionButton";

const headingIconMapper: Record<string, ReactNode> = {
    H1: <Heading1Icon size={16}/>,
    H2: <Heading2Icon size={16}/>,
    H3: <Heading3Icon size={16}/>,
    H4: <Heading4Icon size={16}/>,
    H5: <Heading5Icon size={16}/>,
    H6: <Heading6Icon size={16}/>,
};

const Heading = ({editor}: any) => {
    // console.log(editor.getAttributes("heading"));
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["H1"]));

    const handleHeadingChange = (level: Level) => {
        editor.chain().focus().setHeading({level}).run();
    };
    return (
        <Popover
            classNames={{
                content: "px-1",
            }}
        >
            <PopoverTrigger>
                <Button
                    variant="flat"
                    size={"sm"}
                    className={` ${
                        editor.isActive("heading", {
                            level: editor.getAttributes("heading").level,
                        })
                            ? "text-primary-500"
                            : ""
                    } `}
                    isIconOnly
                >
                    <ActionButton
                        contentForMac={<p>Heading</p>}
                        contentForWindows={<p>Heading</p>}
                    >
            <span className="text-xs">
              {editor.getAttributes("heading").level ? (
                  headingIconMapper[`H${editor.getAttributes("heading").level}`]
              ) : (
                  <HeadingIcon size={14} className="font-bold"/>
              )}
            </span>
                    </ActionButton>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-2">
                {/* <ButtonGroup variant="flat"> */}
                <Listbox
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys}
                    className="p-0 "
                >
                    {Object.keys(headingIconMapper).map((key, index) => (
                        <ListboxItem
                            key={key}
                            onPress={() => handleHeadingChange((index + 1) as Level)}
                            className={` ${
                                editor.isActive("heading", {
                                    level: index + 1,
                                })
                                    ? "text-primary-500"
                                    : ""
                            }`}
                        >
                            <p className="text-base">{headingIconMapper[key]}</p>
                        </ListboxItem>
                    ))}
                </Listbox>
            </PopoverContent>
        </Popover>
    );
};

export default Heading;

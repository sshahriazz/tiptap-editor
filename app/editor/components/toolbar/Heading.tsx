import {Button, ButtonGroup, Popover, PopoverContent, PopoverTrigger} from "@nextui-org/react";
import React, {ReactNode} from "react";
import {Heading1Icon, Heading2Icon, Heading3Icon, Heading4Icon, Heading5Icon, Heading6Icon} from "lucide-react";
import {useCurrentEditor} from "@tiptap/react";
import {Level} from "@tiptap/extension-heading";

const headingIconMapper: Record<string, ReactNode> = {
    "H1": <Heading1Icon size={16}/>,
    "H2": <Heading2Icon size={16}/>,
    "H3": <Heading3Icon size={16}/>,
    "H4": <Heading4Icon size={16}/>,
    "H5": <Heading5Icon size={16}/>,
    "H6": <Heading6Icon size={16}/>,
}

const Heading = () => {
    const {editor} = useCurrentEditor();

    if (!editor) {
        return null;
    }

    const handleHeadingChange = (level: Level) => {
        editor.chain().focus().setHeading({level}).run();
    };
    return (
        <Popover classNames={{
            content: 'px-1'
        }}>
            <PopoverTrigger>
                <Button
                    size={'sm'}
                    className={editor.isActive("heading", {level: editor.getAttributes('heading').level}) ? "text-primary-500" : ""}
                    isIconOnly>
                    {editor.getAttributes('heading').level ? headingIconMapper[`H${editor.getAttributes('heading').level}`] : "H"}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <ButtonGroup>
                    {Object.keys(headingIconMapper).map((key, index) => (
                        <Button
                            size={'sm'}
                            isIconOnly
                            key={key}
                            onPress={() => handleHeadingChange(index + 1 as Level)}
                            className={editor.isActive("heading", {level: index + 1}) ? "text-primary-500" : ""}
                        >
                            {headingIconMapper[key]}
                        </Button>
                    ))}
                </ButtonGroup>
            </PopoverContent>
        </Popover>
    );
};

export default Heading;
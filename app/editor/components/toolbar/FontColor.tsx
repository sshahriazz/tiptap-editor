import React, {useEffect} from "react";
import {Button, ButtonGroup, Popover, PopoverContent, PopoverTrigger,} from "@nextui-org/react";
import {SketchPicker} from "react-color";
import {BaselineIcon} from "lucide-react";
import {useCurrentEditor} from "@tiptap/react";

const FontColor = () => {
    const {
        editor
    } = useCurrentEditor()


    const [color, setColor] = React.useState<string>("#000000");

    useEffect(() => {
        if (!editor) {
            return () => {
            };
        }
        setColor(editor.getAttributes("textStyle").color);
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <ButtonGroup>
            <Popover>
                <PopoverTrigger>
                    <Button isIconOnly size="sm" data-testid="setColor">
                        <BaselineIcon
                            className="font-bold"
                            style={{color: color}}
                            size={16}
                        />
                    </Button>
                </PopoverTrigger>

                <PopoverContent>
                    <SketchPicker
                        styles={{
                            default: {
                                saturation: {
                                    border: "1px solid #e2e8f0",
                                    borderRadius: "4px",
                                },
                                picker: {
                                    boxShadow: "none",
                                },
                            },
                        }}
                        color={editor.getAttributes("textStyle").color}
                        onChangeComplete={(e) => {
                            setColor(e.hex);

                            editor.chain().focus().setColor(e.hex).run();
                        }}
                    />
                </PopoverContent>
            </Popover>
            <Button
                variant="flat"
                isDisabled={!editor.can().unsetColor()}
                isIconOnly
                size="sm"
                onPress={() => {
                    editor.chain().focus().unsetColor().run();
                    setColor("#000000");
                }}
                data-testid="unsetColor"
            >
                <BaselineIcon size={16}/>
            </Button>
        </ButtonGroup>
    );
};

export default FontColor;

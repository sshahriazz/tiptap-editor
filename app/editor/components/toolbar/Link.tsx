import {Button, ButtonGroup, Input, Popover, PopoverContent, PopoverTrigger,} from "@nextui-org/react";
import {Link2Icon, Unlink2Icon} from "lucide-react";
import {useState} from "react";
import ActionButton from "../ActionButton";

function Link({editor}: any) {

    const [url, setUrl] = useState<string>(""); // Provide a default value for url

    // const setLink = useCallback(
    //     (e: any) => {
    //         e.preventDefault();
    //         if (!editor) {
    //             return null;
    //         }
    //         const previousUrl = editor.getAttributes("link").href;

    //         // cancelled
    //         if (url === null) {
    //             return;
    //         }

    //         // empty
    //         if (url === "") {
    //             editor
    //                 .chain()
    //                 .focus()
    //                 .extendMarkRange("link")
    //                 .unsetLink()
    //                 .run();

    //             return;
    //         }

    //         // update link
    //         editor
    //             .chain()
    //             .focus()
    //             .extendMarkRange("link")
    //             .setLink({ href: url })
    //             .run();
    //     },
    //     [editor]
    // );

    const setLink = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!editor) {
            return null;
        }
        editor.chain().focus().setLink({href: url}).run();
    };

    if (!editor) {
        return null;
    }

    if (!editor) {
        return null;
    }

    return (
        <ButtonGroup className="button-group">
            <Popover placement="bottom">
                <PopoverTrigger>
                    <Button
                        variant="flat"
                        isIconOnly
                        size={"sm"}
                        // onClick={setLink}
                        className={editor.isActive("link") ? "is-active" : ""}
                    >
                        <ActionButton
                            contentForMac={
                                <div className="flex items-center">
                                    <p className="mr-2">Insert Link</p>
                                </div>
                            }
                            contentForWindows={
                                <div className="flex items-center">
                                    <p className="mr-2">Insert Link</p>
                                </div>
                            }
                        >
                            <Link2Icon size={16}/>
                        </ActionButton>
                    </Button>
                </PopoverTrigger>
                <PopoverContent>
                    {() => (
                        <form
                            onSubmit={setLink}
                            className="px-1 py-2 flex flex-col gap-2 w-[260px]"
                        >
                            <Input
                                placeholder="Enter URL"
                                onChange={(e) => {
                                    setUrl(e.target.value);
                                }}
                                type="link"
                            />
                            <Button
                                radius="sm"
                                variant="solid"
                                color="primary"
                                className="rounded-lg"
                                type="submit"
                            >
                                Submit
                            </Button>
                        </form>
                    )}
                </PopoverContent>
            </Popover>
            <ActionButton
                contentForMac={
                    <div className="flex items-center">
                        <p className="mr-2">Remove Link</p>
                    </div>
                }
                contentForWindows={
                    <div className="flex items-center">
                        <p className="mr-2">Remove Link</p>
                    </div>
                }
            >
                <Button
                    variant="flat"
                    isIconOnly
                    size={"sm"}
                    onClick={() => editor.chain().focus().unsetLink().run()}
                    disabled={!editor.isActive("link")}
                >
                    <Unlink2Icon size={16}/>
                </Button>
            </ActionButton>
        </ButtonGroup>
    );
}

export default Link;

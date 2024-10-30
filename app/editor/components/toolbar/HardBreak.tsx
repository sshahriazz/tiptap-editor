import {Button, Kbd} from "@nextui-org/react";
import {WrapText} from "lucide-react";
import ActionButton from "../ActionButton";

const HardBreak = ({editor}: any) => {


    return (
        <ActionButton
            contentForMac={
                <div className="flex gap-1 items-center">
                    <span> Hard break</span> <Kbd keys={["shift"]}></Kbd>+
                    <Kbd keys={["enter"]}></Kbd>
                </div>
            }
            contentForWindows={
                <div className="flex gap-1 items-center">
                    <span className="pr-1">Hard break</span> <Kbd keys={["shift"]}></Kbd>+
                    <Kbd keys={["enter"]}></Kbd>
                </div>
            }
        >
            <Button
                variant="flat"
                isIconOnly
                size="sm"
                onPress={() => editor.chain().focus().setHardBreak().run()}
            >
                <WrapText size={16}/>
            </Button>
        </ActionButton>
    );
};

export default HardBreak;

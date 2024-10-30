import React from "react";
import ActionButton from "../ActionButton";
import {Button} from "@nextui-org/react";
import {ListTodo} from "lucide-react";

const TaskList = ({editor}: any) => {

    return (
        <div>
            <ActionButton contentForMac={"Task List"} contentForWindows={"Task List"}>
                <Button
                    isIconOnly
                    size="sm"
                    variant="flat"
                    className="px-1"
                    onPress={() => editor.chain().focus().toggleTaskList().run()}
                >
                    <ListTodo size={16}/>
                </Button>
            </ActionButton>
        </div>
    );
};

export default TaskList;

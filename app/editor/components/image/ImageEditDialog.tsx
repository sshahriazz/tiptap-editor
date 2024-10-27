import ImageEditBlock from "@/app/editor/components/image/ImageEditBlock";
import { Modal, ModalBody, ModalContent } from "@nextui-org/modal";
import { Button } from "@nextui-org/react";
import type { Editor } from "@tiptap/react";
import { ImageIcon } from "lucide-react";
import { useState } from "react";
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogDescription,
//     DialogTitle,
//     DialogTrigger
// } from '@/components/ui/dialog'
// import { ImageEditBlock } from './image-edit-block'

interface ImageEditDialogProps {
    editor: Editor;
}

export const ImageEditDialog = ({ editor }: ImageEditDialogProps) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button
                isDisabled={editor.isActive("image")}
                aria-label="Image"
                size={"sm"}
                onClick={() => setOpen(true)}
            >
                <ImageIcon className="size-5" />
            </Button>
            <Modal isOpen={open} onClose={() => setOpen(false)}>
                <ModalContent className="sm:max-w-lg">
                    <ModalBody>
                        <h1>Select image</h1>
                        <p className="sr-only">
                            Upload an image from your computer
                        </p>
                    </ModalBody>
                    <ImageEditBlock
                        editor={editor}
                        close={() => setOpen(false)}
                    />
                </ModalContent>
            </Modal>
        </>
    );
};

/* eslint-disable jsx-a11y/alt-text */
import ImageEditBlock from "@/app/editor/components/image/ImageEditBlock";
import {
  Button,
  CardBody,
  CardHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import type { Editor } from "@tiptap/react";
import { Image } from "lucide-react";
import { useState } from "react";
import ActionButton from "../ActionButton";

interface ImageEditDialogProps {
  editor: Editor;
}

export const ImageEditDialog = ({ editor }: ImageEditDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Popover
        isOpen={open}
        onOpenChange={(open) => setOpen(open)}
        placement="bottom"
      >
        <PopoverTrigger>
          <Button
            variant="flat"
            isDisabled={editor.isActive("image")}
            aria-label="Image"
            size={"sm"}
            onClick={() => setOpen(true)}
            isIconOnly
          >
            <ActionButton
              contentForMac={<p>Image</p>}
              contentForWindows={<p>Image</p>}
            >
              <Image size={16} />
            </ActionButton>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <CardHeader>
            <h1 className="text-sm font-bold">Select image</h1>
            <p className="sr-only">Upload an image from your computer</p>
          </CardHeader>
          <CardBody>
            <ImageEditBlock editor={editor} close={() => setOpen(false)} />
          </CardBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

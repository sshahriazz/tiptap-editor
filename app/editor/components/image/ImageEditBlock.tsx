import * as React from "react";
import type { Editor } from "@tiptap/react";
import { Button, Input } from "@nextui-org/react";
import { ArrowUpFromLine } from "lucide-react";

interface ImageEditBlockProps {
  editor: Editor;
  close: () => void;
}

export const ImageEditBlock: React.FC<ImageEditBlockProps> = ({
  editor,
  close,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [link, setLink] = React.useState("");

  const handleClick = React.useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFile = React.useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (!files?.length) return;

      const insertImages = async () => {
        const contentBucket = [];
        const filesArray = Array.from(files);

        for (const file of filesArray) {
          contentBucket.push({ src: file });
        }

        editor.commands.setImages(contentBucket);
      };

      await insertImages();
      close();
    },
    [editor, close]
  );

  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (link) {
        editor.commands.setImages([{ src: link }]);
        close();
      }
    },
    [editor, link, close]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6 min-w-[300px]">
      <div className="space-y-1">
        {/*<Label htmlFor="image-link">Attach an image link</Label>*/}
        <div className="flex flex-col gap-3">
          <Input
            label={"Attach an image link"}
            id="image-link"
            type="url"
            required
            placeholder="https://example.com"
            value={link}
            className="grow w-full"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLink(e.target.value)
            }
          />
          <div className="flex gap-3">
            <Button
              variant="solid"
              type="button"
              size="sm"
              radius="sm"
              color="primary"
              className="w-1/2"
              onClick={handleClick}
              startContent={<ArrowUpFromLine size={14} />}
            >
              Upload
            </Button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              multiple
              className="hidden"
              onChange={handleFile}
            />
            <Button
              variant="flat"
              color="primary"
              type="submit"
              size="sm"
              radius="sm"
              className="w-1/2 ml-auto"
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ImageEditBlock;

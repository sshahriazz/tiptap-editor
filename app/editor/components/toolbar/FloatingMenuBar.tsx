//feature for future
//needed for enter command

import {
  Card,
  CardBody,
  CardHeader,
  Listbox,
  ListboxItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Selection,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { Level } from "@tiptap/extension-heading";
import { useCurrentEditor } from "@tiptap/react";
import {
  Code,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  ImageIcon,
  ListIcon,
  ListOrderedIcon,
  Minus,
  SquareCode,
} from "lucide-react";
import { ReactNode, useState } from "react";
import ImageEditBlock from "../image/ImageEditBlock";

const headingIconMapper: Record<string, ReactNode> = {
  "Heading 1": <Heading1Icon size={16} />,
  "Heading 2": <Heading2Icon size={16} />,
  "Heading 3": <Heading3Icon size={16} />,
  "Heading 4": <Heading4Icon size={16} />,
  "Heading 5": <Heading5Icon size={16} />,
  "Heading 6": <Heading6Icon size={16} />,
  Divider: <Minus size={16} />,
};

const FloatingMenuBar = () => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([""]));
  const [open, setOpen] = useState(false);

  const { editor } = useCurrentEditor();
  if (!editor) {
    return null;
  }

  const handleHeadingChange = (level: Level, key: string) => {
    if (key === "Divider") {
      return editor.chain().focus().setHorizontalRule().run();
    } else {
      editor.chain().focus().setHeading({ level }).run();
    }
  };
  return (
    <Card>
      <CardBody>
        <Tabs aria-label="Tabs radius">
          <Tab key="text" title="Text">
            <div>
              <Listbox
                className="p-0"
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={(x) => setSelectedKeys(x)}
              >
                {Object.keys(headingIconMapper).map((key, index) => (
                  <ListboxItem
                    key={key}
                    onPress={() =>
                      handleHeadingChange((index + 1) as Level, key as string)
                    }
                    className={
                      editor.isActive("heading", {
                        level: index + 1,
                      })
                        ? "text-primary-500"
                        : ""
                    }
                  >
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-100 w-6 h-6 flex justify-center items-center p-1 rounded">
                        {headingIconMapper[key]}
                      </div>
                      <p>{key}</p>
                    </div>
                  </ListboxItem>
                ))}
              </Listbox>
            </div>
          </Tab>
          <Tab key="list" title="List">
            <div>
              <Listbox
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
                className="p-0"
              >
                <ListboxItem
                  key={"bulletList"}
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  className={`
                   ${editor.isActive("bulletList") ? "text-primary-500" : ""} `}
                >
                  <div className="flex items-center gap-2">
                    <ListIcon size={16} /> <p>Bullet List</p>
                  </div>
                </ListboxItem>
                <ListboxItem
                  key={"orderedList"}
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  className={
                    editor.isActive("orderedList") ? "text-primary-500" : ""
                  }
                >
                  <div className="flex items-center gap-2">
                    <ListOrderedIcon size={16} />
                    <p>Ordered List</p>
                  </div>
                </ListboxItem>
              </Listbox>
            </div>
          </Tab>
          <Tab key="advance" title="Advance">
            <div>
              <Listbox
                aria-label="Single selection example"
                variant="flat"
                disallowEmptySelection
                selectionMode="single"
                selectedKeys={selectedKeys}
                onSelectionChange={setSelectedKeys}
                className="p-0"
              >
                <ListboxItem
                  key={"image"}
                  aria-label="Image"
                  onClick={() => setOpen(true)}
                >
                  <Popover isOpen={open} onOpenChange={(open) => setOpen(open)}>
                    <PopoverTrigger>
                      <div className="flex items-center gap-2">
                        <ImageIcon className="size-5" />
                        <p>Image</p>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Card>
                        <CardHeader>
                          <h1>Select image</h1>
                          <p className="sr-only">
                            Upload an image from your computer
                          </p>
                        </CardHeader>
                        <CardBody>
                          <ImageEditBlock
                            editor={editor}
                            close={() => setOpen(false)}
                          />
                        </CardBody>
                      </Card>
                    </PopoverContent>
                  </Popover>
                </ListboxItem>
                <ListboxItem
                  key={"code"}
                  aria-label="Code"
                  onClick={() => editor.chain().focus().toggleCode().run()}
                >
                  <div className="flex items-center gap-2">
                    <Code className="size-5" />
                    <p>Code</p>
                  </div>
                </ListboxItem>
                <ListboxItem
                  key={"codeblock"}
                  aria-label="Codeblock"
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                >
                  <div className="flex items-center gap-2">
                    <SquareCode className="size-5" />
                    <p>Code Block</p>
                  </div>
                </ListboxItem>
              </Listbox>
            </div>
            {/* <Modal
                            className="z-[999999]"
                            isOpen={open}
                            onClose={() => setOpen(false)}
                        >
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
                        </Modal> */}
          </Tab>
        </Tabs>
      </CardBody>
    </Card>
  );
};

export default FloatingMenuBar;

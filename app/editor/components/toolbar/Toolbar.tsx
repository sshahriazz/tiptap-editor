import React from "react";
import { type Editor } from "@tiptap/react";
import { Button } from "@nextui-org/react";
import { Table, TableColumnsSplitIcon } from "lucide-react";
import TableMenu from "./TableMenu";
import TextAlignment from "./TextAlignment";
import UndoRedo from "./UndoRedo";
import UnorderedList from "./UnorderedList";
import HorizontalRule from "./HorizontalRule";
import FontColor from "./FontColor";
import FontHighlight from "./FontHighlight";
import Heading from "./Heading";
import FontStyle from "./FontStyle";
const Toolbar = () => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">

      <UndoRedo  />

      <Heading  />

      <TextAlignment />

      <UnorderedList  />

      <TableMenu  />

      <HorizontalRule  />

      <FontColor />

      <FontHighlight />
      
      <FontStyle  />
      
     
    </div>
  );
};

export default Toolbar;

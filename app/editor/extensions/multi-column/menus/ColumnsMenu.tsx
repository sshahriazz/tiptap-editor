import { BubbleMenu as BaseBubbleMenu, useEditorState } from "@tiptap/react";
import { useCallback } from "react";
import { sticky } from "tippy.js";
import { v4 as uuid } from "uuid";

// import {MenuProps} from '@/components/menus/types'
// import {getRenderContainer} from '@/lib/utils/getRenderContainer'
// import {Toolbar} from '@/components/ui/Toolbar'
import { ColumnLayout } from "../Columns";
import { Icon } from "@/app/editor/extensions/icon";
import getRenderContainer from "@/app/editor/lib/getRenderContainer";
import { Button } from "@nextui-org/react";
// import { Icon } from '@/components/ui/Icon'

export const ColumnsMenu = ({ editor, appendTo }: any) => {
  const getReferenceClientRect = useCallback(() => {
    const renderContainer = getRenderContainer(editor, "columns");
    const rect =
      renderContainer?.getBoundingClientRect() ||
      new DOMRect(-1000, -1000, 0, 0);

    return rect;
  }, [editor]);

  const shouldShow = useCallback(() => {
    const isColumns = editor.isActive("columns");
    return isColumns;
  }, [editor]);

  const onColumnLeft = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.SidebarLeft).run();
  }, [editor]);

  const onColumnRight = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.SidebarRight).run();
  }, [editor]);

  const onColumnTwo = useCallback(() => {
    editor.chain().focus().setLayout(ColumnLayout.TwoColumn).run();
  }, [editor]);
  const { isColumnLeft, isColumnRight, isColumnTwo } = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isColumnLeft: ctx.editor.isActive("columns", {
          layout: ColumnLayout.SidebarLeft,
        }),
        isColumnRight: ctx.editor.isActive("columns", {
          layout: ColumnLayout.SidebarRight,
        }),
        isColumnTwo: ctx.editor.isActive("columns", {
          layout: ColumnLayout.TwoColumn,
        }),
      };
    },
  });

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey={`columnsMenu-${uuid()}`}
      shouldShow={shouldShow}
      updateDelay={0}
      tippyOptions={{
        offset: [0, 8],
        popperOptions: {
          modifiers: [{ name: "flip", enabled: false }],
        },
        getReferenceClientRect,
        appendTo: () => appendTo?.current,
        plugins: [sticky],
        sticky: "popper",
      }}
    >
      <Button
        variant="flat"
        size="sm"
        isDisabled={isColumnLeft}
        onClick={onColumnLeft}
      >
        <Icon name="PanelLeft" />
      </Button>
      <Button
        variant="flat"
        size="sm"
        isDisabled={isColumnTwo}
        onClick={onColumnTwo}
      >
        <Icon name="Columns2" />
      </Button>
      <Button
        variant="flat"
        size="sm"
        isDisabled={isColumnRight}
        onClick={onColumnRight}
      >
        <Icon name="PanelRight" />
      </Button>
    </BaseBubbleMenu>
  );
};

export default ColumnsMenu;

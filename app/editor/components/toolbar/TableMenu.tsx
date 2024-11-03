import { Button, ButtonGroup } from "@nextui-org/react";
import { Grid2x2, Table } from "lucide-react";
import ActionButton from "../ActionButton";

const TableMenu = ({ editor }: any) => {
  return (
    <ButtonGroup>
      <Button
        variant="flat"
        isIconOnly
        size="sm"
        onPress={() =>
          editor
            .chain()
            .focus()
            .insertTable({ rows: 3, cols: 3, withHeaderRow: false })
            .run()
        }
      >
        <ActionButton
          contentForMac={<p>Table</p>}
          contentForWindows={<p>Table</p>}
        >
          <Grid2x2 className="font-[200]" size={16} />
        </ActionButton>
      </Button>
    </ButtonGroup>
  );
};

export default TableMenu;

import { useState, useEffect } from "react";

// hooks
import useQueryTable from "./hooks/useQueryTable";
import useMutateTable from "./hooks/useMutateTable";
import useQueryCells from "./hooks/useQueryCells";
// hooks: column
import useColumnDelete from "./hooks/useColumnDelete";
import useColumnAdd from "./hooks/useColumnAdd";
// hooks: row
import useRowDelete from "./hooks/useRowDelete";
import useRowAdd from "./hooks/useRowAdd";

// utill
import { sort_cells } from "./util/sort_cell";

// components
import Cell from "./Cell/Cell";

type TableProps = {
  parentElementI: string;
};

export default function Table({ parentElementI }: TableProps) {
  // hook init
  const { data: Table } = useQueryTable({ parentElementI: parentElementI });
  const { data: CellData } = useQueryCells({
    parentElementI: parentElementI,
    tableId: Table?.id,
  });

  const mutateTable = useMutateTable();
  // hooks : column
  const columnDelete = useColumnDelete();
  const columnAdd = useColumnAdd();
  // hooks : row
  const rowDelete = useRowDelete();
  const rowAdd = useRowAdd();

  const [dummyTableTitle, setDummyTableTitle] = useState("");

  useEffect(() => {
    if (!Table?.name) return;
    setDummyTableTitle(Table.name);
  }, [Table?.name]);

  // vars for rendering
  const sortedCells = sort_cells(CellData);
  let columnCount;
  if (sortedCells) {
    columnCount = Math.max(...sortedCells.map((c) => c.columnIndex));
  }

  // handlers
  const handleTableNameChange = () => {
    if (dummyTableTitle.length <= 0) return;
    mutateTable.mutate({
      tableI: parentElementI,
      newName: dummyTableTitle,
      tableId: String(Table.id),
    });
  };

  const handleColumnDelete = (cellColIndex: number) => {
    columnDelete.mutate({
      index: cellColIndex,
      tableId: Table?.id,
      parentElementI: parentElementI,
    });
  };

  const handleColumnAdd = () => {
    columnAdd.mutate({
      tableId: Table?.id,
      parentElementI: parentElementI,
    });
  };

  const handleRowDelete = (cellRowIndex: number) => {
    rowDelete.mutate({
      index: cellRowIndex,
      tableId: Table?.id,
      parentElementI: parentElementI,
    });
  };

  const handleRowAdd = () => {
    rowAdd.mutate({
      tableId: Table?.id,
      parentElementI: parentElementI,
    });
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <input
          onChange={(e) => setDummyTableTitle(e.target.value)}
          value={dummyTableTitle}
          onBlur={handleTableNameChange}
        />
      </div>

      <div className="table-body">
        {/* ADD COL*/}
        <button className="add-column-btn table-btn" onClick={handleColumnAdd}>
          +
        </button>

        {/* TABLE */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
            gap: "8px",
          }}
        >
          {CellData && sortedCells ? (
            sortedCells.map((cell, i) => (
              <Cell
                arrayIndex={i}
                rowIndex={cell.rowIndex}
                columnIndex={cell.columnIndex}
                text={cell.text}
              />
            ))
          ) : (
            <span> </span>
          )}
        </div>

        {/* ADD ROW*/}
        <button className="add-row-btn table-btn" onClick={handleRowAdd}>
          +
        </button>
      </div>
    </div>
  );
}

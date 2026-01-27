import { useState, useEffect } from "react";

// hooks
import useQueryTable from "./hooks/useQueryTable";
import useMutateTable from "./hooks/useMutateTable";
import useQueryCells from "./hooks/useQueryCells";
import useColumnAdd from "./hooks/useColumnAdd";
import useRowAdd from "./hooks/useRowAdd";

// utill
import { sort_cells } from "./util/sort_cell";

// components
import Cell from "./Cell/Cell";
import { TailSpin } from "react-loader-spinner";

type TableProps = {
  parentElementI: string;
};

export default function Table({ parentElementI }: TableProps) {
  // hook init
  const { data: Table, isLoading} = useQueryTable({ parentElementI: parentElementI });
  const { data: CellData } = useQueryCells({
    parentElementI: parentElementI,
    tableId: Table?.id,
  });
  const mutateTable = useMutateTable();
  const columnAdd = useColumnAdd();
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
  const hasCells = !!(sortedCells && sortedCells.length > 0);

  // handlers
  const handleTableNameChange = () => {
    if (dummyTableTitle.length <= 0) return;
    mutateTable.mutate({
      tableI: parentElementI,
      newName: dummyTableTitle,
      tableId: String(Table.id),
    });
  };

  const handleColumnAdd = () => {
    columnAdd.mutate({
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

  const handleInitialAdd = async () => {
    if (!Table?.id) return;

    try {
      await rowAdd.mutateAsync({
        tableId: Table.id,
        parentElementI,
      });

      await columnAdd.mutateAsync({
        tableId: Table.id,
        parentElementI,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {isLoading && (
        <TailSpin
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            visible={isLoading}
        />
        )}

        {Table && (
          <div className="table-container">
            <div className="table-header">
              <input
                onChange={(e) => setDummyTableTitle(e.target.value)}
                value={dummyTableTitle}
                onBlur={handleTableNameChange}
              />
            </div>

            <div className="table-body">
              {!hasCells ? (
                /* INITIAL STATE */
                <button
                  className="table-btn add-initial-btn"
                  onClick={handleInitialAdd}
                >
                  +
                </button>
              ) : (
                <>
                  {/* TABLE */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
                      gap: "8px",
                    }}
                  >
                    {sortedCells.map((cell) => (
                      <Cell
                        key={`cell-${cell.id}`}
                        id={cell.id}
                        rowIndex={cell.rowIndex}
                        columnIndex={cell.columnIndex}
                        text={cell.text}
                        tableId={String(Table?.id)}
                        parentElementI={parentElementI}
                      />
                    ))}
                  </div>

                  {/* ADD COLUMN */}
                  <button
                    className="add-column-btn table-btn"
                    onClick={handleColumnAdd}
                  >
                    +
                  </button>

                  {/* ADD ROW */}
                  <button className="add-row-btn table-btn" onClick={handleRowAdd}>
                    +
                  </button>
                </>
              )}
            </div>
          </div>


        )}

 
    </>

   


  );
}

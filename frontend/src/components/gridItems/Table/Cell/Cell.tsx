import { motion } from "framer-motion";
import { useState } from "react";

// hooks
import useRowDelete from "./hooks/useRowDelete";
import useColumnDelete from "./hooks/useColumnDelete";
import useMutateCell from "./hooks/useMutateCell";

export type CellProps = {
    id : number 
    text: string;
    columnIndex: number;
    rowIndex: number;
    tableId: string;
    parentElementI: string;
};

export default function Cell({text, columnIndex, rowIndex, id,tableId, parentElementI, }: CellProps) {

    const [hovered, setHovered] = useState(false);
    const [cellTextDummy, setCellTextDummy] = useState(text)

    // hook init
    const rowDelete = useRowDelete();
    const columnDelete = useColumnDelete();
    const mutateCell = useMutateCell()

    // handlers
    const handleRowDelete = (cellRowIndex: number) => {
        rowDelete.mutate({
            index: cellRowIndex,
            tableId,
            parentElementI,
        });
    };

    const handleColumnDelete = (cellColIndex: number) => {
        columnDelete.mutate({
            index: cellColIndex,
            tableId,
            parentElementI,
        });
    };

    const handleTextSubmit = () => {
        if (cellTextDummy == text) return
        mutateCell.mutate({
            cellId : String(id),
            newText : cellTextDummy ,
            tableId : tableId,
            tableI : parentElementI,
        })
    }

    const handleTextChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setCellTextDummy(e.target.value)
        e.currentTarget.style.height = "auto";
        
    }


    return (
        <motion.div
            className="cell-container"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {columnIndex == 1 && (
                <motion.button
                    className="left-del-btn"
                    animate={{
                        opacity: hovered ? 1 : 0,
                        scale: hovered ? 1 : 0.85,
                        pointerEvents: hovered ? "auto" : "none",
                    }}
                    transition={{ duration: 0.15 }}
                    onClick={() => handleRowDelete(rowIndex)}
                >
                    X
                </motion.button>
            )}

            {rowIndex == 1 && (
                <motion.button
                    className="top-del-btn"
                    animate={{
                        opacity: hovered ? 1 : 0,
                        scale: hovered ? 1 : 0.85,
                        pointerEvents: hovered ? "auto" : "none",
                    }}
                    transition={{ duration: 0.15 }}
                    onClick={() => handleColumnDelete(columnIndex)}
                >
                    X
                </motion.button>
            )}

            {/* Text Area */}
            <textarea 
                className="cell-textarea" 
                value={cellTextDummy} 
                onChange={handleTextChange}
                onBlur={handleTextSubmit}
            />
        </motion.div>
    );
}

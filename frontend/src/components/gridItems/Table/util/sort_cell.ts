import type { Cell } from "../Cell/Cell"


export function sort_cells (cells : Cell[]) {
    
    if (!cells) return

    return [...cells].sort((a, b) => {
        if (a.rowIndex!== b.rowIndex) {
        return a.rowIndex - b.rowIndex
        }
        return a.columnIndex - b.columnIndex
    })
    }
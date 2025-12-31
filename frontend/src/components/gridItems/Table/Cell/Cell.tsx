
export type Cell = {
    text: string
    columnIndex: number,
    rowIndex: number, 
    arrayIndex : number
}


export default function Cell({text, columnIndex, rowIndex, arrayIndex} : Cell) {

    return (
        <div
            //FIX THIS
            key={`cell-${arrayIndex}`}
            style={{
                border: "1px solid #ccc",
                padding: "8px",
                textAlign: "center",
            }}
        >
            {text} | {columnIndex} | {rowIndex}
        </div>

    )


}
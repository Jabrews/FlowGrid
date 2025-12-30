import { useState } from "react"

// hooks
import useQueryTable from "./hooks/useQueryTable" 
import useMutateTable from "./hooks/useMutateTable"

type TableProps = {
    parentElementI : string
}

export default function Table({parentElementI} : TableProps) {


    // hook init
    const {data : Table} = useQueryTable({parentElementI : parentElementI})
    const mutateTable = useMutateTable()

    const [dummyTableTitle, setDummyTableTitle] = useState(Table.name)

    const handleTableNameChange = () => {
        if (dummyTableTitle.length <= 0) return
        mutateTable.mutate({
            tableI: parentElementI ,
            newName : dummyTableTitle ,
            tableId : String(Table.id)
        })
    }    


    return (
        <div className='table-container'>

            <div className='table-header'>
                <input 
                onChange={(e) => setDummyTableTitle(e.target.value)} 
                value={dummyTableTitle}
                onBlur={handleTableNameChange}
                />
            </div>

            <div className='table-body'> 

            </div>

        </div>
    )

}
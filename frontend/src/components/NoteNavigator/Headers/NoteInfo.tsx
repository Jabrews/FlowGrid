
// hooks
import { useActiveFolderName, useActiveNoteName } from "../../stores/NoteNavigatorStore/NoteNavigatorStore";


export default function NoteInfo() {

    const folderName = useActiveFolderName()
    const noteName = useActiveNoteName()

    return (
        <>
            {folderName.length > 0 ? (
                <p className="note-info-container">
                    {folderName}/{noteName.length > 0 ? noteName : ' '}
                </p>
            ) : (
                <span/> 
            )}       
        
        </>
    )



}
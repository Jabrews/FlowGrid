import { useState, useEffect} from "react";

// hooks
import useCreateNote from "../hooks/note/useCreateNote";

// util
import type { Note as NoteType } from "../util/folder_types";
import { get_svg_icons } from "../../../util/get_svg_icons";

// components 
import Folder from "./Folder";
import Note from "./Note";

type PannelItemProps = {
    name : string
    id : number,
    notes : NoteType[]
    note_directory_id : number,
}



export default function PannelItem({name, id, notes, note_directory_id} : PannelItemProps) {

    // hook init
    const [folderOpen, toggleFolderOpen] = useState(() => {
        const data = localStorage.getItem(`folder-open-${id}`)
        if (!data) return false
        const bool = JSON.parse(data)
        return bool

    })
    const createNote = useCreateNote()

    // handlers
    const handeAddNote = () => {
        createNote.mutate({
            note_directory_id : String(note_directory_id),
            folder_id : String(id),
        })
    }



    // local storage folder open on startup
    useEffect(() => {
        let folderOpenLocal : boolean = false
        const data = localStorage.getItem(`folder-open-${id}`)
        if (!data) return
        const bool = JSON.parse(data)
        folderOpenLocal = bool
        toggleFolderOpen(folderOpenLocal)
    }, [id])    

    // set when it changes
    useEffect(() => {
        localStorage.setItem(`folder-open-${id}`, String(folderOpen))
    }, [folderOpen, toggleFolderOpen, id])


    return (
        <div
            key={id}
            className="folder-pannel-item-container"
        >
            <Folder
            note_directory_id={note_directory_id}
            key={`folder-${id}`}
            id={id}
            name={name}
            folderOpen={folderOpen}
            toggleFolderOpen={toggleFolderOpen}
            />

            {notes.length == 0 &&
                <span> </span> 
            }

            {notes.length == 0 && folderOpen &&
                <div className='no-notes-container'>
                <div 
                    className='dot'
                >
                    {get_svg_icons({icon : 'bullet', size : 20})} 
                </div> 
                <p className='no-notes-text'> new note? </p> 
                <button
                onClick={handeAddNote}
                > + 
                </button>
                </div>
            }

            {notes.length > 0 && folderOpen && (
            <div className="note-list">
                {notes.map((note) => (
                    <div className='note-icon-wrapper'>
                        <span 
                        className="folder-corner"
                        id={`dot-div-${note.id}`}
                        > 
                            {get_svg_icons({icon : 'bullet', size : 10})} 
                        </span>
                        <Note
                            folder_id={id}
                            note_directory_id={note_directory_id}
                            key={`note-${note.id}`}
                            id={note.id}
                            title={note.title}
                        />
                    </div>
                ))}
            </div>
            )}
    


        </div>
    )
}
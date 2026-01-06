import { useState} from "react";

// util
import type { FolderPartial } from "../util/folder_types";
import { get_svg_icons } from "../../../util/get_svg_icons";

// components 
import Folder from "./Folder";
import Note from "./Note";


export default function PannelItem({name, id, notes} : FolderPartial) {

    const [folderOpen, toggleFolderOpen] = useState(false)

    return (
        <div
            key={id}
            className="folder-pannel-item-container"
        >
            <Folder
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
                <button> + </button>
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
                            key={note.id}
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
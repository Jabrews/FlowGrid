import {useEffect, useState} from "react"

// hooks
import { useShowFolderPannel, useToggleShowFolderPannel } from "../../stores/NoteNavigatorStore/NoteNavigatorStore"
import { useActiveNotes, useDeleteActiveNote} from "../../stores/ActiveNoteStore/ActiveNoteStore"
import useQueryRawObjects from "./TextArea/hooks/useQueryRawObjects"

// util
import { get_svg_icons } from "../../util/get_svg_icons"
import type { ActiveNote } from "../../stores/ActiveNoteStore/ActiveNoteStore"

// components
import TextArea from "./TextArea/TextArea"

export default function NoteEditor(){

    // hook init
    const [activeNoteId , setActiveNoteId] = useState(0)
    const showFolderPannel = useShowFolderPannel()
    const activeNotes = useActiveNotes()
    const deleteActiveNote = useDeleteActiveNote()
    const toggleShowFolderPannel = useToggleShowFolderPannel()
    const {data : rawObjs} = useQueryRawObjects({noteId : activeNoteId})

    const handleNoteTabItemClick = (noteId : number) => {
        if (activeNoteId == noteId) {
            setActiveNoteId(0)
        }
        else {
            setActiveNoteId(noteId)
        }
    }

    useEffect(() => {
        // see if active note exist still 
        // this occurs if in folder pannell it is delete
        const activeNote = activeNotes.find((activeNote : ActiveNote) => activeNote.noteId == activeNoteId)
        if (!activeNote) setActiveNoteId(0)
    }, [activeNotes, setActiveNoteId, activeNoteId])



    return (
        <div 
            className="note-editor-container"
        >
            <div className='note-editor-header'>
                <button 
                    className='close-icon'
                    onClick={() => {toggleShowFolderPannel(!showFolderPannel)}} 
                >
                    {showFolderPannel ? (
                        get_svg_icons({icon : 'Side-Dropper-Close', size : 20 })
                    ) : (
                        get_svg_icons({icon : 'Side-Dropper-Open', size : 20 })
                    )}


                </button>
                <p> Note Editor </p>
                <button className='icon'>
                    {get_svg_icons({icon : 'notebook_open', size : 14})}
                </button>

            </div>
            <div className='note-tab-container'>
                {activeNotes.length > 0 &&
                    activeNotes.map((activeNote : ActiveNote) =>
                        <div 
                            className={`note-tab-item ${activeNoteId == activeNote.noteId ? 'active' : ''}`}
                            key={`note-tab-${activeNote.noteId}`}
                            onClick={() => handleNoteTabItemClick(activeNote.noteId)}
                        >
                            <p> {activeNote.title} </p>
                            <button onClick={(e) => {
                                e.stopPropagation() 
                                deleteActiveNote(activeNote.noteId)
                                setActiveNoteId(0)
                                }}> 
                                    X 
                            </button>
                        </div>
                    ) 
                }
            </div>
            
            {activeNoteId !== 0 && rawObjs && rawObjs.length > 0 &&
                <TextArea 
                    rawObjs={rawObjs} 
                    noteId={activeNoteId}
                />
            }

        </div>
    )

}

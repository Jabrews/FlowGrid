import { useEffect, useState } from "react";

// hooks
import { useActiveTextLineNum } from "./TextLine/hooks/ActiveTextLineStore";
import { useActiveNotes } from "../../../stores/ActiveNoteStore/ActiveNoteStore";
import useChangeNoteName from "../../FolderPannel/hooks/note/useChangeNoteName";
import {useNoteDirectoryId} from "../../../stores/NoteDirectoryInfoStore/NoteDirectoryInfoStore";
import { useSetActiveNoteName } from "../../../stores/NoteNavigatorStore/NoteNavigatorStore";

// utill
import type { RawObj } from "./util/text_area_types";
import type { ActiveNote } from "../../../stores/ActiveNoteStore/ActiveNoteStore";

// components
import TextAreaBtns from "./TextAreaBtns/TextAreaBtns";
import DisplayLine from "./DisplayLine/DisplayLine";
import TextLine from "./TextLine/TextLine";

type TextAreaProps = {
    rawObjs: RawObj[]
    noteId : number;
}

export default function TextArea({ rawObjs, noteId}: TextAreaProps) {

    // hook init
    // const setActiveTextLineNum = useSetActiveTextLineNum()
    const activeTextLineNum = useActiveTextLineNum()
    const setActiveNoteName = useSetActiveNoteName()
    // title note stuff
    const activeNotes = useActiveNotes()
    const [activeNote, setActiveNote] = useState<ActiveNote>({title : '', noteId : 0, parentFolderId: 0})
    const changeNoteName = useChangeNoteName()
    const noteDirectoryId = useNoteDirectoryId()

    useEffect(() => {
        const activeNote = activeNotes.find((activeNote) => activeNote.noteId == noteId)
        if (!activeNote) return
        setActiveNote(activeNote)
        if (activeNote) {
            setActiveNoteName(activeNote.title)
        }
    }, [noteId, setActiveNote, activeNotes, setActiveNoteName])


    // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === 'ArrowUp') {
    //         e.preventDefault();
    //         setActiveTextLineNum(Math.max(1, activeTextLineNum - 1));
    //         return;
    //     }

    //     if (e.key === 'ArrowDown') {
    //         e.preventDefault();
    //         setActiveTextLineNum(activeTextLineNum + 1);
    //         return;
    //     }
    // };

    const handleDummyNoteTitleBlur = () => {

        if (noteDirectoryId == 0) return
        if (!activeNote) return

        changeNoteName.mutate({
            note_directory_id : String(noteDirectoryId),
            folder_id : String(activeNote.parentFolderId), 
            note_id : activeNote.noteId,
            newTitle : activeNote.title,
        })
    }
    


    return (

        <>
        <TextAreaBtns rawObjs={rawObjs} noteId={noteId}/>
        <div className='text-area-container'>

            <div
                className='text-line-container'
                // onKeyDown={handleKeyDown}
            >
                <input 
                    className='title-input'
                    value={activeNote?.title}
                onChange={(e) => {
                const value = e.target.value
                setActiveNote(prev =>
                    prev ? { ...prev, title: value } : prev
                )
                }}
                onBlur={handleDummyNoteTitleBlur}
                />

                {/* render based upon line num */}
                {rawObjs.length > 0 && rawObjs.map((rawObj: RawObj) => {
                    return rawObj.lineNum === activeTextLineNum ? (
                        <div
                            className="text-line-item-container"
                            key={`textlineitem-${rawObj.lineNum}`}
                        >
                            <TextLine
                                rawObject={rawObj}
                                noteId={noteId}
                                rawObjects={rawObjs}
                            />
                        </div>
                    ) : (
                        <div
                            className="display-line-item-container"
                            key={`displaylineitem-${rawObj.lineNum}`}
                        >
                            <DisplayLine
                                text={rawObj.text}
                                lineNum={rawObj.lineNum}
                            />
                        </div>
                    )
                })}

            </div>

        </div>
        </>

    )



}

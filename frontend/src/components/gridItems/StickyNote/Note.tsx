import {useState, useEffect} from 'react';

// hooks
import {useRenameList, useGetNoteItems} from './hooks/useStickyNoteStore'
import type {NoteItem} from './hooks/useStickyNoteStore'

// components 
import NoteArea from './NoteArea'

type NoteProps = {
    noteListId : string;
    stickyNoteId : string;
    isHovered : boolean;
    title : string;
}

export default function Note({noteListId, stickyNoteId, isHovered, title} : NoteProps) {
    
    const [placeholderTitle , setPlaceholderTitle] = useState<string>(title);
    const [noteItems, setNoteItems] = useState<NoteItem[]>([])


    // hook init
    const renameList = useRenameList() 
    const getNoteItems = useGetNoteItems()


    useEffect(() => {
        const newNoteItems = getNoteItems(stickyNoteId, noteListId)
        setNoteItems(newNoteItems)
    }, [getNoteItems, noteListId, stickyNoteId])



    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPlaceholderTitle(e.target.value);
    }

    const handleTitleChangeSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        renameList(stickyNoteId, noteListId, placeholderTitle)
    }

    const handleTitleChangeLeave = () => {
        setPlaceholderTitle(title)
    }


    return (
        <div
        className='note-parent-container' 
        key={noteListId}
        >
            {/* Note Header */}
            <form
            onSubmit={handleTitleChangeSubmit} 
            onBlur={handleTitleChangeLeave}
            >
                <input name='note-header-input' placeholder={placeholderTitle} value={placeholderTitle} className='title' onChange={(e) => handleTitleChange(e)}/>
            </form>
            <div className='note-container'
            style={{gridTemplateColumns: isHovered ? '1fr' : '1fr 5fr'}} 
            > 
                <NoteArea noteListId={noteListId} stickyId={stickyNoteId} isHovered={isHovered}/>


            </div>



        </div>
    )

}
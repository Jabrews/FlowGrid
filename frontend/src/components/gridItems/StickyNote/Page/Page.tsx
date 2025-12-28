import {useState} from 'react'

// hooks
import useMutateStickyPage from './hooks/useMutateStickyPage'

// utill
import type { StickyPage } from '../util/sticky_types'


type PageProps = {
    stickyPage : StickyPage
    stickyNoteI : string
}

export default function Page({stickyPage, stickyNoteI} : PageProps) {

    // hook init    
    const mutateStickyPage = useMutateStickyPage()

    const [dummyTitle, setDummyTitle] = useState(stickyPage.title)

    const handleTitleChangeSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutateStickyPage.mutate({
            stickyNoteI : stickyNoteI ,
            stickyNoteId : stickyPage.stickyNoteId,
            stickyPageId : String(stickyPage.id),
            newTitle : dummyTitle,
        })
    }



    return (
        <div
        className='note-parent-container' 
        key={`sticky-page-${stickyPage.id}`}
        >
            {/* Note Header */}
            <form
            onSubmit={handleTitleChangeSubmit} 
            >
                <input 
                    name='note-header-input' 
                    value={dummyTitle} 
                    className='title' 
                    onChange={(e) => setDummyTitle(e.target.value)}
                />
            </form>
            <div className='note-container'
            // style={{gridTemplateColumns: isHovered ? '1fr' : '1fr 5fr'}} 
            style={{gridTemplateColumns : '1fr'}}
            > 
                {/* <NoteArea noteListId={noteListId} stickyId={stickyNoteId} isHovered={isHovered}/> */}
                <p> note area</p>
            </div>
            <button className='add-btn'> + </button>



        </div>
    )

}


import {useState} from 'react'

// hooks
import useMutateStickyPage from './hooks/useMutateStickyPage'
import useQueryLine from './hooks/useQueryLine'
import useCreateLine from './hooks/useCreateLine'

// utill
import type { StickyPage } from '../util/sticky_types'
import type { LineType } from '../util/sticky_types'

// componenets
import Line from '../Line/Line'


type PageProps = {
    stickyPage : StickyPage
    stickyNoteI : string
    stickyNoteId : number 
}

export default function Page({stickyPage, stickyNoteI, stickyNoteId} : PageProps) {

    // hook init    
    const mutateStickyPage = useMutateStickyPage()
    const {data : Lines} = useQueryLine({
        stickyNoteI : stickyNoteI ,
        stickyNoteId : String(stickyNoteId),
        stickyPageId : String(stickyPage.id),
    })
    console.log('sticky page: ', stickyPage)
    const createLine = useCreateLine()

    const [dummyTitle, setDummyTitle] = useState(stickyPage.title)

    const handleTitleChangeSubmit = () => {
        if (dummyTitle.length <= 0 ) return
        mutateStickyPage.mutate({
            stickyNoteI : stickyNoteI ,
            stickyNoteId : stickyPage.stickyNoteId,
            stickyPageId : String(stickyPage.id),
            newTitle : dummyTitle,
        })
    }

    const handleCreateLineBtn= () => {
        createLine.mutate({
            stickyNoteI : stickyNoteI,
            stickyNoteId : stickyPage.stickyNoteId, 
            stickyPageId : String(stickyPage.id), 
        })
    }



    return (
        <div
        className='note-parent-container' 
        key={`sticky-page-${stickyPage.id}`}
        >
            <input 
                placeholder='title'
                name='note-header-input' 
                value={dummyTitle} 
                className='title' 
                onChange={(e) => setDummyTitle(e.target.value)}
                onBlur={handleTitleChangeSubmit}
            />
            <div className='note-container'
            // style={{gridTemplateColumns: isHovered ? '1fr' : '1fr 5fr'}} 
            style={{gridTemplateColumns : '1fr'}}
            > 
                {/* so many lines sorry */}
                {Lines && Lines.length > 0 ? (
                    Lines.map((line : LineType) =>
                       <Line line={line} key={`line-${line.id}`} stickyI={stickyNoteI} pageId={String(stickyPage.id)} stickyId={String(stickyNoteId)}/> 
                    )
                ) : (
                    <p> no items found </p>
                )}
            </div>
            <button className='add-btn' onClick={handleCreateLineBtn}> + </button>



        </div>
    )

}


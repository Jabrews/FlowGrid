import { useState } from 'react';
import { motion } from 'framer-motion';

// hooks
import useQuerySticky from './hooks/useQuerySticky';
import useQueryStickyNotePage from './hooks/useQueryStickyNotePage';
import useCreateStickyPage from './Page/hooks/useCreateStickyPage';
import useDeleteSticky from './hooks/useDeleteSticky';

// // components
import Page from './Page/Page';

type StickyNoteProps = {
    parentElementI : string
};

export default function StickyNote({ parentElementI }: StickyNoteProps) {

    const [selectedIndex, setSelectedIndex] = useState(0)

    // // hook init
    const {data : Sticky } = useQuerySticky({stickyNoteI : parentElementI})
    const {data : StickyPage} = useQueryStickyNotePage({
        stickyNoteI : parentElementI,
        stickyNoteId : Sticky?.id
    })
    console.log('sticky page : ', StickyPage, selectedIndex)
    const createStickyPage = useCreateStickyPage()
    const deleteStickyPage = useDeleteSticky()

    const naviateNoteListFoward = () => {
        if (!StickyPage) return
        if (selectedIndex + 1 < StickyPage.length) {
            setSelectedIndex(prev => prev + 1)
        }
    }


    const navigateNoteListBackward = () => {
        if (!StickyPage) return
        if (selectedIndex - 1 >= 0)  {
            setSelectedIndex((prev) => prev - 1)
        }
    }

    const handleAddNoteList = () => {
        if (!Sticky) return
        createStickyPage.mutate({
            stickyId : String(Sticky.id),
            stickyI : parentElementI,
        })
    }

    const handleDeleteNoteList = () => {
        if (!Sticky || !StickyPage) return
        deleteStickyPage.mutate({
            stickyI : parentElementI,
            stickyId : String(Sticky.id),
            stickyPageId : String(StickyPage[selectedIndex].id)
        })



    }

    // const activeNote = noteObjects[selectedNoteIndex] ?? null

    return (
        <motion.div
        className="note-list-container highlight-content"
        >
        {/* Toolbar */}
        <motion.div
            className="note-toolbar-container"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <button className="add-note-btn" onClick={() => handleAddNoteList()}>
            +
            </button>
            <div className="navigate-note-btn">
            <p className="navigate-left-btn" onClick={() => navigateNoteListBackward()}>{'<'}</p>
            <p>
                {selectedIndex  + 1}/
                {StickyPage && StickyPage.length > 0 ? (
                    StickyPage.length
                ) : (0)}
            </p>
            <p className="navigate-right-btn" onClick={() => naviateNoteListFoward()}>{'>'}</p>

            </div>
            <button className="delete-note-btn" onClick={handleDeleteNoteList}>
            X
            </button>

        </motion.div>

        {/* Notes */}
        <div 
        className="note-list-item-container"
        style={{overflowY: 'scroll'}}
        >

        {Sticky && StickyPage && StickyPage.length > 0 && StickyPage[selectedIndex] ? (
            <Page
            key={StickyPage[selectedIndex].id}
            stickyPage={StickyPage[selectedIndex]}
            stickyNoteI={parentElementI}
            stickyNoteId={Sticky.id}
            />
        ) : (
            <p> no note found</p>
        )}


        </div>
        </motion.div>
    );
    }

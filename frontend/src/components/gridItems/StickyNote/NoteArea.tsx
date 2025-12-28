import { motion } from 'framer-motion';
import {nanoid} from 'nanoid'

// hooks 
import {useAddItem, useGetNoteItems} from './hooks/useStickyNoteStore'
import type {NoteItem} from './hooks/useStickyNoteStore'

// components
import NoteAreaItem from './NoteAreaItem'

type NoteAreaProps = {
  noteListId: string;
  stickyId: string;
  isHovered: boolean;
};

export default function NoteArea({ noteListId, stickyId, isHovered }: NoteAreaProps) {

    // hook init
    const addItem = useAddItem()
    const getNoteItems = useGetNoteItems()

    const noteItems = getNoteItems(stickyId, noteListId)

    const handleAddItem = () => {
        const newItem : NoteItem = {
            id : `note-item-${nanoid()}`, 
            type : 'text',
            text : ''
        }
        addItem(stickyId, noteListId, newItem)
    }


  return (



    <div className="note-area-container" key={`note-area-${noteListId}`}>
      <div className="note-area-item-container">
        {noteItems.map((item : NoteItem) => (
            <NoteAreaItem
                key={item.id}
                item={item}
                noteListId={noteListId}
                stickyId={stickyId}
            />
        ))}
      </div>

      {isHovered && (
        <motion.button
          className="note-area-add-item-btn"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          onClick={handleAddItem}
          style={{marginLeft: noteItems.length <= 0 ? '10em' : '0'}}
        >
          Add Item
        </motion.button>
      )}
    </div>
  );
}

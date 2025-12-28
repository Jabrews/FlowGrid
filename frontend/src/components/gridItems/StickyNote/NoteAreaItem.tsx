import { useState, useRef, useEffect } from "react";
import { FaXmark } from "react-icons/fa6";

// hooks
import {
    useCycleItemType,
    useEditItemText,
    useDeleteItem,
} from './hooks/useStickyNoteStore.tsx'
import type {NoteItem} from './hooks/useStickyNoteStore'

type Props = {
  item: NoteItem;
  noteListId: string;
  stickyId: string;
};

export default function NoteAreaitem({ item, noteListId, stickyId}: Props) {

    const cycleItemType = useCycleItemType()
    const editItemText = useEditItemText()
    const deleteItem = useDeleteItem()

    const [placeholderValue, setPlaceHolderValue] = useState(item.text)
    const [showDeleteIcon, toggleShowDeleteIcon] = useState(false)
    const itemRef = useRef<HTMLDivElement | null>(null);
 
    const handleCycleItemType = () => {
        cycleItemType(stickyId, noteListId, item.id)
    }

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newText = e.target.value;
        setPlaceHolderValue(newText);
        editItemText(stickyId, noteListId, item.id, placeholderValue );
        e.target.style.height = "auto";
        e.target.style.height = e.target.scrollHeight + "px";
    };
  
    const handleDelete = () => {
        deleteItem(stickyId, noteListId, item.id)
    }

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
          toggleShowDeleteIcon(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
  

  return (
    <div className="note-area-item" ref={itemRef}>
      {/* DELETE ICON */}
      <div
        className="note-area-item-delete-icon"
        style={{ display: showDeleteIcon ? "block" : "none" }}
      >
        <button className="delete-note-item-btn" onClick={handleDelete}>
          <FaXmark className="delete-icon" />
        </button>
      </div>

      {/* ITEM SYMBOL */}
 
      <div onClick={handleCycleItemType} >
        {item.type === "checkbox" && (
            <input name='checkbox-input' type="checkbox" checked={item.checkboxStatus} readOnly />
        )}
        {item.type === "bullet" && <p>&#x2022;</p>}
        {item.type === "text" && showDeleteIcon && <p>-</p>}

      </div>

      {/* TEXTAREA */}
      <textarea
        name='note-text-area'
        placeholder="type here"
        value={placeholderValue}
        onChange={handleTextAreaChange}
        onClick={() => toggleShowDeleteIcon(true)}
        style={{ overflow: "hidden", resize: "none" }}
      />
    </div>
  );
}

import { useRef, useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { get_svg_icons } from "../../../util/get_svg_icons";

// hooks
import useDeleteNote from "../hooks/note/useDeleteNote";
import useChangeNoteName from "../hooks/note/useChangeNoteName";
// del modal hooks
import { useConfirmStore } from "../../../stores/ConfirmStore/ConfirmStore";
import { useToggleShowDeleteModal } from "../../../stores/ModalRendererStore/ModelRendererStore";

export type NoteProps = {
    title: string;
    id: number;
    folder_id : number,
    note_directory_id : number
};

export default function Note({ title, id, folder_id, note_directory_id}: NoteProps) {

    // hook init
    const [dummyTitle, setDummyTitle] = useState(title);
    const [isActive, setIsActive] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const deleteNote = useDeleteNote()
    const changeNoteName = useChangeNoteName()
    const toggleShowDeleteModal = useToggleShowDeleteModal()
    const {ask} = useConfirmStore()


    // help refs
    const inputRef = useRef<HTMLInputElement | null>(null);
    const measureRef = useRef<HTMLSpanElement | null>(null);

    /* helpers */
    const focusInput = () => {
        requestAnimationFrame(() => inputRef.current?.focus());
    };

    const startEditing = () => {
        setIsActive(true);
        setIsEditing(true);
        focusInput();
    };

    const finishEditing = () => {
        if (dummyTitle.length <= 0 || dummyTitle == title) {
            setDummyTitle(title)
            setIsEditing(false);
            return
        }

        setIsEditing(false);
        changeNoteName.mutate({
            note_directory_id: String(note_directory_id),
            folder_id: String(folder_id),
            newTitle: dummyTitle,
            note_id : String(id)
        })


    };

    const handleContainerClick = () => {
        if (isEditing) return;
        setIsActive((prev) => !prev);
    };

    const handleInputClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isActive) setIsActive(true);
    };

    const handleDeleteNoteBtn = async () => {
        const waitForConfirm = ask()
        toggleShowDeleteModal(true)
        const confirmed = await waitForConfirm
        if (confirmed) { 
            deleteNote.mutate({
                folder_id : String(folder_id),
                note_directory_id: String(note_directory_id),
                note_id : String(id),
            })
        }

    }

    /* auto-size input */
    useLayoutEffect(() => {
        const input = inputRef.current;
        const measurer = measureRef.current;
        if (!input || !measurer) return;

        measurer.textContent = dummyTitle.length ? dummyTitle : " ";
        const width = measurer.getBoundingClientRect().width;

        const MIN_WIDTH = 18;
        input.style.width = `${Math.max(MIN_WIDTH, Math.ceil(width))}px`;
    }, [dummyTitle]);

    return (
        <motion.div
            className={`note-container ${isActive ? "active" : ""} ${isEditing ? "editing" : ""
                }`}
            onClick={(e) => {
                handleContainerClick()
                e.stopPropagation() 
            }}
        >
            {/* hidden measurer */}
            <span
                ref={measureRef}
                style={{
                    position: "absolute",
                    visibility: "hidden",
                    whiteSpace: "pre",
                    fontSize: "inherit",
                    fontFamily: "inherit",
                    fontWeight: "inherit",
                    letterSpacing: "inherit",
                }}
            />

            {/* title input */}
            <input
                ref={inputRef}
                id={`note-input-${id}`}
                value={dummyTitle}
                readOnly={!isEditing}
                onChange={(e) => setDummyTitle(e.target.value)}
                onClick={handleInputClick}
                style={{ transition: "width 80ms linear" }}
            />

            {/* view mode icons */}
            {isActive && !isEditing && (
                <>
                    <button
                        type="button"
                        className="pencil-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            startEditing();
                        }}
                    >
                        {get_svg_icons({ icon: "Change-Input", size: 12 })}
                    </button>

                    <button
                        type="button"
                        className="note-del-btn"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteNoteBtn()
                        }}
                    >
                        X
                    </button>

                </>
            )}

            {/* edit confirm */}
            {isEditing && (
                <button
                    style={{color : 'white'}}
                    type="button"
                    className="confirm-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        finishEditing();
                    }}
                >
                    {get_svg_icons({ icon: "check", size: 12 })}
                </button>
            )}
        </motion.div>
    );
}

import { useState, useRef, useEffect } from "react";

// hooks
import useCreateNote from "../hooks/note/useCreateNote";
import useDeleteFolder from "../hooks/folder/useDeleteFolder";
import useChangeFolderName from "../hooks/folder/useChangeFolderName";

// del modal hooks
import { useToggleShowDeleteModal } from "../../../stores/ModalRendererStore/ModelRendererStore";
import { useConfirmStore } from "../../../stores/ConfirmStore/ConfirmStore";

// util
import { get_svg_icons } from "../../../util/get_svg_icons";

type FolderProps = {
    note_directory_id: number;
    name: string;
    id: number;
    folderOpen: boolean;
    toggleFolderOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Folder({
    note_directory_id,
    name,
    id,
    folderOpen,
    toggleFolderOpen,
}: FolderProps) {

    const [dummyFolderName, setDummyFolderName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);

    const createNote = useCreateNote();
    const deleteFolder = useDeleteFolder();
    const changeFolderName = useChangeFolderName();

    const toggleShowDeleteModal = useToggleShowDeleteModal();
    const { ask } = useConfirmStore();

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!inputRef.current) return;
        inputRef.current.style.width = `${dummyFolderName.length + 1}ch`;
    }, [dummyFolderName]);

    const focusInput = () => {
        requestAnimationFrame(() => inputRef.current?.focus());
    };

    const handleContainerClick = () => {
        if (isEditing) return;
        toggleFolderOpen(!folderOpen);
    };

    const handleEditStart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsEditing(true);
        focusInput();
    };

    const handleEditEnd = () => {
        if (!dummyFolderName.trim() || dummyFolderName === name) {
            setDummyFolderName(name);
            setIsEditing(false);
            return;
        }

        changeFolderName.mutate({
            note_directory_id: String(note_directory_id),
            folder_id: String(id),
            newName: dummyFolderName,
        });

        setIsEditing(false);
    };

    const handleAddNoteBtn = () => {
        createNote.mutate({
            note_directory_id: String(note_directory_id),
            folder_id: String(id),
        });
    };

    const handleFolderDeleteBtn = async () => {
        const waitForConfirm = ask();
        toggleShowDeleteModal(true);

        const confirmed = await waitForConfirm;
        if (confirmed) {
            deleteFolder.mutate({
                note_directory_id: String(note_directory_id),
                folder_id: String(id),
            });
        }
    };

    return (
        <div
            className={`folder-container ${folderOpen ? "active" : ""}`}
            onClick={handleContainerClick}
        >
            {/* folder toggle */}
            <button
                className="folder-btn"
                id={`folder-btn-${id}`}
                onClick={() => toggleFolderOpen(!folderOpen)}
            >
                {get_svg_icons({
                    icon: folderOpen ? "folder-open" : "folder-close",
                    size: 18,
                })}
            </button>

            {/* name input */}
            <input
                ref={inputRef}
                id={`folder-input-${id}`}
                value={dummyFolderName}
                disabled={!isEditing}
                onChange={(e) => setDummyFolderName(e.target.value)}
                onPointerDown={() => toggleFolderOpen(true)}
            />

            {/* view mode icons */}
            {!isEditing && folderOpen && (
                <div className="folder-icon-container" onClick={(e) => e.stopPropagation() }>
                    <button
                        type="button"
                        className="pencil-btn"
                        onClick={handleEditStart}
                    >
                        {get_svg_icons({ icon: "Change-Input", size: 12 })}
                    </button>

                    <button
                        type="button"
                        className="folder-del-btn"
                        onClick={handleFolderDeleteBtn}
                    >
                        X
                    </button>

                    <div className="add-note-container">
                        <button
                            type="button"
                            className="folder-del-btn"
                            onClick={handleAddNoteBtn}
                        >
                            {get_svg_icons({ icon: "new-note", size: 12 })}
                        </button>
                    </div>
                </div>
            )}

            {/* edit mode icons */}
            {isEditing && (
                <div className="folder-icon-container">
                    <button type="button" onClick={handleEditEnd} >
                        {get_svg_icons({ icon: "check", size: 12 })}
                    </button>
                </div>
            )}
        </div>
    );
}

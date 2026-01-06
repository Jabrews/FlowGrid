import { useState, useRef, useEffect } from "react";

// util
import { get_svg_icons } from "../../../util/get_svg_icons";

type FolderProps = {
    name: string;
    id: number;
    folderOpen: boolean;
    toggleFolderOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Folder({
    name,
    id,
    folderOpen,
    toggleFolderOpen,
}: FolderProps) {
    const [dummyFolderName, setDummyFolderName] = useState(name);
    const [isEditing, setIsEditing] = useState(false);

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (!inputRef.current) return;
        inputRef.current.style.width = `${dummyFolderName.length + 1}ch`;
    }, [dummyFolderName]);

    /* helpers */
    const focusInput = () => {
        requestAnimationFrame(() => inputRef.current?.focus());
    };

    const handleContainerClick = () => {
        if (isEditing) return;
        toggleFolderOpen(!folderOpen);
    };

    const handleEditStart = (e: React.MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        setIsEditing(true);
        focusInput();
    };

    const handleEditEnd = () => {
        if (dummyFolderName.length <= 0 || dummyFolderName == name) {
            setDummyFolderName(name)
            setIsEditing(false);
            return
        }
        // else mutate backend

    };

    const handleInputSubmit = () => {
        if (dummyFolderName.length <= 0 || dummyFolderName == name) {
            setDummyFolderName(name)
            return
        }
        // else mutate backend

    }


    return (
        <div
            className={`folder-container ${folderOpen ? "active" : ""}`}
            onClick={handleContainerClick}
            onBlur={() => isEditing && setIsEditing(false)}
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
                onPointerDown={() => {toggleFolderOpen(true)}}
                onBlur={handleInputSubmit}
            />

            {/* view mode icons */}
            {!isEditing && folderOpen && (
                <div className="folder-icon-container">
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
                        onClick={(e) => e.stopPropagation()}
                    >
                        X
                    </button>
                    <div className='add-note-container'>
                        <p className='folder-del-btn'> + </p>
                        <button 
                            type="button"
                            className="folder-del-btn"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {get_svg_icons({ icon: "new-note", size: 12})}
                        </button>
                    </div>

                </div>
            )}

            {/* edit mode icons */}
            {isEditing && (
                <div className="folder-icon-container">
                    <button onClick={handleEditEnd}>
                        {get_svg_icons({ icon: "check", size: 12 })}
                    </button>
                </div>
            )}
        </div>
    );
}

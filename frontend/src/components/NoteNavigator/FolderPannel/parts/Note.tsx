import { useRef, useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { get_svg_icons } from "../../../util/get_svg_icons";

export type NoteProps = {
    title: string;
    id: number;
};

export default function Note({ title, id }: NoteProps) {
    const [dummyTitle, setDummyTitle] = useState(title);
    const [isActive, setIsActive] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

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
    };

    const handleContainerClick = () => {
        if (isEditing) return;
        setIsActive((prev) => !prev);
    };

    const handleInputClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isActive) setIsActive(true);
    };

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
            onClick={handleContainerClick}
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
                onBlur={finishEditing}
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
                        onClick={(e) => e.stopPropagation()}
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

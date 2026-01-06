import { useRef, useState, useLayoutEffect } from "react";
import { get_svg_icons } from "../../../util/get_svg_icons";
import {motion} from 'framer-motion'

export type NoteProps = {
  title: string;
  id: number;
};

export default function Note({ title, id }: NoteProps) {
  const [dummyTitle, setDummyTitle] = useState(title);
  const [isActive, setIsActive] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isHover, toggleIsHover] = useState(false)

  const inputRef = useRef<HTMLInputElement | null>(null);
  const measureRef = useRef<HTMLSpanElement | null>(null);

  const focusInput = () => {
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const startEditing = () => {
    setIsActive(true);
    setIsEditing(true);
    focusInput();
  };

  // resize input whenever text changes
  useLayoutEffect(() => {
    const input = inputRef.current;
    const measurer = measureRef.current;
    if (!input || !measurer) return;

    // keep measurer in sync with input font styles (we set via CSS below too)
    const text = dummyTitle.length ? dummyTitle : " "; // avoid 0 width
    measurer.textContent = text;

    const w = measurer.getBoundingClientRect().width;

    const minW = 18;   // so empty doesn't collapse
    input.style.width = `${Math.max(minW, Math.ceil(w))}px`;
  }, [dummyTitle]);

  return (
    <motion.div
      className={`note-container ${isActive ? "active" : ""} ${isEditing ? "editing" : ""}`}
      onClick={() => setIsActive((p) => !p)}
      onHoverStart={() => toggleIsHover(true)}
      onHoverEnd={() => toggleIsHover(false)}
    >
      {/* hidden measurer: must match input’s font styles */}
      <span
        ref={measureRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "pre",
          // IMPORTANT: match whatever your input uses
          fontSize: "inherit",
          fontFamily: "inherit",
          fontWeight: "inherit",
          letterSpacing: "inherit",
        }}
      />

      {isActive && (
        <p style={{ color: "white", fontWeight: "bold", fontSize: "clamp(0.6em, 0.8em, 1em)" }}>
          |
        </p>
      )}

      <input
        ref={inputRef}
        id={`note-input-${String(id)}`}
        value={dummyTitle}
        onChange={(e) => setDummyTitle(e.target.value)}
        readOnly={!isEditing}
        onClick={(e) => {
          e.stopPropagation();
          if (!isActive) setIsActive(true);
        }}
        onBlur={() => setIsEditing(false)}
        style={{
          // makes width changes feel smooth
          transition: "width 80ms linear",
        }}
      />

      {isActive && !isEditing && isHover && (
        <button
          type="button"
          className='pencil-btn'
          style={{
            color: "white",
            backgroundColor: "transparent",
            border: "none",
          }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            startEditing();
          }}
        >
          {get_svg_icons({ icon: "Change-Input", size: 12 })}
        </button>
      )}

    { isHover && isActive&& !isEditing &&
        <button
        className='note-del-btn'
        >
            X
        </button>
    }

    </motion.div>
  );
}

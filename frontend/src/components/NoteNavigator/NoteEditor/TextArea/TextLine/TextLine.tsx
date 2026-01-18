import { useState, useEffect, useRef } from "react";

// hooks
import {
    useSetActiveTextLineNum,
    useActiveTextLineNum,
} from "./hooks/ActiveTextLineStore";

import useHandleInputTextChange from "./hooks/useHandleInputTextChange";
import useCreateRawObject from "./hooks/mutation/useCreateRawObject";
import useCreateEnterRawObject from "./hooks/mutation/useCreateEnterRawObject";
import useDeleteRawObject from "./hooks/mutation/useDeleteRawObject";
import useDeletePopulatedRawObject from "./hooks/mutation/useDeletePopulatedRawObject";
import useHandleHeadingEvent from "./hooks/useHandleHeadingEvent";
import useHandleIndentBackward from "./hooks/mutation/useHandleIndentBackward";
import useHandleIndentFoward from "./hooks/mutation/useHandleIndentFoward";
// selection store
import {
    useSetEndIndex,
    useSetStartIndex,
} from "../hooks/useSelectedInputTextStore";

// util
import type { RawObj } from "../util/text_area_types";

type TextLineProps = {
    rawObject : RawObj
    noteId : number
    rawObjects : RawObj[]
};

export default function TextLine({
    rawObject,
    noteId,
    rawObjects,
}: TextLineProps) {
    // refs
    const inputRef = useRef<HTMLInputElement | null>(null);
    const maxCharLengthRef = useRef<number>(75);
    const prevLineTextRef = useRef<string>("");
    const enterCooldownRef = useRef(false)
    const hasCreatedNextLineRef = useRef(false);
    // hooks
    const [dummyText, setDummyText] = useState(rawObject.text);
    const activeLineNum = useActiveTextLineNum()
    const setActiveTextLineNum = useSetActiveTextLineNum();
    // text change
    const { handleInputTextChangeOverpopulated, handleInputTextChange } =
        useHandleInputTextChange({
            setDummyText,
            inputRef,
            maxCharLengthRef,
        });
    const createRawObject = useCreateRawObject()
    const createEnterRawObject = useCreateEnterRawObject()
    const deleteRawObject = useDeleteRawObject() 
    const deletePopulatedRawObject = useDeletePopulatedRawObject()
    const handleHeadingEvent = useHandleHeadingEvent({
        inputRef,
        maxCharLengthRef,
    });
    const handleIndentFoward = useHandleIndentFoward()
    const hanldeIndentBackward = useHandleIndentBackward()
    // hook init selection store
    const setStartIndex = useSetStartIndex();
    const setEndIndex = useSetEndIndex();

    // on startup see if focus
    useEffect(() => {
        if (activeLineNum == rawObject.lineNum) {
            if (inputRef.current == null) return;
            inputRef.current.focus();
        }
    }, [activeLineNum, rawObject]);

    // update dummy text on
    useEffect(() => { 
        setDummyText(rawObject.text);
    }, [rawObject.text]);


    // heading event
    useEffect(() => {
        if (!inputRef.current) return
        handleHeadingEvent(inputRef.current.value)
    }, [inputRef, handleHeadingEvent])

    // updating dummy text of re fetch
    useEffect(() => {
        prevLineTextRef.current = dummyText;
    }, [dummyText]);

    // set active
    const handleInputClick = () => {
        setActiveTextLineNum(rawObject.lineNum);
    };

    // dekstop
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

        //BACKSPACE
        if (e.key === "Backspace") {
            const input = inputRef.current
            if (!input) return
            const atStart = input.selectionStart === 0
            const noSelection = input.selectionStart === input.selectionEnd

            // never delete line 1
            if (rawObject.lineNum === 1) return

            // empty line delete
            if (dummyText.length === 0) {
                e.preventDefault()
                deleteRawObject.mutate({
                    noteId : noteId,
                    rawObjectId : rawObject.id,
                    lineNum : rawObject.lineNum
                })
                return
            }
            // populated line delete (only at cursor start)
            if (atStart && noSelection && dummyText.length > 0) {
                e.preventDefault()
                deletePopulatedRawObject.mutate({
                    rawObject : rawObject,
                    noteId : noteId,
                    rawObjects : rawObjects,
                    maxCharLengthRef : maxCharLengthRef,
                })
                return
            }
        }
        // ENTER
        if (e.key === "Enter") {
            if (enterCooldownRef.current) return

            enterCooldownRef.current = true

            createEnterRawObject.mutate({
                noteId: noteId,
                lineNum: rawObject.lineNum ,
            })

            setTimeout(() => {
                enterCooldownRef.current = false
            }, 500)
        }
                //TAB
        if (e.key == "Tab") {
            e.preventDefault();
            if (e.shiftKey) {
                hanldeIndentBackward.mutate({
                    text : dummyText,
                    rawObjectId : String(rawObject.id),
                    noteId : String(noteId),
                })
            } else {
                handleIndentFoward.mutate({
                    text : dummyText,
                    rawObjectId : String(rawObject.id),
                    noteId : String(noteId),
                    maxCharLengthRef : maxCharLengthRef,
                })
            }
        }
        //ARROWS LEFT AND RIGHT
        if (e.key == 'ArrowLeft' || e.key == 'ArrowRight') {
            // dont run if already the same
            if (rawObject.text == dummyText) return
            handleInputTextChange(dummyText, rawObject.id, noteId);
        }

        // arrow up
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveTextLineNum(Math.max(1, rawObject.lineNum - 1));
            if (dummyText == rawObject.text) return
            handleInputTextChange(dummyText, rawObject.id, noteId);

            return;
        }

        // arrow down
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveTextLineNum(rawObject.lineNum + 1);
            if (dummyText == rawObject.text) return
            handleInputTextChange(dummyText, rawObject.id, noteId);
            return;
        }


    };

    // mobile
    const handleBeforeInput = (e: React.FormEvent<HTMLInputElement>) => {
        const ie = e.nativeEvent as InputEvent; // no words lol
        if (ie.inputType !== "deleteContentBackward") return;

        if (dummyText.length === 0 && rawObject.lineNum !== 1) {
            e.preventDefault();
            deleteRawObject.mutate({
                noteId : noteId,
                rawObjectId : rawObject.id,
                lineNum : rawObject.lineNum
            })
        }
    };

    
    
    // handle selection on input (for insert btns)
    document.addEventListener("selectionchange", () => {
        const input = document.activeElement;
        if (
            !(
                input instanceof HTMLInputElement ||
                input instanceof HTMLTextAreaElement
            )
        )
            return;

        const start = input.selectionStart;
        const end = input.selectionEnd;

        if (start !== end) {
            setStartIndex(start);
            setEndIndex(end);
        } else {
            setStartIndex(null);
            setEndIndex(null);
        }
    });

    // onBur
    const handleOnBlur = () => {
        if (dummyText == rawObject.text) return
        handleInputTextChange(dummyText, rawObject.id, noteId);
    }

    // onChange
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (dummyText.length > maxCharLengthRef.current) {
            const nextText = e.target.value
            handleInputTextChangeOverpopulated(
                nextText, // new text
                rawObject.lineNum,
                rawObject.id,
                noteId,
            )
            handleHeadingEvent(e.target.value);
        } else {
            setDummyText(e.target.value)
            handleHeadingEvent(e.target.value);
        }

    };

    // handle create lastRawObj
    useEffect(() => {
        if (
            hasCreatedNextLineRef.current ||
            dummyText.length === 0 ||
            rawObject.lineNum !== rawObjects.length
        ) return;

        hasCreatedNextLineRef.current = true;

        createRawObject.mutate({
            lineNum: rawObject.lineNum + 1,
            noteId,
        });
    }, [dummyText.length, rawObject.lineNum, rawObjects, noteId, createRawObject]);

    return (
        <input
            className="text-line-input"
            ref={inputRef}
            id={`line-input-${rawObject.lineNum}`}
            value={dummyText}
            onChange={handleOnChange}
            autoFocus={false}
            onClick={handleInputClick}
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            onBeforeInput={handleBeforeInput}
            onBlur={handleOnBlur}
            autoComplete="off"
        />
    );
}

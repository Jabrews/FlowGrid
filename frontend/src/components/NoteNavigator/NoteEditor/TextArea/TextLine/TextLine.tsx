import { useState, useEffect, useRef } from "react";

// hooks
import {
    useSetActiveTextLineNum,
    useActiveTextLineNum,
} from "./hooks/ActiveTextLineStore";
import useHandleInputTextChange from "./hooks/useHandleInputTextChange";
import useHandleLineDelete from "./hooks/useHandleLineDelete";
import useHandleHeadingEvent from "./hooks/useHandleHeadingEvent";
import useCreateNewLine from "./hooks/useCreateNewLine";
import useHandleIndentBackward from "../TextAreaBtns/hooks/useHandleIndentBackward";
import useHandleIndentFoward from "../TextAreaBtns/hooks/useHandleIndentFoward";
// selection store
import {
    useSetEndIndex,
    useSetStartIndex,
} from "../hooks/useSelectedInputTextStore";

// util
import type { RawObj } from "../util/text_area_types";

type TextLineProps = {
    initText: string;
    lineNum: number;
    rawObjs: RawObj[];
    setRawObjs: React.Dispatch<React.SetStateAction<RawObj[]>>;
};

export default function TextLine({
    initText,
    lineNum,
    rawObjs,
    setRawObjs,
}: TextLineProps) {
    // hook init
    const [dummyText, setDummyText] = useState(initText);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const maxCharLengthRef = useRef<number>(75);
    const prevLineTextRef = useRef<string>(""); // for alz
    const activeTextLineNum = useActiveTextLineNum();
    const { handleInputTextChangeOverpopulated, handleInputTextChange } =
        useHandleInputTextChange({
            rawObjs,
            setDummyText,
            setRawObjs,
            inputRef,
            maxCharLengthRef,
        });
    const setActiveTextLineNum = useSetActiveTextLineNum();
    const { handleEmptyLineDelete, handlePopulatedLineDelete } =
        useHandleLineDelete({ rawObjs, maxCharLengthRef });
    const handleHeadingEvent = useHandleHeadingEvent({
        inputRef,
        maxCharLengthRef,
    });
    // hook init selection store
    const setStartIndex = useSetStartIndex();
    const setEndIndex = useSetEndIndex();
    // key dwn listners
    const createNewLine = useCreateNewLine({ rawObjs, setRawObjs });
    const handleLineIndentFoward = useHandleIndentFoward({ rawObjs, setRawObjs });
    const handleLineIndentBackward = useHandleIndentBackward({
        rawObjs,
        setRawObjs,
    });

    // on startup see if focus
    useEffect(() => {
        if (activeTextLineNum == lineNum) {
            if (inputRef.current == null) return;
            inputRef.current.focus();
        }
    }, [activeTextLineNum, lineNum]);

    // update dummy text on
    useEffect(() => { 
        setDummyText(initText);
    }, [initText]);


    useEffect(() => {
        if (!inputRef.current) return
        handleHeadingEvent(inputRef.current?.value)
    }, [inputRef, handleHeadingEvent])

    useEffect(() => {
        prevLineTextRef.current = dummyText;
    }, [dummyText]);

    // set active
    const handleInputClick = () => {
        setActiveTextLineNum(lineNum);
    };

    // dekstop
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

        // check for line delete event
        if (e.key === "Backspace") {
            const input = inputRef.current
            if (!input) return

            const atStart = input.selectionStart === 0
            const noSelection = input.selectionStart === input.selectionEnd


            // never delete line 1
            if (lineNum === 1) return

            // empty line delete
            if (dummyText.length === 0) {
                e.preventDefault()
                const newRawObjs = handleEmptyLineDelete()
                if (newRawObjs) setRawObjs(newRawObjs)
                return
            }

            // populated line delete (only at cursor start)
            // if ((atStart && atEnd == dummyText.length) || (atStart && atEnd == 0 )) {
            if (atStart && noSelection && dummyText.length > 0) {
            e.preventDefault()
            const newRawObjs = handlePopulatedLineDelete()
            if (newRawObjs) setRawObjs(newRawObjs)
            return
            }
        }

        


        // handle create new line
        if (e.key == "Enter") {
            createNewLine(lineNum);
        }

        // TAB
        if (e.key == "Tab") {
            e.preventDefault();
            if (e.shiftKey) {
                handleLineIndentBackward();
            } else {
                handleLineIndentFoward();
            }
        }

    };

    // mobile
    const handleBeforeInput = (e: React.FormEvent<HTMLInputElement>) => {
        const ie = e.nativeEvent as InputEvent; // no words lol
        if (ie.inputType !== "deleteContentBackward") return;

        if (dummyText.length === 0 && lineNum !== 1) {
            e.preventDefault();
            handleEmptyLineDelete();
        }
    };

    // onChange
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > maxCharLengthRef.current) {
            const newRawObj: RawObj[] = handleInputTextChangeOverpopulated(e);
            setRawObjs(newRawObj);
        } else {
            const newRawObj: RawObj[] = handleInputTextChange(e);
            setRawObjs(newRawObj);
        }

        handleHeadingEvent(e.target.value);
    };

    // handle create lastRawObj
    useEffect(() => {
        const lastLineNum = rawObjs.length;
        // if value and last rawObj
        if (dummyText.length != 0 && lineNum == lastLineNum) {
            const newRawObj: RawObj = {
                text: "",
                lineNum: lastLineNum + 1,
            };
            setRawObjs((prev) => [...prev, newRawObj]);
        }
    }, [dummyText, rawObjs, setRawObjs, lineNum]);

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

    const handleOnBlur = () => {
        setTimeout(() => {
            setActiveTextLineNum(0)        
    }, 300);


    }


    return (
        <input
            className="text-line-input"
            ref={inputRef}
            key={`line-input-${lineNum}`}
            value={dummyText}
            onChange={handleOnChange}
            autoFocus={false}
            onClick={handleInputClick}
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            onBeforeInput={handleBeforeInput}
            onBlur={handleOnBlur}
        />
    );
}

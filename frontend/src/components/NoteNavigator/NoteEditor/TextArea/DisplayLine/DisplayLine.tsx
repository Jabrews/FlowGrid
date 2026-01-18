import { useEffect, useRef, useMemo } from "react";

// hooks
import { useSetActiveTextLineNum } from "../TextLine/hooks/ActiveTextLineStore";
import useHandleHeadingEvent from "./hooks/useHandleHeadingEvent";
import useParseTextHeading from "./hooks/useParseTextHeading";
import useParseTextSymbol from "./hooks/useParseTextSymbol";

// utill
import get_rid_of_symbols from "./util/get_rid_of_symbols";
// utill for rendering logic
import clear_text from "./util/clear_text";
import type { ParsedText, Span } from "./util/display_line_types";
// import get_span_text from "./util/get_span_text";


type DisplayLineProps = {
    text: string;
    lineNum: number;
};

export default function DisplayLine({ text, lineNum }: DisplayLineProps) {
    // hook init
    const divRef = useRef<HTMLDivElement | null>(null)
    const setActiveTextLineNum = useSetActiveTextLineNum()
    const handleHeadingEvent = useHandleHeadingEvent({ divRef })
    const parseTextHeading = useParseTextHeading()
    const parseTextSymbol = useParseTextSymbol()


    const parsedText: ParsedText = useMemo(() => {
        // step 1: heading parsing
        const baseText = parseTextHeading(text)
        // step 2: strip symbols (startup cleanup)
        const cleanText = get_rid_of_symbols(baseText)
        // step 3: collect spans
        const spans = parseTextSymbol(baseText)
        if (!spans) throw new Error('no spans found')
        return {
            text: cleanText,
            rawText: baseText,
            spans,
        }
    }, [text, parseTextHeading, parseTextSymbol])


    // handle heading size
    useEffect(() => {
        if (!divRef.current) return
        handleHeadingEvent(text)
    }, [text, handleHeadingEvent])
  

    // RENDERING
    function renderSpan(span: Span, rawText: string): React.ReactNode {
        const { parts } = clear_text(span, rawText)

        return (
            <span
                key={`${span.type}-${span.start}-${span.end}`}
                className={span.type}
            >
                {parts.map((part) =>
                    typeof part === "string"
                        ? part
                        : renderSpan(part, rawText)
                )}
            </span>
        )
    }

    function renderLine(rawText: string, spans: Span[]) {
        if (spans.length === 0) {
            return rawText.replace(/\*\*|==|""/g, "")
        }

        let cursor = 0
        const parts: React.ReactNode[] = []

        spans.map(span => {
            
            // const before = rawText.slice(span.start - 2, span.start)
            // const after = rawText.slice(span.end + 1, span.end + 3)

            const hasWrapper =
                rawText.slice(span.start - 2, span.start) === "**" ||
                rawText.slice(span.start - 2, span.start) === "==" ||
                rawText.slice(span.start - 2, span.start) === '""'

            const wrapperStart = hasWrapper ? span.start - 2 : span.start

            // text before span
            if (cursor < wrapperStart) {
                parts.push(rawText.slice(cursor , wrapperStart))
            }

            // span itself
            parts.push(renderSpan(span, rawText))

            cursor = span.end + 1
 
        })

        // remaining text
        if (cursor < rawText.length) {
            parts.push(rawText.slice(cursor))
        }

        // final cleanup
        return parts.map(p =>
            typeof p === "string"
                ? p.replace(/\*\*|==|""/g, "")
                : p
        )
    }

    return (

        <div ref={divRef} className="display-line-item" onClick={() => setActiveTextLineNum(lineNum)}>

        {parsedText.spans.length > 0 ? (
            <span className="display-line-inline">
                {renderLine(parsedText.rawText, parsedText.spans.map(s => ({ ...s })))}
            </span>
        ) : (
            text.length > 0 ? (
            <span > {text} </span>
            ) : (<span style={{opacity : '40%'}}> type to start </span>)

        )
        }
        </div>




    )




}
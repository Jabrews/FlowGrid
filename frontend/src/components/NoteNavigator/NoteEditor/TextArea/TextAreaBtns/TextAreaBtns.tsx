import { useMemo, useRef} from "react"

// utill
// test
import type { RawObj } from "../util/text_area_types"
import { get_svg_icons } from "../../../../util/get_svg_icons"
import text_heading_to_char_length from "../TextLine/util/text_heading_to_char_length"

// hooks
import useHandleIndentFoward from "../TextLine/hooks/mutation/useHandleIndentFoward"
import useHandleIndentBackward from "../TextLine/hooks/mutation/useHandleIndentBackward"
import useInsertSymbolAtChars from "./hooks/useInsertSymbolAtChars"
import { useActiveTextLineNum } from "../TextLine/hooks/ActiveTextLineStore"
import useHandleHeadingButton from "./hooks/useHandleHeadingButton"

type TextAreaBtnsProps = {
    rawObjs: RawObj[]
    noteId : number,
}

export default function TextAreaBtns({ rawObjs, noteId}: TextAreaBtnsProps) {

    // hook init
    const handleIndentFoward = useHandleIndentFoward()
    const handleIndentBackward = useHandleIndentBackward()
    const insetSymbolAtChars = useInsertSymbolAtChars()
    const activeTextLineNum = useActiveTextLineNum()
    const handleHeadingButton = useHandleHeadingButton({rawObjs, noteId})
    const max_length_ref = useRef(75)

    const handleInsertBtnDown = (symbol: string) => {
        const activeRawObj = rawObjs.find(
            (item: RawObj) => item.lineNum === activeTextLineNum
        )
        if (!activeRawObj) return
        insetSymbolAtChars({
            rawObjs, 
            noteId,
            rawObjectId : activeRawObj.id,
            symbol
        })
    }


    const headingLevel = useMemo<number>(() => {
        if (!activeTextLineNum) return 0

        const activeRawObj = rawObjs.find(
            (item: RawObj) => item.lineNum === activeTextLineNum
        )
        if (!activeRawObj) return 0

        const maxCharLength = text_heading_to_char_length(activeRawObj.text)

        switch (maxCharLength) {
            case 75:
                return 0
            case 67:
                return 1
            case 64:
                return 2
            case 61:
                return 3
            default:
                return 0
        }
    }, [activeTextLineNum, rawObjs])


    const handleIndentFowardBtn = () => {

        // find active raw objs
        const rawObj = rawObjs.find((rawObj : RawObj) => rawObj.lineNum == activeTextLineNum)

        if (!rawObj) return

        handleIndentFoward.mutate({
            text : rawObj.text,
            maxCharLengthRef : max_length_ref,
            noteId : String(noteId),
            rawObjectId : String(rawObj.id)
        })
    }

    const handleIndentBackwardBtn = () => {

        // find active raw objs
        const rawObj = rawObjs.find((rawObj : RawObj) => rawObj.lineNum == activeTextLineNum)

        if (!rawObj) return

        handleIndentBackward.mutate({
            text : rawObj.text,
            noteId : String(noteId),
            rawObjectId : String(rawObj.id)
        })
    }




    return (

        <div
            className='text-area-btn-container'
        >
            {/* indent */}
            <button
                onClick={handleIndentFowardBtn}
            >
                {get_svg_icons({ icon: 'indent-right', size: 24 })}
            </button>
            <button
                onClick={handleIndentBackwardBtn}
            >
                {get_svg_icons({ icon: 'indent-left', size: 24 })}

            </button>
            {/* highlight */}
            <button
                onClick={() => handleInsertBtnDown('==')}
            >
                {get_svg_icons({ icon: 'highlight', size: 24 })}
            </button>
            {/* bold */}
            <button
                onClick={() => handleInsertBtnDown('**')}
            >
                {get_svg_icons({ icon: 'bold', size: 24 })}

            </button>
            {/* Italic */}
            <button
                onClick={() => handleInsertBtnDown('""')}
            >
                {get_svg_icons({ icon: 'italic', size: 24 })}
            </button>

            {/* Heading */}
            <button
            onClick={handleHeadingButton}
            >
                {get_svg_icons({ icon: `heading-${headingLevel}`, size: 24 })}
            </button>




        </div>

    )

} 
import { useMemo } from "react"

// utill
import type { RawObj } from "../util/text_area_types"
import { get_svg_icons } from "../../util/get_svg_icons"
import text_heading_to_char_length from "../TextLine/util/text_heading_to_char_length"

// hooks
import useHandleIndentFoward from "./hooks/useHandleIndentFoward"
import useHandleIndentBackward from "./hooks/useHandleIndentBackward"
import useInsertSymbolAtChars from "./hooks/useInsertSymbolAtChars"
import { useActiveTextLineNum } from "../TextLine/hooks/ActiveTextLineStore"
import useHandleHeadingButton from "./hooks/useHandleHeadingButton"

type TextAreaBtnsProps = {
    rawObjs: RawObj[]
    setRawObjs: React.Dispatch<React.SetStateAction<RawObj[]>>
}

export default function TextAreaBtns({ rawObjs, setRawObjs }: TextAreaBtnsProps) {

    // hook init
    const handleIndentFoward = useHandleIndentFoward({ rawObjs, setRawObjs })
    const handleIndentBackward = useHandleIndentBackward({ rawObjs, setRawObjs })
    const insetSymbolAtChars = useInsertSymbolAtChars({ rawObjs })
    const activeTextLineNum = useActiveTextLineNum()
    const handleHeadingButton = useHandleHeadingButton({rawObjs, setRawObjs})

    const handleInsertBtnDown = (symbol: string) => {
        const newRawObjs: RawObj[] = insetSymbolAtChars(symbol)
        setRawObjs(newRawObjs)
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





    return (

        <div
            className='text-area-btn-container'
        >
            {/* indent */}
            <button
                onClick={() => handleIndentFoward()}
            >
                {get_svg_icons({ icon: 'indent-right', size: 24 })}
            </button>
            <button
                onClick={() => handleIndentBackward()}
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
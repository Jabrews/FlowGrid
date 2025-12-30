import { useState } from "react"

// hooks
import useMutateChangeIcon from "./hooks/useMutateChangeIcon"
import useDeleteLine from "./hooks/useDeleteLine" 
import useMutateLineText from "./hooks/useMutateLineText"

// utill
import type { LineType} from "../util/sticky_types"
import { get_svg_icons } from "../../../util/get_svg_icons"

type LineProps = {
    line : LineType,
    stickyI : string,
    stickyId : string,
    pageId : string
}

export default function Line({line, stickyI, pageId, stickyId} : LineProps) {

    const [lineTextDummy, setLineTextDummy] = useState(line.text)    

    // hook init
    const mutateChangeIcon = useMutateChangeIcon()
    const deleteLine = useDeleteLine()
    const mutateLineText = useMutateLineText()

    function autoGrow(el: HTMLTextAreaElement) {
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
    }

    const handleLineIconClick = () => {
        mutateChangeIcon.mutate({
            stickyI : stickyI,
            stickyId : stickyId,
            pageId : pageId,
            lineId : String(line.id)
        })
    }

    const handelDeleteBtn = () => {
        deleteLine.mutate({
            stickyI : stickyI,
            stickyId : stickyId,
            pageId : pageId,
            lineId : String(line.id)

        })
    }

    const handleLineTextSubmit = () => {
        if (lineTextDummy.length <= 0) return
        mutateLineText.mutate({
            stickyI : stickyI,
            stickyId : stickyId,
            pageId : pageId,
            lineId : String(line.id),
            newLineText : lineTextDummy ,
        })

    }


    return (
        <div className='line-container'>
            <p 
            className='line-icon'
            onClick={handleLineIconClick}
            > 
                {get_svg_icons({icon : line.line_symbol, size : 16})} 
            </p>
            <textarea
                placeholder="sample"
                id={`line-text-${line.id}`} 
                className='line-text' 
                value={lineTextDummy} 
                onChange={(e) => {setLineTextDummy(e.target.value)}} 
                onInput={(e) => autoGrow(e.currentTarget)}
                onBlur={handleLineTextSubmit}
            />
            <button className="line-dlt-btn" onClick={handelDeleteBtn}> X </button>
        </div>
    )

}
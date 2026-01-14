
// hooks
import { useActiveTextLineNum } from "../../TextLine/hooks/ActiveTextLineStore"

// utill
import type { RawObj } from "../../util/text_area_types"
import text_heading_to_char_length from "../../TextLine/util/text_heading_to_char_length"
import { change_raw_text_obj } from "../../TextLine/util/change_raw_text_obj"


type HandleHeadingButtonProps = {
    rawObjs : RawObj[]
    setRawObjs: React.Dispatch<React.SetStateAction<RawObj[]>>
}


export default function useHandleHeadingButton({rawObjs, setRawObjs} : HandleHeadingButtonProps) {

    // hook init
    const activeTextLineNum = useActiveTextLineNum()

    const handleHeadingButton = () => {

    // get active item.
    const activeRawObj = rawObjs.find((item : RawObj) => item.lineNum == activeTextLineNum)
    if (!activeRawObj) return
    // look at current heading level # ## ### '_'
    let activeText = activeRawObj.text
    // append new heading level to start
    if (activeText.startsWith("###")) {
        activeText = activeText.slice(3)
    } else {
        activeText = "#" + activeText
    }
    // check if enough room (use txt_heading_to_chark)
    const newHeadingLength = text_heading_to_char_length(activeText)
    if (!newHeadingLength) return
    if (activeText.length > newHeadingLength) {
        // DELETE
        console.log('too much heading')
        return
    }
    // change raw obj text with new length
    change_raw_text_obj({rawObjs, setRawObjs, newText : activeText, lineNum : activeRawObj.lineNum})
    // return new heading size to frontend (for btn)

    }

    return handleHeadingButton

}
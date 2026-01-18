
// hooks
import { useActiveTextLineNum } from "../../TextLine/hooks/ActiveTextLineStore"
import usePatchRawObjectText from "../../TextLine/hooks/mutation/usePatchRawObjectText"

// utill
import type { RawObj } from "../../util/text_area_types"
import text_heading_to_char_length from "../../TextLine/util/text_heading_to_char_length"


type HandleHeadingButtonProps = {
    rawObjs : RawObj[]
    noteId : number,
}


export default function useHandleHeadingButton({rawObjs, noteId} : HandleHeadingButtonProps) {

    // hook init
    const activeTextLineNum = useActiveTextLineNum()
    const patchRawObjectText = usePatchRawObjectText()

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
    // if not enough room
    if (activeText.length > newHeadingLength) return

    // change raw obj text with new length
    patchRawObjectText.mutate({
        noteId : noteId,
        newText : activeText,
        rawObjectId : activeRawObj.id,
    })

    }

    return handleHeadingButton

}
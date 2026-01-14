// util
import type { RawObj } from "../../util/text_area_types"
import text_heading_to_char_length from "./text_heading_to_char_length"

type ChangeRawObjProps = {
    rawObjs : RawObj[],
    setRawObjs : React.Dispatch<RawObj[]>
    newText : string,
    lineNum : number
}

// simply change text of selected obj, onChange()
// NOTE : this should never run if over MAX_CHAR_LEN
export function change_raw_text_obj({rawObjs, setRawObjs, newText, lineNum} : ChangeRawObjProps) {
 
    let newRawObjs : RawObj[] = []

    // set up raw obj
    const selectedRawObj = rawObjs.find((item : RawObj) => 
        item.lineNum == lineNum
    )
    if (!selectedRawObj) return rawObjs

    // find char length based up heading  (or lack of)
    // if over dont change
    const maxCharLength = text_heading_to_char_length(selectedRawObj.text)
    if (!maxCharLength) return
    if (newText.length > maxCharLength) return



    selectedRawObj.text = newText

    // filter out raw obj and add new
    newRawObjs = rawObjs.filter((item : RawObj) => 
        item.lineNum != lineNum
    )
    newRawObjs.push(selectedRawObj)

    // filter by lineNum
    newRawObjs.sort((a, b) => a.lineNum - b.lineNum)

    setRawObjs(newRawObjs)

}
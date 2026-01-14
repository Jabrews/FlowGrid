// util
import type { RawObj } from "../../util/text_area_types"

type SplitRawObjProps = {
    rawObjs: RawObj[],
    overLoadedText: string,
    lineNum: number
    maxCharLengthRef : React.RefObject<number>
}

export default function split_raw_obj({ rawObjs, overLoadedText, lineNum, maxCharLengthRef}: SplitRawObjProps) {

    //sice text of newRawObj at the length at MAX_CHAR
    const mainSplitObj = rawObjs.find((item: RawObj) => item.lineNum == lineNum)
    if (!mainSplitObj) throw new Error(`no raw obj : ${lineNum}`)
    const mainSplitText = overLoadedText.slice(0, maxCharLengthRef.current);
    const newSplitText = overLoadedText.slice(maxCharLengthRef.current);
    
    let newRawObjs: RawObj[] = rawObjs


    // filter out main split raw obj from array
    newRawObjs = rawObjs.filter((item: RawObj) => item.lineNum !== lineNum)

    // for items above line num add 1
    newRawObjs.map((item : RawObj) => {
        if (item.lineNum > lineNum) {
            item.lineNum += 1
        } 
    })

    // add back both new items
    mainSplitObj.text = mainSplitText
    const newSplitObj : RawObj = {
        lineNum : lineNum + 1,
        text : newSplitText,
    }
    newRawObjs.push(mainSplitObj, newSplitObj)

    // sort by line num
    newRawObjs.sort((a, b) => a.lineNum - b.lineNum)

    return newRawObjs

}
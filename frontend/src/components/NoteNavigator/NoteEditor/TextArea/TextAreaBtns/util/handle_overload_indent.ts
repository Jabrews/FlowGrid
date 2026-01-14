// util
import type { RawObj } from "../../util/text_area_types"

type SplitRawObjProps = {
    rawObjs: RawObj[],
    lineNum: number
}

// create new line brlow and push text content down to that new line
// all the below will neeed to update


export default function handle_overload_indent({ rawObjs, lineNum }: SplitRawObjProps) {

    //sice text of newRawObj at the length at MAX_CHAR
    const overloadSplitObj = rawObjs.find((item: RawObj) => item.lineNum == lineNum)
    if (!overloadSplitObj) throw new Error(`no raw obj : ${lineNum}`)
    
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
    const priorSplitObj : RawObj = {
        lineNum,
        text : ''
    }
    const newSplitObj : RawObj = {
        lineNum : lineNum + 1,
        text : overloadSplitObj.text.trim(), // remove all space from new lines text
    }
    newRawObjs.push(priorSplitObj, newSplitObj)

    // sort by line num
    newRawObjs.sort((a, b) => a.lineNum - b.lineNum)

    return newRawObjs

}

// hooks
import { useActiveTextLineNum, useSetActiveTextLineNum } from "../../TextLine/hooks/ActiveTextLineStore"
import { useSelectionStart, useSelectionEnd } from "../../hooks/useSelectedInputTextStore"

// util
import type { RawObj } from "../../util/text_area_types"
import text_heading_to_char_length from "../../TextLine/util/text_heading_to_char_length"

type InsertSymbolAtChars = {
    rawObjs: RawObj[]
}


export default function useInsertSymbolAtChars ({rawObjs} : InsertSymbolAtChars) {

    // hook init    
    const activeTextLineNum = useActiveTextLineNum()
    const setActiveTextLineNum = useSetActiveTextLineNum()
    const selectionStart = useSelectionStart()
    const selectionEnd = useSelectionEnd()

    const insertSymbolAtChars = (symbol : string) => {

        // verify correct symbol type
        if (symbol == '**' || symbol == '==' || symbol == '""') {

            // possibly throw little tiny model error
            if (selectionEnd == null || selectionStart == null) return rawObjs 

            // find active raw objs text             
            const activeRawObj = rawObjs.find((item : RawObj) => item.lineNum == activeTextLineNum)
            if (!activeRawObj) throw new Error('could not find active raw obj')
            const activeText = activeRawObj?.text 

            // substring 1 
            const substring1 = activeText?.substring(0, selectionStart)
            // substring 2
            const substring2 = activeText?.substring(selectionStart, selectionEnd)
            // substring 3 
            const substring3 = activeText?.substring(selectionEnd, activeText.length)
            // combine
            // 'hello **my** name"
            const newActiveText = substring1 + symbol + substring2 + symbol + substring3

            // check if up to limit
            const maxCharLimit = text_heading_to_char_length(newActiveText)
            if (!maxCharLimit) return rawObjs
            if (newActiveText.length > maxCharLimit) return rawObjs


            // set back to active raw obj
            const newRawObjs : RawObj[] = rawObjs
            newRawObjs.map((item : RawObj) => {
                if (item.lineNum == activeRawObj.lineNum) {
                    item.text = newActiveText
                }
            })

            setActiveTextLineNum(activeRawObj.lineNum + 1)

            return newRawObjs

        }
        else return rawObjs
    }


    return insertSymbolAtChars 
}
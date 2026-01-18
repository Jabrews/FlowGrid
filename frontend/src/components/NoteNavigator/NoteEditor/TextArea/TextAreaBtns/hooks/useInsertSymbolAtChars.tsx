// hooks
import { useActiveTextLineNum, useSetActiveTextLineNum } from "../../TextLine/hooks/ActiveTextLineStore"
import { useSelectionStart, useSelectionEnd } from "../../hooks/useSelectedInputTextStore"
import usePatchRawObjectText from "../../TextLine/hooks/mutation/usePatchRawObjectText"

// util
import type { RawObj } from "../../util/text_area_types"
import text_heading_to_char_length from "../../TextLine/util/text_heading_to_char_length"

type InsertSymbolAtChars = {
    rawObjs: RawObj[],
    noteId : number,
    rawObjectId : number,
    symbol : string
}


export default function useInsertSymbolAtChars () {

    // hook init    
    const activeTextLineNum = useActiveTextLineNum()
    const setActiveTextLineNum = useSetActiveTextLineNum()
    const selectionStart = useSelectionStart()
    const selectionEnd = useSelectionEnd()
    const patchRawObjectText = usePatchRawObjectText()

    const insertSymbolAtChars = ({rawObjs, noteId, rawObjectId, symbol} : InsertSymbolAtChars) => {

        // verify correct symbol type
        if (symbol == '**' || symbol == '==' || symbol == '""') {

            // possibly throw little tiny model error
            if (selectionEnd == null || selectionStart == null) return 

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
            if (!maxCharLimit) return 
            if (newActiveText.length > maxCharLimit) return 

            // set back to active raw obj
            patchRawObjectText.mutate({
                rawObjectId : rawObjectId,
                noteId : noteId,
                newText : newActiveText
            })



            setActiveTextLineNum(activeRawObj.lineNum + 1)


        }
    }


    return insertSymbolAtChars 
}
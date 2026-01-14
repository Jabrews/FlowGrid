// hooks
import { useActiveTextLineNum, useSetActiveTextLineNum } from "./ActiveTextLineStore";

// util
import type { RawObj } from "../../util/text_area_types";

type HandleLineDeleteProps = {
    rawObjs: RawObj[]
    maxCharLengthRef : React.RefObject<number>
}

// for when deleting on 0 char length on line
export default function useHandleLineDelete({ rawObjs, maxCharLengthRef}: HandleLineDeleteProps) {

    // hook init    
    const activeTextLineNum = useActiveTextLineNum()
    const setActiveTextLineNum = useSetActiveTextLineNum()

    const handleEmptyLineDelete = () => {

        // get active item
        const activeRawObj = rawObjs.find((item: RawObj) => item.lineNum == activeTextLineNum)
        if (!activeRawObj) return rawObjs

        // filter out curret
        const newRawObjs = rawObjs.filter(
            (item: RawObj) => item.lineNum !== activeRawObj.lineNum
        )

        // increase items past it 
        newRawObjs.map((item: RawObj) => {
            if (item.lineNum > activeRawObj.lineNum) {
                item.lineNum -= 1
            }
        })


        // set active to above
        setActiveTextLineNum(activeRawObj.lineNum - 1)

        return newRawObjs 


    }

    const handlePopulatedLineDelete = () => {

        // get active item
        const activeRawObj = rawObjs.find((item: RawObj) => item.lineNum == activeTextLineNum)
        if (!activeRawObj) return rawObjs

        // find prior line
        const priorRawObj = rawObjs.find((item: RawObj) => item.lineNum == activeRawObj.lineNum - 1)
        if (!priorRawObj) return rawObjs

        // evaulate how much from prior can fit 
        const textRoom = maxCharLengthRef.current - priorRawObj.text.length - 1

        // nothing can fit (abort early)
        if (textRoom <= 0) return rawObjs

        // split text to get required length {active obj}
        const fittingText = ' ' + activeRawObj.text.slice(0, textRoom)

        // get rid of text from {active obj}
        const newActiveText = activeRawObj.text.slice(textRoom)

        // add to prior and leave the rest {prior obj}
        const newPriorText = priorRawObj.text.trimEnd() + fittingText

        // put new content into arrau    
        const newRawObjs: RawObj[] = rawObjs.map((item: RawObj) => {
            if (item.lineNum == priorRawObj.lineNum) {
                return { ...item, text: newPriorText }
            }
            else if (item.lineNum == activeRawObj.lineNum) {
                return { ...item, text: newActiveText }
            }
            return item
        })



        // set active to above
        setActiveTextLineNum(priorRawObj.lineNum)

        return newRawObjs 

    }



    return { handleEmptyLineDelete, handlePopulatedLineDelete }


}
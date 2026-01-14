// hooks
import { useSetActiveTextLineNum } from "./ActiveTextLineStore"

// utill
import type { RawObj } from "../../util/text_area_types"

type CreateNewLineProps = {
    rawObjs : RawObj[]
    setRawObjs: React.Dispatch<React.SetStateAction<RawObj[]>>
}


export default function useCreateNewLine({rawObjs, setRawObjs} : CreateNewLineProps) {

    // hook init
    const setActiveTextLineNum = useSetActiveTextLineNum()

    const createNewLine = (lineNum : number) => {

        // find active line num
        const activeRawObj = rawObjs.find((item : RawObj) => item.lineNum == lineNum)
        if (!activeRawObj) return

        // for items above line num add 1 (NOT INCLUDING NEW ITEM)
        const newRawObjs : RawObj[] = rawObjs 
        newRawObjs.map((item : RawObj) => {
            if (item.lineNum > lineNum ) {
                item.lineNum += 1
            } 
        })

        // create new
        const nextLineNum = activeRawObj?.lineNum + 1
        const nextRawObj : RawObj= {
            text : '',
            lineNum : nextLineNum
        }

        newRawObjs.push(nextRawObj)

        // sort
        newRawObjs.sort((a, b) => a.lineNum - b.lineNum)
        console.log('new raw objs : ', rawObjs)

        setRawObjs(newRawObjs)

        setActiveTextLineNum(nextLineNum)


    }

    return createNewLine

}

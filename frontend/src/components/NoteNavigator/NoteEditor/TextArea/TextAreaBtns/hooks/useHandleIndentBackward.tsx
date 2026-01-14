// hooks
import { useActiveTextLineNum} from "../../TextLine/hooks/ActiveTextLineStore";

// util
import type { RawObj } from "../../util/text_area_types";

type HandleIndentProps = {
    rawObjs : RawObj[]
    setRawObjs: React.Dispatch<React.SetStateAction<RawObj[]>>
}


export default function useHandleIndentBackward({rawObjs, setRawObjs} : HandleIndentProps) {

    // hook init
    const activeTextLineNum = useActiveTextLineNum()


    const handleIndentBackward = () => {

        // get active item
        const activeRawObj = rawObjs.find((item : RawObj) => item.lineNum == activeTextLineNum)
        if (!activeRawObj) throw new Error('no raw obj found')

        // first see how much text exist before first char.
        let nonSpaceCharIndex : number | null = null
        for (let i = 0; nonSpaceCharIndex == null; i++) {
            if (activeRawObj.text[i] !== ' ') {
                nonSpaceCharIndex = i
            }
        }
        if (!nonSpaceCharIndex) return
        // if more than 4 transfer foward

        // split char to take out 4 spaces behinde str start
        const backwardIndexStart = nonSpaceCharIndex - 4 
        const stringFirstPart = activeRawObj.text.slice(0, backwardIndexStart)
        const stringSecondPart = activeRawObj.text.slice(nonSpaceCharIndex)

        setRawObjs(prev =>
            prev.map(item =>
            item.lineNum === activeTextLineNum
                ? { ...item, text: stringFirstPart + stringSecondPart}
                : item
            )
        )

    }

    return handleIndentBackward 
}
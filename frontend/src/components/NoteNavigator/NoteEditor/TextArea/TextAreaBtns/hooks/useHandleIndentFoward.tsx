// hooks
import { useActiveTextLineNum, useSetActiveTextLineNum} from "../../TextLine/hooks/ActiveTextLineStore";

// util
import type { RawObj } from "../../util/text_area_types";
import handle_overload_indent from "../util/handle_overload_indent";

type HandleIndentProps = {
    rawObjs : RawObj[]
    setRawObjs: React.Dispatch<React.SetStateAction<RawObj[]>>
}


export default function useHandleIndentFoward({rawObjs, setRawObjs} : HandleIndentProps) {

    // hook init
    const activeTextLineNum = useActiveTextLineNum()
    const setActiveTextLineNum = useSetActiveTextLineNum()

    const INDENT_CHAR = '    '

    const handleIndentFoward = () => {

        // get active item
        const activeRawObj = rawObjs.find((item : RawObj) => item.lineNum == activeTextLineNum)
        if (!activeRawObj) throw new Error('no raw obj found')
        
        // see if ident is possible withou splitting line
        const lengthPossible = 75 - activeRawObj.text.length
        // if so just add at start


        if (lengthPossible >= 4)  {
            setRawObjs(prev =>
                prev.map(item =>
                item.lineNum === activeTextLineNum
                    ? { ...item, text: INDENT_CHAR + item.text }
                    : item
                )
            )
        }
        // if not split object at end
        else if (lengthPossible < 4) {
            console.log('next line tab')
            const newRawObjs = handle_overload_indent({
                rawObjs, 
                lineNum : activeRawObj.lineNum
            })

            setActiveTextLineNum(activeRawObj.lineNum + 1) 
            setRawObjs(newRawObjs)
            // setter for focus on new split obj
        }
    }

    return handleIndentFoward



}
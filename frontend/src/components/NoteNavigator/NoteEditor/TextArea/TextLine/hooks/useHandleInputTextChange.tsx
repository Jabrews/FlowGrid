// hooks
import { useActiveTextLineNum, useSetActiveTextLineNum} from "./ActiveTextLineStore"

// util
import split_raw_obj from "../util/split_raw_obj"
import { change_raw_text_obj } from "../util/change_raw_text_obj"
import type { RawObj } from "../../util/text_area_types"

type HandleInputTextChangeProps = {
    inputRef : React.RefObject<HTMLInputElement | null>
    maxCharLengthRef : React.RefObject<number>
    rawObjs : RawObj[]
    setRawObjs: React.Dispatch<React.SetStateAction<RawObj[]>>
    setDummyText : React.Dispatch<React.SetStateAction<string>>
}

export default function useHandleInputTextChange({inputRef, maxCharLengthRef,  rawObjs, setRawObjs, setDummyText} : HandleInputTextChangeProps) {

    // hook init
    const lineNum = useActiveTextLineNum()
    const setActiveTextLineNum = useSetActiveTextLineNum()

    // handle onChange()
    const handleInputTextChangeOverpopulated = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!inputRef.current) {
            console.log('no ref')
            return rawObjs
        } 

        const next = e.target.value

        inputRef.current.blur()

        const newRawObjs = split_raw_obj({
            rawObjs,
            overLoadedText: next,
            lineNum,
            maxCharLengthRef,
        })

        setActiveTextLineNum(lineNum + 1)
        setDummyText(next)
        change_raw_text_obj({rawObjs, setRawObjs, newText : next, lineNum}) 

        return newRawObjs

    }

    const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!inputRef.current) {
            console.log('no ref')
            return rawObjs
        } 

        const next = e.target.value


        setDummyText(next)
        change_raw_text_obj({rawObjs, setRawObjs, newText : next, lineNum}) 

        return rawObjs

    }

    return {handleInputTextChangeOverpopulated, handleInputTextChange} 

}
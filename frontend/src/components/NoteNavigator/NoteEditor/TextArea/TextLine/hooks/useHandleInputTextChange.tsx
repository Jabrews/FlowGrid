// hooks
import { useSetActiveTextLineNum} from "./ActiveTextLineStore"
import usePatchRawObjectText from "./mutation/usePatchRawObjectText"
import useSplitRawObject from "./mutation/useSplitRawObject"

type HandleInputTextChangeProps = {
    inputRef : React.RefObject<HTMLInputElement | null>
    maxCharLengthRef : React.RefObject<number>
    setDummyText : React.Dispatch<React.SetStateAction<string>>
}

export default function useHandleInputTextChange({inputRef, maxCharLengthRef, setDummyText} : HandleInputTextChangeProps) {

    // hook init
    const setActiveTextLineNum = useSetActiveTextLineNum()
    const patchRawObjectText = usePatchRawObjectText()
    const splitRawObject = useSplitRawObject()

    // handle onChange()
    const handleInputTextChangeOverpopulated = (newText : string, lineNum : number, rawObjectId : number, noteId : number) => {

        if (!inputRef.current) {
            console.log('no ref')
            return
        } 


        inputRef.current.blur()


        // split text
        const mainSplitText = newText.slice(0, maxCharLengthRef.current);
        const newSplitText = newText.slice(maxCharLengthRef.current);

        splitRawObject.mutate({
            lineNum : lineNum,
            rawObjectId : rawObjectId,
            noteId : noteId,
            overloadedText : newSplitText,
            rawObjectText : mainSplitText,
        })


        setActiveTextLineNum(lineNum + 1)

        setDummyText(mainSplitText)

        return 

    }

    // simply mutate raw obj
    const handleInputTextChange = (newText : string, rawObjectId : number, noteId : number) => {

        if (!inputRef.current) {
            console.log('no ref')
            return 
        } 

        patchRawObjectText.mutate({
            newText,
            rawObjectId,
            noteId,
        })

        return 

    }

    return {handleInputTextChangeOverpopulated, handleInputTextChange} 

}
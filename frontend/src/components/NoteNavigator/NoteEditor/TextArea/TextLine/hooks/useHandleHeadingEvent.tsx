
type HandleHeadingEventProps = {
    inputRef : React.RefObject<HTMLInputElement | null>,
    maxCharLengthRef : React.RefObject<number>
}



export default function useHandleHeadingEvent({inputRef, maxCharLengthRef} : HandleHeadingEventProps) {

    // this func checks for heading and changes input lines style accordingly
    const handleHeadingEvent = (newText : string) => {

        // first char check
        
        const firstChar = newText.substring(0,1)
        if (firstChar !== '#') {
            if (!inputRef.current) return
            inputRef.current.style.width = '75ch'
            inputRef.current.style.fontSize= '1em'
            maxCharLengthRef.current = 75
            return
        } 

        // other char check 0,3)
        const chars = newText.substring(0,3)
        let headingSize = 0
        for (let i = 0; i < chars.length; i++) {
            if (chars[i] == '#')
            headingSize += 1
        }

        if (!inputRef.current) throw new Error('no input found')

        // change input and red accordingly
        switch (headingSize) {
            case 1 : 
                inputRef.current.style.fontSize= '1.2em'
                inputRef.current.style.width= '62.5ch'
                maxCharLengthRef.current = 61
                return
            case 2 : 
                inputRef.current.style.fontSize= '1.15em'
                inputRef.current.style.width= '65ch'
                maxCharLengthRef.current = 64
                return
            case 3 : 
                inputRef.current.style.fontSize= '1.1em'
                inputRef.current.style.width= '68ch'
                maxCharLengthRef.current = 67

                return
        }


    }

    return handleHeadingEvent

}
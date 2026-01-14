
type HandleHeadingEventProps = {
    divRef: React.RefObject<HTMLDivElement| null>,
}



export default function useHandleHeadingEvent({divRef} : HandleHeadingEventProps) {

    // this func checks for heading and changes input lines style accordingly
    const handleHeadingEvent = (newText : string) => {

        // first char check
        
        const firstChar = newText.substring(0,1)
        if (firstChar !== '#') {
            if (!divRef.current) return
            divRef.current.style.width = '75ch'
            divRef.current.style.fontSize= '1em'
            // max char is auto 75 
            return
        } 

        // other char check 0,3)
        const chars = newText.substring(0,3)
        let headingSize = 0
        for (let i = 0; i < chars.length; i++) {
            if (chars[i] == '#')
            headingSize += 1
        }

        if (!divRef.current) throw new Error('no input found')

        // change input and red accordingly
        switch (headingSize) {
            case 1 : 
                divRef.current.style.fontSize= '1.2em'
                divRef.current.style.width= '62.5ch'
                return
            case 2 : 
                divRef.current.style.fontSize= '1.15em'
                divRef.current.style.width= '65ch'
                return
            case 3 : 
                divRef.current.style.fontSize= '1.1em'
                divRef.current.style.width= '68ch'

                return
        }


    }

    return handleHeadingEvent

}
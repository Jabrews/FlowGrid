import type { Span } from "./display_line_types"

// helper
export const find_text_before= (rawText: string, span: Span) => {
    // get text not included in span
    // get end point [*]*help
    const endPoint = span.start - 2
    let textBefore: string
    // see if char before possible
    const textBeforeStartPoint = rawText.substring(0, endPoint)
    // if text before possible
    if (textBeforeStartPoint.length !== 0) {
        // see detect symbol before to find start point
        let currIndex = 0
        let nextIndex = 1
        let possibleTextStart = 0
        while (nextIndex < textBeforeStartPoint.length) {
            const currChar = textBeforeStartPoint[currIndex]
            const nextChar = textBeforeStartPoint[nextIndex]
            // if symbol found
            if (['*', '"', '='].includes(currChar) && nextChar == currChar) {
                // set possible text start position
                possibleTextStart = nextIndex + 1
                // increment to find possible closer
                currIndex += 1
                nextIndex += 1
            }

            // increment
            currIndex += 1
            nextIndex += 1
        }

        // we found start point 
        if (nextIndex == textBeforeStartPoint.length && possibleTextStart !== 0) { //made it through index
            // ==hello==[t]est[=]=hello==  | [t] : start | [=]  : endpoint
            textBefore = rawText.substring(possibleTextStart, endPoint)
            console.log('text before : ', textBefore)
            return textBefore
        }
        // no symbol then we treat text as if it starts at 0
        if (nextIndex == textBeforeStartPoint.length && possibleTextStart == 0) { //made it through index
            // [t]est[=]=hello==  | [t] : start | [=]  : endpoint
            textBefore = rawText.substring(0, endPoint)
            console.log('text before : ', textBefore)
            return textBefore
        }
    }
    // no text before
    console.log('no text before')
    return ''

}
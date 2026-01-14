import type { Span } from "./display_line_types"

// helper
export const find_text_after= (rawText: string, span: Span) => {
    // get text not included in span
    // get start point  help**[]
    const startPoint = span.end + 3
    let textAfter : string
    // see if char after possible
    const textAfterStartPoint = rawText.substring(startPoint + 1, rawText.length)
    // if text after possible
    if (textAfterStartPoint.length !== 0) {
        // see detect symbol before to find start point
        let currIndex = 0
        let nextIndex = 1
        let endPoint = 0
        // unlike find_text_before, the first ** we find is correct
        while (nextIndex < textAfterStartPoint.length) {
            const currChar = textAfterStartPoint[currIndex]
            const nextChar = textAfterStartPoint[nextIndex]
            // if symbol found
            if (['*', '"', '='].includes(currChar) && nextChar == currChar) {
                endPoint = currIndex
                break
            }
            // increment
            currIndex += 1
            nextIndex += 1
        }

        // we found end point 
        if (nextIndex == textAfterStartPoint.length && endPoint !== 0) { //made it through index
            // ==help==[]me [=]=dude==
            textAfter = rawText.substring(startPoint , endPoint)
            console.log('text after : ', textAfter)
            return textAfter 
        }
        // no symbol then we treat text as if it starts at 0
        if (nextIndex == textAfterStartPoint.length && endPoint == 0) { //made it through index
            // ==help==[]me dude[]
            textAfter = rawText.substring(startPoint, rawText.length + 1)
            console.log('text after : ', textAfter)
            return textAfter 
        }
    }
    // no text before
    console.log('no text after')
    return ''

}
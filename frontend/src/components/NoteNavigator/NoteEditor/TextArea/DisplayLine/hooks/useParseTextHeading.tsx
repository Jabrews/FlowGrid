
// for getting heading (##) out of text
export default function useParseTextHeading() {

    const parseTextHeading = (text : string) => {

        // check for #
        const firstChars = text.substring(0, 3)

        if (firstChars[0] != '#') return text
        
        let hashTotalLength = 0
        for (let i = 0; i <= firstChars.length; i++) {
            if (firstChars[i] == '#') {
                hashTotalLength += 1
            }            
        }

        // get rid of #
        const newText = text.substring (hashTotalLength, text.length)
        return newText 

    }

    return parseTextHeading

}
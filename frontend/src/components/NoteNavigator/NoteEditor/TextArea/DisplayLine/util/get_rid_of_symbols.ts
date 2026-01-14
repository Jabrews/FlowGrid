
export default function get_rid_of_symbols(text: string) {
    const symbols = ['*', '=', '"']

    let result = text

    for (const symbol of symbols) {
        const pair = symbol + symbol

        const count = result.split(pair).length - 1

        // only remove if we have at least one full pair
        if (count >= 2) {
            // remove pairs in order
            let removed = 0

            result = result.replace(new RegExp(`\\${symbol}\\${symbol}`, 'g'), () => {
                removed++
                // remove only even-numbered pairs (opening + closing)
                return removed % 2 === 1 ? '' : ''
            })
        }
    }

    return result
}

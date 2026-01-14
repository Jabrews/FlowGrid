import type { Span, SpanType } from "../util/display_line_types"

export default function useParseTextSymbol() {

    const symbols_possible = ['*', '"', '=']

    const get_type = (symbol: string): SpanType => {
        if (symbol === '*') return 'bold'
        if (symbol === '"') return 'italic'
        if (symbol === '=') return 'highlight'
        throw new Error(`invalid symbol: ${symbol}`)
    }

    return function parseTextSymbol(text: string): Span[] {

        const spans: Span[] = []

        let searchCurrIndex = 0

        while (searchCurrIndex < text.length - 1) {

            let selected_symbol = ''
            let foundCurrIndex = 0

            // ------------------
            // SEARCH LOOP
            // ------------------
            while (searchCurrIndex < text.length - 1) {
                const curr = text[searchCurrIndex]
                const next = text[searchCurrIndex + 1]

                if (symbols_possible.includes(curr) && curr === next) {
                    selected_symbol = curr
                    foundCurrIndex = searchCurrIndex + 2 // after opening **
                    break
                }

                searchCurrIndex++
            }

            // no more parents
            if (!selected_symbol) break

            // ------------------
            // FOUND LOOP (closing)
            // ------------------
            while (foundCurrIndex < text.length - 1) {
                const curr = text[foundCurrIndex]
                const next = text[foundCurrIndex + 1]

                if (curr === selected_symbol && curr === next) {
                    const start = searchCurrIndex + 2
                    const end = foundCurrIndex - 1

                    const parentSpan: Span = {
                        type: get_type(selected_symbol),
                        start,
                        end,
                        children: [],
                    }

                    // ------------------
                    // CHILD LOOP
                    // ------------------
                    let childCurrIndex = start

                    while (childCurrIndex < end - 1) {
                        const c = text[childCurrIndex]
                        const n = text[childCurrIndex + 1]

                        if (symbols_possible.includes(c) && c === n) {
                            const childSymbol = c
                            let close = childCurrIndex + 2

                            while (
                                close < end - 1 &&
                                !(text[close] === childSymbol && text[close + 1] === childSymbol)
                            ) {
                                close++
                            }

                            if (close < end - 1) {
                                parentSpan.children!.push({
                                    type: get_type(childSymbol),
                                    start: childCurrIndex + 2,
                                    end: close - 1,
                                    children: [],
                                })

                                childCurrIndex = close + 2
                                continue
                            }
                        }

                        childCurrIndex++
                    }

                    spans.push(parentSpan)

                    // resume search AFTER this parent
                    searchCurrIndex = foundCurrIndex + 2
                    break
                }

                foundCurrIndex++
            }
        }

        return spans
    }
}

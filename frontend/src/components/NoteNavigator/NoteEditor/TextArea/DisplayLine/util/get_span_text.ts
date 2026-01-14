export default function get_span_text(
    spanStart: number,
    spanEnd: number,
    rawText: string
) {
    if (
        spanStart < 0 ||
        spanEnd >= rawText.length ||
        spanStart > spanEnd
    ) {
        return ''
    }

    // end is inclusive → slice needs +1
    return rawText.slice(spanStart, spanEnd + 1)
}

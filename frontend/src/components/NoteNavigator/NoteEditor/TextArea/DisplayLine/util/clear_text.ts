import type { Span } from "./display_line_types"


export default function clear_text(
    span: Span,
    rawText: string
): { parts: (string | Span)[] } {

    const parts: (string | Span)[] = []

    const children = span.children
        ? [...span.children].sort((a, b) => a.start - b.start)
        : []

    let cursor = span.start

    for (const child of children) {
        if (cursor < child.start) {
            parts.push(
                rawText.slice(cursor, child.start).replace(/\*\*|==|""/g, "")
            )
        }

        // ⚠️ pass child through, do NOT modify it
        parts.push(child)

        cursor = child.end + 1
    }

    if (cursor <= span.end) {
        parts.push(
            rawText.slice(cursor, span.end + 1).replace(/\*\*|==|""/g, "")
        )
    }

    return { parts }
}

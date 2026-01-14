export type SpanType = 'bold' | 'highlight' | 'italic'

export type Span = {
  type: SpanType
  start: number   // inclusive (index in cleaned text)
  end: number     // exclusive
  children?: Span[]
}

export type ParsedText = {
  text: string    // text with symbols removed
  rawText : string
  spans: Span[]
}


export type Sticky = {
    i : string,
    id : number
    created : string,
    grid : string,
    type : string,
    user : string,
}

export type StickyPage = {
    id : number,
    title : string,
    stickyNoteId: string 
    user : string,
}

export type LineType = {
    id : number,
    line_symbol : string,
    stickyNotePageId : string,
    text : string,
}
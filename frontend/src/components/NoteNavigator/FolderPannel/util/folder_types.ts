
export type Note = {
    title : string,
    id : number, 
}

export type FolderPartial = {
    name : string,
    id : number,
    notes : Note[]
}

export type Note = {
    title : string,
    id : number, 
}

export type FolderPartial = {
    name : string,
    id : number,
    notes : Note[]
}


export type NoteDirectory = {
    id : number,
    grid_id : string,
    folders : FolderPartial[]
}
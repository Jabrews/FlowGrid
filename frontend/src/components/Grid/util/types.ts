import type { ProjectData } from "../../Home/Parts/ProjectMenu/ProjectMenu"

export type Grid = {
    id : string,
    created : string,
    project : ProjectData
}

export type Layout = {
    i : string,
    x : number,
    y : number,
    w : number,
    h : number,
    static : boolean,
    isResizeable : string,
}
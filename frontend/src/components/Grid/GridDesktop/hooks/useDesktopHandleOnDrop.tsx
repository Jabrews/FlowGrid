import { nanoid } from "nanoid";

// hooks
import useMutateCreateElement from "../../hooks/useMutateCreateElement";
import useMutateCreateLayout from "../../hooks/useMutateCreateLayout";

// utill
import type { Layout, ItemProps } from "../../util/types";

///---------- DESKTOP hookl----------------////
export default function useDesktopHandleOnDrop(layout: Layout[], droppedItem: Layout, e: DragEvent ) {

    const mutateCreateElement = useMutateCreateElement()
    const mutateCreateLayout = useMutateCreateLayout()

    // get data from payload (set in droppableItem)
    let newElementType : string
    const json = e.dataTransfer?.getData('application/json') || e.dataTransfer?.getData('text/plain');

    if (!json) throw new Error('Could not find payload json')
    try {
        newElementType = JSON.parse(json);
    } catch {
        throw new Error('Coudlnt parse json')
    }

    // needed for linking both layoutItem and droppable Element
    const linkedId = `${newElementType}-${nanoid()}`
    
    const layoutItem : Layout = {
        i : linkedId,
        x : droppedItem.x,
        y : droppedItem.y,
        w : droppedItem.w,
        h : droppedItem.h,
        static : false,
        isResizeable: false,
    }

    const newElementPartial = {
        i : linkedId,
        newElementType, 
    }


    // create layout    

    // create element
    mutateCreateLayout.mutate(layoutItem)
    mutateCreateElement.mutate(newElementPartial)
    

}
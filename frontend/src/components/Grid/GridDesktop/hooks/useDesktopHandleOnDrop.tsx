
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
    
    const layoutItem : Layout = {
        x : droppedItem.x,
        y : droppedItem.y,
        w : droppedItem.w,
        h : droppedItem.h,
        static : false,
        isResizeable: false,
    }


    // create layout    

    // how to deal with oid 
    // create element
    mutateCreateLayout.mutate(layoutItem)
    mutateCreateElement.mutate(newElementType)
    

}
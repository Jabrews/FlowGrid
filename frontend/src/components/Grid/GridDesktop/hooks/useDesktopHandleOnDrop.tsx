import { nanoid } from "nanoid";

// hooks
import useMutateCreateLayout from "../../hooks/useMutateCreateLayout";

// utill
import type { Layout} from "../../util/types";

///---------- DESKTOP hookl----------------////
export default function useDesktopHandleOnDrop() {
  const mutateCreateLayout = useMutateCreateLayout()

  return (layout: Layout[], droppedItem: Layout, e: DragEvent) => {
    const json =
      e.dataTransfer?.getData("application/json") ||
      e.dataTransfer?.getData("text/plain");

    if (!json) throw new Error("Could not find payload json");
    if (!layout) throw new Error('create layout')

    let newElementType: { type: string };
    try {
      newElementType = JSON.parse(json);
    } catch {
      throw new Error("Couldn't parse json");
    }

    const linkedId = `${newElementType.type}-${nanoid()}`;

    const layoutItem: Layout = {
      i: linkedId,
      x: droppedItem.x,
      y: droppedItem.y,
      w: droppedItem.w,
      h: droppedItem.h,
      static: false,
      isResizeable: false,
      type: newElementType.type,
    };

    mutateCreateLayout.mutate(layoutItem);
  };
}

    


import { nanoid } from "nanoid";

// hooks
import type { Layout } from "../../util/types";

// MOBILE HOOK ///////
export default function useMobileHandleOnDrop() {

  return (layout: Layout[], droppedItem: Layout, e: DragEvent) => {

        const json =
            e.dataTransfer?.getData("application/json") ||
            e.dataTransfer?.getData("text/plain");

        if (!json) throw new Error("Could not find payload json");
        if (!layout) throw new Error('create layout')

        let newElementType: { type: string };
        try {
            newElementType = JSON.parse(json);
        } 
        catch {
            throw new Error("Couldn't parse json");
        }

        const linkedId = `${newElementType.type}-${nanoid()}`;

        // create layout item with item preview set to true
        layout.push({

        })

    }

}
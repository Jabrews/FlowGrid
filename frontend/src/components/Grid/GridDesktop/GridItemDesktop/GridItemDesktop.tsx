// hooks
import useRenderElementMap from "../../hooks/useRenderElementMap"

// // components
import GridItemHeader from "../../GridItemHeader/GridItemHeader"

// util
import type { Layout } from "../../util/types"

type GridItemDesktopProps = {
  layout : Layout
}

export default function GridItemDesktop({layout} : GridItemDesktopProps) {

  // hook init

  return (
    <div className="grid-item">
        <GridItemHeader i={layout.i} type={layout.type} layoutId={layout.id || null} />
        <div className="grid-item-content">
            {useRenderElementMap({
                i : layout.i,
                type : layout.type
            })}
        </div>
    </div>
  )
}


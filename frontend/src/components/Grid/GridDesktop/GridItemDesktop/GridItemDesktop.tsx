// hooks
import useRenderElementMap from "../../hooks/useRenderElementMap"

// // components
// import GridItemHeader from '../../../../../cross-platform/workspace-components/Grid/GridItemHeader/GridItemHeader'

// util
import type { Layout } from "../../util/types"

type GridItemDesktopProps = {
  layout : Layout
}

export default function GridItemDesktop({layout} : GridItemDesktopProps) {

  // hook init

  return (
    <div className="grid-item">
        {/* <GridItemHeader id={metaElement.id} type={metaElement.type} /> */}
        <div className="grid-item-content">
            {useRenderElementMap({
                i : layout.i,
                type : layout.type
            })}
            <p> grid Item</p>
        </div>
    </div>
  )
}


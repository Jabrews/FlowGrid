// hooks
import type { Layout } from "../../util/types"

// util 
import useRenderElementMap from "../../hooks/useRenderElementMap"

// components
import GridItemHeader from "../../GridItemHeader/GridItemHeader"
import PreviewItemHeader from '../PreviewItemHeader/PreviewItemHeader'

type GridItemMobileProps = {
  layout : Layout
}


export default function GridItemMobile({layout} : GridItemMobileProps) {
  

  return (
    <div className="grid-item">
    
    {/* Other attached componentss*/}
      {layout.isMobileItemPreview
        ?
        (
          <PreviewItemHeader />
        ) 
        : (
          <GridItemHeader i={layout.i} type={layout.type} layoutId={layout.id || null} />
        )
      }
      <div className="grid-item-content">
        {useRenderElementMap({
          isMobilePreview : layout.isMobileItemPreview,
          i : layout.i,
          type : layout.type,
        })}
      </div>
    </div>
  )
}

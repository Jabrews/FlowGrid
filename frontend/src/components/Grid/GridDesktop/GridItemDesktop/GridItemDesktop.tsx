// // meta store hooks
// import type { ElementMeta } from '../../../../../cross-platform/stores/MetaFactory/MetaFactory'

// // desktops
// import RenderElementMap from '../../../../../cross-platform/workspace-components/Grid/util/RenderElementMap'

// // components
// import GridItemHeader from '../../../../../cross-platform/workspace-components/Grid/GridItemHeader/GridItemHeader'

// { metaElement }: { metaElement: ElementMeta } PROP DRILL ARGUMENTS
export default function GridItemDesktop() {
  return (
    <div className="grid-item">
        {/* <GridItemHeader id={metaElement.id} type={metaElement.type} /> */}
        <div className="grid-item-content">
            {/* {RenderElementMap({
                id : metaElement.id,
                type : metaElement.type
            })} */}
            <p> grid Item</p>
        </div>
    </div>
  )
}


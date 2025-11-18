// // meta store hooks
// import type { ElementMeta } from '../../../../../cross-platform/stores/MetaFactory/MetaFactory'

// // components
// import PreviewItemHeader from '../../PreviewItemHeader/PreviewItemHeader'
// import GridItemHeader from '../../../../../cross-platform/workspace-components/Grid/GridItemHeader/GridItemHeader'

// // util 
// import RenderElementMap from '../../../../../cross-platform/workspace-components/Grid/util/RenderElementMap'

//{ metaElement }: { metaElement: ElementMeta } PROP STUIFF
export default function GridItemMobile() {
  return (
    <div className="grid-item">
    
    {/* Other attached componentss*/}
    {/* {metaElement.isItemPreview ? (
    <PreviewItemHeader id={metaElement.id} type={metaElement.type} />
    ) : (
    <GridItemHeader id={metaElement.id} type={metaElement.type} />
    )} */}

      <div className="grid-item-content">
        <p> grid item</p>
        {/* rendering stuff */}
        {/* {RenderElementMap({
          id: metaElement.id,
          type: metaElement.type,
          isMobilePreview: metaElement.isItemPreview || false,
        })} */}
      </div>
    </div>
  )
}

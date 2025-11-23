// elements 
// import PlaceholderElement from '../../../../cross-platform/elements/PlaceholderElement/PlaceholderElement'
// import ItemPreviewMobile from '../../../../mobile/elements/ItemPreviewMobile/ItemPreviewMobile'
import Timer from "../../Elements/Timer/Timer";
// import Tracker from '../../../elements/Tracker/Tracker'
// import StickyNotes from '../../../elements/StickyNotes/StickyNotes'
// import TableList from '../../../elements/TableList/TableList'

// element parts
// import NameHeader from '../../../elements/NameHeader/NameHeader'
// import TrackerInput from '../../../elements/TrackerParts/TrackerInput'
// import TrackerOutput from '../../../elements/TrackerParts/TrackerOutput'

type RenderElementProps = {
  type: string;
  i : string; 
  isMobilePreview?: boolean;
}

export default function useRenderElementMap({ type, i, isMobilePreview = false }: RenderElementProps) {
//   if (isMobilePreview) {
//     return <ItemPreviewMobile key={id} id={id} type={type} />;
//   }

  switch (type) {
    case 'timer':
      return (
          <>
            {/* <NameHeader id={id} type={type} /> */}
            <Timer i={i}/>
            {/* <TrackerInput parentElementId={id}/> */}
          </>
        )
    // case 'Tracker':
    //   return (
    //     <>
    //       <Tracker  id={id}/>
    //       <TrackerOutput parentElementId={id} />
    //     </>
    //   )
    // case 'Sticky-Notes' :
    //   return (
    //     <>
    //       <StickyNotes id={id} />
    //     </>
    //   )
    // case 'Table-List' :
    //   return (
    //     <>
    //       <TableList id={id} />
    //     </>
    //   )
    default:
      return <div key={i}>Unknown Element</div>;
  }
}

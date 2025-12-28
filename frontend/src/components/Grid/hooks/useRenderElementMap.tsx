// elements 
import MobileItemPreview from "../../gridItems/MobileItemPreview/MobileItemPreview";
import Timer from "../../gridItems/Timer/Timer";
import Tracker from "../../gridItems/Tracker/Tracker";
import StickyNote from "../../gridItems/StickyNote/StickyNote";
// import TableList from '../../../elements/TableList/TableList'

// element parts
// import NameHeader from '../../../elements/NameHeader/NameHeader'
import TrackerInput from "../../gridItems/Connection/TrackerInput/TrackerInput";
import TrackerOutput from "../../gridItems/Connection/TrackerOutput/TrackerOutput";

type RenderElementProps = {
  type: string;
  i : string; 
  isMobilePreview?: boolean;
}

export default function useRenderElementMap({ type, i, isMobilePreview = false }: RenderElementProps) {

  if (isMobilePreview) {
    return <MobileItemPreview  type={type} />;
  }


  switch (type) {
    case 'timer':
      return (
          <>
            {/* <NameHeader id={id} type={type} /> */}
            <Timer i={i}/>
            <TrackerInput parentElementI={i} parentElementType={type}/>
          </>
        )
    case 'tracker':
      return (
        <>
          <Tracker i={i}/>
          <TrackerOutput parentElementI={i} />
        </>
      )
    case 'sticky_note' :
      return (
        <>
          <StickyNote parentElementI={i} />
        </>
      )
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

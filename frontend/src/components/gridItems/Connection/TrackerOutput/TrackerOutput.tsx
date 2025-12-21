import { useDroppable } from '@dnd-kit/core';

// hooks
import useQueryTracker from '../../Tracker/hooks/useQueryTracker';
import { useToggleShowConnectionModal } from '../../../stores/ModalRendererStore/ModelRendererStore';
import { useSetActiveConnectionItemI } from '../../../stores/ConnectionModalStore/ConnectionModalStore';

// utill
import { get_svg_icons } from "../../../util/get_svg_icons";

type TrackerOutputProps = {
    parentElementI : string,
}

export default function TrackerOutput({parentElementI} : TrackerOutputProps) {

  // hooks
  const toggleShowConnectionModal = useToggleShowConnectionModal()
  const setActiveConnectionItemI = useSetActiveConnectionItemI()

  const {data} = useQueryTracker(parentElementI)    
    
  const { setNodeRef } = useDroppable({
      id: parentElementI,
      data: data
          ? { type: "tracker", trackerId: data.id }
          : {}
  });

    const style: React.CSSProperties = {
        cursor: "grab",
        position: "relative",
        zIndex: 100,
    };

    const handleOnPlugClick = () => {
      setActiveConnectionItemI(parentElementI)
      toggleShowConnectionModal(true)
    }




  return (
    <div 
        className="tracker-output" 
    > 
    <div
        style={style}
        ref={setNodeRef}
        id={parentElementI}
    >
      <svg width="20" height="20"> {/* onClick={handleToggleConnectionModal}*/}
        <circle cx="10" cy="10" r="10" fill="red" />
      </svg>
    </div>
      <p
        onClick={handleOnPlugClick} 
      >
        {get_svg_icons({icon : 'unplug', size : 24})}
      </p>
    </div>
  );

}
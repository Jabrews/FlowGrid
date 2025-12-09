import { useDroppable } from '@dnd-kit/core';

// utill
import { get_svg_icons } from "../../../util/get_svg_icons";

type TrackerOutputProps = {
    parentElementI : string,
}

export default function TrackerOutput({parentElementI} : TrackerOutputProps) {

  const { setNodeRef } = useDroppable({
    id : parentElementI,
    // data: { type, parentElementId },
  });

  return (
    <div 
        className="tracker-output" 
        ref={setNodeRef}
    > 
      <svg width="20" height="20" > {/* onClick={handleToggleConnectionModal}*/}
        <circle cx="10" cy="10" r="10" fill="red" />
      </svg>
        {get_svg_icons({icon : 'unplug', size : 24})}
    </div>
  );

}
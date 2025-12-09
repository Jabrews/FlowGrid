import {useDraggable} from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities';

// util
import { get_svg_icons } from "../../../util/get_svg_icons";

type TrackerInputProps = {
    parentElementI : string,
    parentElementType : string
}

export default function TrackerInput({parentElementI, parentElementType} : TrackerInputProps) {

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id : parentElementI,
        data: {parentElementType },
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        cursor: 'grab',
    };


  return (
    <div 
        className="tracker-input"
        ref={setNodeRef} style={style} {...listeners} {...attributes}
    >        <svg width="20" height="20">
          <circle cx="10" cy="10" r="10" fill="blue" />
        </svg>
        {get_svg_icons({icon : 'plug', size : 23})}
    </div>
  );

}
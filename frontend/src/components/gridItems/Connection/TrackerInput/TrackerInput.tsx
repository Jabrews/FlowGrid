import {useDraggable} from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities';

// hooks
import useQueryGridItem from './hooks/useQueryGridItem';

// util
import { get_svg_icons } from "../../../util/get_svg_icons";

type TrackerInputProps = {
    parentElementI : string,
    parentElementType : string
}

export default function TrackerInput({parentElementI, parentElementType} : TrackerInputProps) {

    
    const {data} = useQueryGridItem({gridItemI : parentElementI, gridItemType : parentElementType})

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id : parentElementI,
        data: data 
            ? {parentElementType, parentElementId : data.id} 
            : {} 
    });


    const style: React.CSSProperties = {
        transform: CSS.Translate.toString(transform),
        cursor: "grab",
        zIndex: 9999,
    };


  return (
    <div 
        className="tracker-input"
    >
            
        <div
        ref={setNodeRef} style={style} {...listeners} {...attributes}
        id={parentElementI}
        >
            <svg width="20" height="20">
            <circle cx="10" cy="10" r="10" fill="blue" />
            </svg>
        </div>

        {get_svg_icons({icon : 'plug', size : 23})}
    </div>
  );

}
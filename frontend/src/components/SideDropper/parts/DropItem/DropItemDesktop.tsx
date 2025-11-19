
// hooks
import { get_svg_icons } from '../../../util/get_svg_icons';

// editor edge drag store
import { useToggleEditorScrollEventActive } from '../../../WorkSpace/hooks/useEdgeScrollStore'

type DroppableItemDesktopProps = {
    type : string;
}


export default function DropItemDesktop({type} :DroppableItemDesktopProps){

  const toggleEditorScrollEventActive = useToggleEditorScrollEventActive()

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const payload = { type }; // add anything else you need
    e.dataTransfer.setData('application/json', JSON.stringify(payload));
    console.log(payload)
    toggleEditorScrollEventActive(true)
  };

  const handleDragDrop = () => {
    toggleEditorScrollEventActive(false)
  }

    return (
        <div className='droppable-table-item'
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragDrop}
        >
           <p> {type} </p> 
           <div
           
           >
                {get_svg_icons({icon : type, size : 74})}
           </div>
        </div>
    )



}
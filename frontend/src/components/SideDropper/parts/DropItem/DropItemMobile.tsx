
// hooks 
import { get_svg_icons } from '../../../util/get_svg_icons';
import useOnClickMobile from './hooks/useOnClickMobile'


// note : although diffrent components styling stays the same for both mobile n desktop

type DroppableItemMobileProps = {
    type : string;
}


export default function DropItemMobile({type} : DroppableItemMobileProps) {

    // hook init
    const handleOnClick = useOnClickMobile(type)


    return (
        <div className='droppable-table-item'
            onClick={handleOnClick}
        >
           <p> {type} </p> 
           <div
           
           >
                {get_svg_icons({icon : type, size : 74})}
           </div>
        </div>
    )



}
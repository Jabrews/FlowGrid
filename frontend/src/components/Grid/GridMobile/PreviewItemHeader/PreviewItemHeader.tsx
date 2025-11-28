// util 
import { get_svg_icons } from '../../../util/get_svg_icons';


export default function PreviewItemHeader() {


    return (
        <div className='item-preview-header'>
            <p className='drag-handle'
            > 
                {get_svg_icons({icon : 'Item-Preview-Drag-Handle', size : 24})} 
            </p>
        </div>
    )


}


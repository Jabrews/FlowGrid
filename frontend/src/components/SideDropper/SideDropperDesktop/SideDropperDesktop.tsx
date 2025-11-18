// side dropper store hooks
import { useSideOpen } from '../../stores/SideDropperStore/SideDropperStore';
import { useToggleSideOpen } from '../../stores/SideDropperStore/SideDropperStore';

// util 
import { get_svg_icons } from '../../util/get_svg_icons';

// components (dropper-parts)
import DropperButtons from '../parts/DropperButtons'
import DroppableContainer from '../parts/DroppableContainer'

export default function SideDropperDesktop() {

    // side dropper hook init
    const sideOpen = useSideOpen()
    const toggleSideOpen = useToggleSideOpen()

    return (
        <div 
            className={`side-dropper-container side-dropper-container-desktop ${sideOpen ? 'active' : 'in-active'}`}
        >
            <div className='side-dropper-header'>
                <p
                    style={{display : sideOpen ? 'block' : 'none'}} 
                >
                    Side Dropper : 
                </p>
                <h1 onClick={() => toggleSideOpen(!sideOpen)}> 
                    {get_svg_icons({ icon: !sideOpen ? 'Side-Dropper-Open' : 'Side-Dropper-Close', size: 34 })} 
                </h1>

            </div>
            <div className='side-dropper-content'
                style={{display : sideOpen ? 'block' : 'none'}} 
            >
                <DropperButtons />
                <DroppableContainer />
            </div>
        </div>
    )
}

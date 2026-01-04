// hooks        
import { useShowNavMenu, useToggleShowNavMenu} from "../../stores/NoteNavigatorStore/NoteNavigatorStore"

// util
import { get_svg_icons } from "../../util/get_svg_icons"

// comp
import NoteInfo from "./NoteInfo"


export default function NavHeaderDesktop() {
        
    // hook init
    const showNavMenu = useShowNavMenu()        
    const toggleShowNavMenu = useToggleShowNavMenu()

    return (
        <div 
        className={`note-nav-header-desktop ${
            showNavMenu ? 'active' : ''
        }`}        
        >
            <button onClick={() => {toggleShowNavMenu(!showNavMenu)}}>
                {showNavMenu ? (
                    get_svg_icons({icon : 'notebook_close', size : 35})
                ) : (
                    get_svg_icons({icon : 'notebook_open', size : 34})
                )}
            </button>

            {showNavMenu &&
                <NoteInfo />
            }



        </div>

    )

}